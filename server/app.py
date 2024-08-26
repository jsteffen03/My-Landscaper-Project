# Remote library imports
from flask import request, session, jsonify
from flask_restful import Resource
from models import db, User, Plant, Landscaper, Project
from config import app, db, api

# @app.before_request
# def check_credentials():
#     valid_routes = ("/checksessions","/login", "/users")
#     if request.path not in valid_routes and 'user_id' not in session:
#         return {"error": "please login"},401
#     else:
#         print(session)
#         pass

class Users(Resource):
    def get(self):
        au = User.query.all()
        return [user.to_dict() for user in au]

    def post(self):
        pass

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
    
api.add_resource(Landscapers, '/landscapers')

class Projects(Resource):
    def get(self):
        ap = Project.query.all()
        return [project.to_dict() for project in ap]
    
api.add_resource(Projects, '/projects')

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(User.username == data['username']).first()
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

