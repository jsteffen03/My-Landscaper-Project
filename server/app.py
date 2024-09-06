# Remote library imports
from flask import request, session, jsonify
from flask_restful import Resource
from models import db, User, Plant, Landscaper, Project
from config import app, db, api

@app.before_request
def check_credentials():

    if request.path.startswith('/static/'):
        return None

    valid_routes = ("/checksessions","/login_user", "/login_landscaper","/landscapers", "/users")
    if request.path not in valid_routes and 'user_id' not in session and 'landscaper_id' not in session:
        return {"error": "please login"},401
    else:
        print(session)
        pass

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

class Plants(Resource):
    def get(self):
        ap = Plant.query.all()
        return [plant.to_dict() for plant in ap]
    
api.add_resource(Plants, '/plants')

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
            print(e)
            return {"error": "Failed to add item to project"}, 500
        
api.add_resource(AddlandscaperToProject, '/project/<int:project_id>/landscaper')

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

class Logout(Resource):
    def delete(self):
        session.clear()
        return {}
api.add_resource(Logout,'/logout')

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
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)
