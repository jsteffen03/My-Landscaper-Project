# Local imports
from config import app
from models import db, Plant, User, Landscaper, Project, ProjectPlant, ProjectLandscaper

with app.app_context():
    # Create a new plant
    plant = Plant(name='Rose', scientific_name='Rosa', type='Flower')
    
    # Create a new user
    user = User(name='John Doe', email='john.doe@example.com', _password_hash='securepassword')
    
    # Create a new landscaper
    landscaper = Landscaper(name='Jane Smith', email='jane.smith@example.com', _password_hash='securepassword')
    
    # Create a new project
    project = Project(title='Garden Renovation', description='Renovate the backyard garden.', status='In Progress', user=user)
    
    # Add the plant and landscaper to the project
    project.plants.append(plant)
    project.landscapers.append(landscaper)
    
    # Add all instances to the session
    db.session.add(plant)
    db.session.add(user)
    db.session.add(landscaper)
    db.session.add(project)
    
    # Commit the transaction
    db.session.commit()
