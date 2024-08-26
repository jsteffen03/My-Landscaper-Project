# Remote library imports
from flask import request, session, jsonify
from flask_restful import Resource
from models import db, User, Plant, Landscaper, Project
from config import app, db, api

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

