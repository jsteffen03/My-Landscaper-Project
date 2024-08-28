# Local imports
from config import app
from models import db, Plant, User, Landscaper, Project, ProjectPlant, ProjectLandscaper

with app.app_context():

    # Delete all data
    print("deleting all data")
    db.session.query(Plant).delete()
    db.session.query(Landscaper).delete()
    db.session.query(Project).delete()
    db.session.query(User).delete()
    db.session.query(ProjectPlant).delete()
    db.session.query(ProjectLandscaper).delete()
    db.session.commit()

    # Create a new plant
    plant1 = Plant(name='Eastern Redbud', scientific_name='Cercis', type='Flowering Tree', img="{{ url_for('static', filename='images/Eastern Redbud.png') }}")
    plant2 = Plant(name='White Snow Fountains Weeping Cherry', scientific_name='Prunus', type='Flowering Tree', img="{{ url_for('static', filename='images/White Snow Fountains Weeping Cherry.png') }}")
    plant3 = Plant(name='Mimosa', scientific_name='Mimosa', type='Flowering Tree', img="{{ url_for('static', filename='images/Mimosa.png') }}")
    plant4 = Plant(name='Autumn Blooming Cherry', scientific_name='Prunus', type='Flowering Tree', img="{{ url_for('static', filename='images/Autumn Blooming Cherry.png') }}")
    plant5 = Plant(name='Weeping Cherry', scientific_name='Prunus', type='Flowering Tree', img="{{ url_for('static', filename='images/Weeping Cherry.png') }}")
    plant6 = Plant(name='Ivory Silk Japanese Lilac', scientific_name='Iris', type='Flowering Tree', img="{{ url_for('static', filename='images/Ivory Silk Japanese Lilac.png') }}")
    plant7 = Plant(name='Purple Robe locust', scientific_name='Rubus', type='Flowering Tree', img="{{ url_for('static', filename='images/Purple Robe locust.png') }}")
    plant8 = Plant(name='White Flowering Dogwood', scientific_name='Ginkgo', type='Flowering Tree', img="{{ url_for('static', filename='images/White Flowering Dogwood.png') }}")
    plant9 = Plant(name='Purple Pony Plum', scientific_name='Pyrus', type='Flowering Tree', img="{{ url_for('static', filename='images/Purple Pony Plum.png') }}")
    plant10 = Plant(name='Dynamite Crape Myrtle', scientific_name='Myrtus', type='Flowering Tree', img="{{ url_for('static', filename='images/Dynamite Crape Myrtle.png') }}")
    
    plant11 = Plant(name='Autumn Blaze Maple', scientific_name='Acer', type='Shade Tree', img="{{ url_for('static', filename='images/Autumn Blaze Maple.png') }}")
    plant12 = Plant(name='Chaste Tree', scientific_name='Carya', type='Shade Tree', img="{{ url_for('static', filename='images/Chaste Tree.png') }}")
    plant13 = Plant(name='Weeping Willow Tree', scientific_name='Salix', type='Shade Tree', img="{{ url_for('static', filename='images/Weeping Willow Tree.png') }}")
    plant14 = Plant(name='River Birch', scientific_name='Betula', type='Shade Tree', img="{{ url_for('static', filename='images/River Birch.png') }}")
    plant15 = Plant(name='Quaking Aspen Tree', scientific_name='Populus', type='Shade Tree', img="{{ url_for('static', filename='images/Quaking Aspen Tree.png') }}")
    plant16 = Plant(name='Forest Pansy Redbud', scientific_name='Cercis', type='Shade Tree', img="{{ url_for('static', filename='images/Forest Pansy Redbud.png') }}")
    plant17 = Plant(name='Sunburst Honeylocust Tree', scientific_name='Rubus', type='Shade Tree', img="{{ url_for('static', filename='images/Sunburst Honeylocust Tree.png') }}")
    plant18 = Plant(name='Sugar Maple', scientific_name='Acer', type='Shade Tree', img="{{ url_for('static', filename='images/Sugar Maple.png') }}")
    plant19 = Plant(name='Purple Prince Crabapple', scientific_name='Vaccinium', type='Shade Tree', img="{{ url_for('static', filename='images/Purple Prince Crabapple.png') }}")
    plant20 = Plant(name='Golden Rain Tree', scientific_name='Juglans', type='Shade Tree', img="{{ url_for('static', filename='images/Golden Rain Tree.png') }}")

    plant21 = Plant(name='Eastern Red Cedar', scientific_name='Cedrus', type='Evergreen Tree', img="{{ url_for('static', filename='images/Eastern Red Cedar.png') }}")
    plant22 = Plant(name='Emerald Green Arborvitae', scientific_name='Arborvitae', type='Evergreen Tree', img="{{ url_for('static', filename='images/Emerald Green Arborvitae.png') }}")
    plant23 = Plant(name='Deodar Cedar', scientific_name='Cedrus', type='Evergreen Tree', img="{{ url_for('static', filename='images/Deodar Cedar.png') }}")
    plant24 = Plant(name='Blue Atlas Cedar', scientific_name='Cedrus', type='Evergreen Tree', img="{{ url_for('static', filename='images/Blue Atlas Cedar.png') }}")
    plant25 = Plant(name='Bald Cypress', scientific_name='Cupressus', type='Evergreen Tree', img="{{ url_for('static', filename='images/Bald Cypress.png') }}")
    plant26 = Plant(name='Austrain Pine', scientific_name='Pinus', type='Evergreen Tree', img="{{ url_for('static', filename='images/Austrain Pine.png') }}")
    plant27 = Plant(name='Korean Pine', scientific_name='Pinus', type='Evergreen Tree', img="{{ url_for('static', filename='images/Korean Pine.png') }}")
    plant28 = Plant(name='Ponderosa Pine', scientific_name='Pinus', type='Evergreen Tree', img="{{ url_for('static', filename='images/Ponderosa Pine.png') }}")
    plant29 = Plant(name='Pinon Pine', scientific_name='Pinus', type='Evergreen Tree', img="{{ url_for('static', filename='images/Pinon Pine.png') }}")
    plant30 = Plant(name='Norway Spruce', scientific_name='Picea', type='Evergreen Tree', img="{{ url_for('static', filename='images/Norway Spruce.png') }}")
    plant31 = Plant(name='Colorado Blue Spruce', scientific_name='Picea', type='Evergreen Tree', img="{{ url_for('static', filename='images/Colorado Blue Spruce.png') }}")


    plants = [plant1, plant2, plant3, plant4, plant5, plant6, plant7, plant8, plant9, plant10, plant11, plant12, plant13, plant14, plant15, plant16, plant17, plant18, plant19, plant20, plant21, plant22, plant23, plant24, plant25, plant26, plant27, plant28, plant29, plant30, plant31]



    
    # Create a new user
    user = User(name='John Doe', email='john.doe@example.com', password_hash='securepassword')
    
    # Create a new landscaper
    landscaper = Landscaper(name='Jane Smith', company='ABC Company', email='jane.smith@example.com', password_hash='securepassword')
    
    # Create a new project
    project = Project(title='Garden Renovation', description='Renovate the backyard garden.', status='In Progress', user=user)
    
    # Add the plant and landscaper to the project
    project.plants.append(plant1)
    project.landscapers.append(landscaper)
    
    # Add all instances to the session
    db.session.add_all(plants)
    db.session.add(user)
    db.session.add(landscaper)
    db.session.add(project)
    
    # Commit the transaction
    db.session.commit()
