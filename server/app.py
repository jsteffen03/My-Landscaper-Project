# Remote library imports
from flask import request, session, jsonify
from flask_restful import Resource
from models import db, User, Plant, Landscaper, Project
from config import app, db, api

@app.before_request
def check_credentials():
    valid_routes = ("/checksessions","/login", "/users")
    if request.path not in valid_routes and 'user_id' not in session:
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
            l = Landscaper(
                name = data['name'],
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
            user_id = session.get['user_id']
            if not user_id:
                return jsonify({"Error": "User not logged in"}), 400
            data = request.get_json()
            p = Project(
                title = data['title'],
                description = data['description'],
                status = data['status'],
                user_id = user_id
            )
            db.session.add(p)
            db.session.commit()
            return jsonify(p.to_dict())
        except Exception as e:
            print(e)
            return jsonify({"Error": "Invalid username or password"}), 400
    
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

    def delete(self, project_id):
        project = Project.query.get(project_id)
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

class AdditemToProject(Resource):
    def post(self, project_id):
        try:
            data = request.get_json()
            plant = data.get('plant_id')
            project = Project.query.get(project_id)
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

api.add_resource(AdditemToProject, '/project/<int:project_id>/plant')

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

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.email == data['email']).first()
        if user and user.authenticate(data['password']):
            session['stay_logged_in'] = data.get('stayLoggedIn', False)
            session['user_id'] = user.id 
            print(session)
            return jsonify(user.to_dict()) 
        else:
            return jsonify({"Error": "Invalid username or password"}), 400
        
api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session.clear()
        return {}
api.add_resource(Logout,'/logout')

class CheckSession(Resource):
    def get(self):
        print(session)
        if session.get('stay_logged_in') == True:
            user = User.query.filter(User.id == session.get('user_id')).first()
            return user.to_dict()
        else:
            return {}, 404
        
api.add_resource(CheckSession,'/checksessions')
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)

