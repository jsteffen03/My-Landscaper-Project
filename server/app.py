# Remote library imports
from flask import request, session, jsonify, render_template
from flask_restful import Resource
from models import db, User, Plant, Landscaper, Project
from config import app, db, api, mail
from flask_mail import Message

# Checks Authentication
@app.before_request
def check_credentials():
    if request.path.startswith('/static/'):
        return None

    valid_routes = ("/checksessions","/login_user", "/login_landscaper","/landscapers", "/users", "/")
    if request.path not in valid_routes and 'user_id' not in session and 'landscaper_id' not in session:
        return {"error": "please login"},401
    else:
        print(session)
        pass

# All users
class Users(Resource):
    def get(self):
        au = User.query.all()
        return [user.to_dict() for user in au]

    def post(self):
        try:
            data = request.get_json()
            au = User.query.all()
            if au:
                for user in au:
                    if user.email == data['email']:
                        return jsonify({"Error": "User already exists"}), 400
                    else:
                        u = User(
                            name = data['name'],
                            email = data['email'],
                            password_hash = data['password']
                        )
                        db.session.add(u)
                        db.session.commit()
                        return jsonify(u.to_dict())
        except Exception as e:
            print(e)
            return jsonify({"Error": "Invalid username or password"}), 400

api.add_resource(Users, '/users')

# All plants
class Plants(Resource):
    def get(self):
        ap = Plant.query.all()
        return [plant.to_dict() for plant in ap]
    
api.add_resource(Plants, '/plants')

# All Landscapers
class Landscapers(Resource):
    def get(self):
        al = Landscaper.query.all()
        return [landscaper.to_dict() for landscaper in al]
    
    def post(self):
        try:
            data = request.get_json()
            al = Landscaper.query.all()
            if al:
                for landscaper in al:
                    if landscaper.email == data['email']:
                        return jsonify({"Error": "Landscaper already exists"}), 400
                    else:
                        l = Landscaper(
                            name = data['name'],
                            company = data['company'],
                            email = data['email'],
                            password_hash = data['password']
                        )
                        db.session.add(l)
                        db.session.commit()
                        return jsonify(l.to_dict())
        except Exception as e:
            print(e)
            return jsonify({"Error": "Invalid username or password"}), 400
    
api.add_resource(Landscapers, '/landscapers')

# One Landscaper
class OneLandscaper(Resource):
    def get(self, id):
        landscaper = Landscaper.query.filter(Landscaper.id == id).first()
        if landscaper:
            return landscaper.to_dict()
        else:
            return {
                "error": "not valid id"
            },400

api.add_resource(OneLandscaper, '/landscapers/<int:id>')

# All Projects
class Projects(Resource):
    def get(self):
        ap = Project.query.all()
        return [project.to_dict() for project in ap]
    
    def post(self):
        try:
            # Correct session access
            user_id = session.get('user_id')  
            if not user_id:
                return {"Error": "User not logged in"}, 401
            data = request.get_json()
            print(data)
            p = Project(
                title=data['title'],
                description=data['description'],
                status=data['status'],
                user_id=user_id
            )
            db.session.add(p)
            db.session.commit()
            return p.to_dict(), 201
        except Exception as e:
            print(e)
            return jsonify({"Error": "Not valid data"}), 400
        
api.add_resource(Projects, '/projects')

# One Project
class OneProject(Resource):
    def get(self, id):
        project = Project.query.filter(Project.id == id).first()
        if project:
            return project.to_dict()
        else:
            return {
                "error": "not valid id"
            },400
        
    def patch(self,id):
        project = Project.query.filter(Project.id == id).first()
        if project:
            try:
                data = request.get_json()
                for key in data:
                    setattr(project,key,data[key])
                db.session.add(project)
                db.session.commit()
                return project.to_dict()
            except Exception as e:
                print(e)
                return {
                    "error": "validation error"
                }
        else:
            return {
                "error": "not valid id1"
            },400

    def delete(self, id):
        project = Project.query.get(id)
        if not project:
            return {"error": "Project not found"}, 404
        
        try:
            db.session.delete(project)
            db.session.commit()
            return {"message": "Project deleted"}, 200
        except Exception as e:
            db.session.rollback()
            print(e)
            return {"error": "Failed to delete project"}, 500

api.add_resource(OneProject, '/project/<int:id>')

# Add item to project and delete
class ItemToProject(Resource):
    def post(self, id):
        try:
            data = request.get_json()
            plant = data.get('plant_id')

            project = Project.query.get(id)
            plant = Plant.query.get(plant)

            if project and plant:
                project.plants.append(plant)
                db.session.commit()
                return {"message": "Item added to project"}, 200
            else:
                return {"error": "Project or plant not found"}, 404
        except Exception as e:
            print(e)
            return {"error": "Failed to add item to project"}, 500
        
    def delete(self, id):
        try:
            data = request.get_json()
            plant_id = data.get('plant_id')

            project = Project.query.get(id)
            plant = Plant.query.get(plant_id)

            if project and plant:
                project.plants.remove(plant)
                db.session.commit()
                return {"message": "Item removed from project"}, 200
            else:
                return {"error": "Project or item not found"}, 404
        except Exception as e:
            print(e)
            return {"error": "Failed to remove item from project"}, 500    

api.add_resource(ItemToProject, '/project/<int:id>/plant')

# Add item to project and delete
class AddlandscaperToProject(Resource):
    def post(self, project_id):
        try:
            data = request.get_json()
            landscaper = data.get('landscaper_id')
            project = Project.query.get(project_id)
            landscaper = Landscaper.query.get(landscaper)

            if project and landscaper:
                project.landscapers.append(landscaper)
                db.session.commit()
                return {"message": "Landscaper added to project"}, 200
            else:
                return {"error": "Project or landscaper not found"}, 404
        except Exception as e:
            return {"error": "Failed to add item to project"}, 500
        
    def delete(self, project_id):
        try:
            data = request.get_json()
            landscaper_id = data.get('landscaper_id')

            project = Project.query.get(project_id)
            landscaper = Landscaper.query.get(landscaper_id)

            if project and landscaper:
                project.landscapers.remove(landscaper)
                db.session.commit()
                return {"message": "Landscaper removed from project"}, 200
            else:
                return {"error": "Project or item not found"}, 404
        except Exception as e:
            print(e)
            return {"error": "Failed to remove item from project"}, 500
        
api.add_resource(AddlandscaperToProject, '/project/<int:project_id>/landscaper')

# Login user
class LoginUser(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.email == data['email']).first()
        if user and user.authenticate(data['password']):
            session.clear()
            session['stay_logged_in'] = data.get('stayLoggedIn', False)
            session['user_id'] = user.id 
            print(session)
            return jsonify(user.to_dict()) 
        else:
            return jsonify({"Error": "Invalid username or password"}), 400
        
api.add_resource(LoginUser, '/login_user')

# Login landscaper
class LoginLandscaper(Resource):
    def post(self):
        data = request.get_json()
        landscaper = Landscaper.query.filter(Landscaper.email == data['email']).first()
        if landscaper and landscaper.authenticate(data['password']):
            session.clear()
            session['stay_logged_in'] = data.get('stayLoggedIn', False)
            session['landscaper_id'] = landscaper.id 
            print(session)
            return jsonify(landscaper.to_dict()) 
        else:
            return jsonify({"Error": "Invalid username or password"}), 400
           
api.add_resource(LoginLandscaper, '/login_landscaper')

# Logout
class Logout(Resource):
    def delete(self):
        session.clear()
        return {}
api.add_resource(Logout,'/logout')

# Check if user is logged in
class CheckSession(Resource):
    def get(self):
        print(session)
        if session.get('stay_logged_in') == True and session.get('user_id'):
            user = User.query.filter(User.id == session.get('user_id')).first()
            return user.to_dict()
        elif session.get('stay_logged_in') == True and session.get('landscaper_id'):
            landscaper = Landscaper.query.filter(Landscaper.id == session.get('landscaper_id')).first()
            return landscaper.to_dict()
        else:
            return {}, 404
        
api.add_resource(CheckSession,'/checksessions')

# Send email
class SendEmail(Resource):
    def post(self):
        try:
            data = request.get_json()
            recipient_email = data.get('recipient_email')
            user_email = data.get('user_email')
            user_name = data.get('user_name')
            subject = data.get('subject')
            project_id = data.get('project_id')
            sender_email = data.get('user_email')
            company_name = data.get('company_name')
            redirect_url = 'http://localhost:3000/'

            html_body = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }}
                .email-container {{
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border: 1px solid #ddd;
                }}
                .header {{
                    background-color: #4caf50;
                    color: #ffffff;
                    padding: 10px;
                    text-align: center;
                }}
                .content {{
                    margin: 20px 0;
                }}
                .button {{
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #4caf50;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                    font-size: 12px;
                    color: #888;
                }}
                </style>
            </head>
            <body>
                <div class="email-container">
                <div class="header">
                    <h1>Welcome to My Landscaper</h1>
                </div>
                <div class="content">
                    <p>Hello {company_name},</p>
                    <p>
                    I hope this email finds you well. My name is {user_name}, and I would
                    like to invite you to place a bid on my upcoming landscaping project
                    through My Landscaper. I have outlined my project details and selected
                    specific items that I would like to incorporate. You can view the full
                    description of my project and the items chosen by visiting My
                    Landscaper.
                    </p>
                    <p>To view and bid on my project, please use the following project code: {project_id}.</p>
                    <p>I look forward to the possibility of working together and discussing my vision further.</p>
                    <p>Best regards,</p>
                    <p>{user_name}</p>
                    <p>Click the button below to log into My Landscaper and view my project.</p>
                    <a href="{redirect_url}" class="button">My Landscaper</a>
                </div>
                <div class="footer">
                    <p>&copy; 2024 My Landscaper. All rights reserved.</p>
                </div>
                </div>
            </body>
            </html>
            """


            # Create the email message
            msg = Message(subject, recipients=[recipient_email], sender=sender_email)
            msg.html = html_body
            msg.reply_to = user_email

            mail.send(msg)
            return {"message": "Email sent successfully!"}, 200
        except Exception as e:
            print(e)
            return {"error": "Failed to send email."}, 500
        
api.add_resource(SendEmail, '/send_email')

# @app.errorhandler(404)
# def not_found(e):
#     return render_template("index.html")

if __name__ == '__main__':
    app.run(port=5555, debug=True)
