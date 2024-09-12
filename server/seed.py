# Local imports
from config import app
from models import db, Plant, User, Landscaper, Project, ProjectPlant, ProjectLandscaper
from flask import url_for

with app.app_context():

    # Delete all exsiting data
    print("deleting all data")
    db.session.query(Plant).delete()
    db.session.query(Landscaper).delete()
    db.session.query(Project).delete()
    db.session.query(User).delete()
    db.session.query(ProjectPlant).delete()
    db.session.query(ProjectLandscaper).delete()
    db.session.commit()

    # Create a new plant
    plant1 = Plant(name='Eastern Redbud', scientific_name='Cercis', type='Flowering Tree', img="http://127.0.0.1:5555/static/Images/EasternRedbud.jpg")
    plant2 = Plant(name='White Snow Fountains Weeping Cherry', scientific_name='Prunus', type='Flowering Tree', img="http://127.0.0.1:5555/static/Images/WhiteSnowFountainsWeepingCherry.jpg")
    plant3 = Plant(name='Mimosa', scientific_name='Mimosa', type='Flowering Tree', img="http://127.0.0.1:5555/static/Images/MimosaTree.jpg")
    plant4 = Plant(name='Autumn Blooming Cherry', scientific_name='Prunus', type='Flowering Tree', img="http://127.0.0.1:5555/static/Images/AutumnBloomingCherry.jpg")
    plant5 = Plant(name='Weeping Cherry', scientific_name='Prunus', type='Flowering Tree', img="http://127.0.0.1:5555/static/Images/WeepingCherry.jpg")
    plant6 = Plant(name='Ivory Silk Japanese Lilac', scientific_name='Iris', type='Flowering Tree', img="http://127.0.0.1:5555/static/Images/IvorySilkJapaneseTreeLilac.jpg")
    plant7 = Plant(name='Purple Robe locust', scientific_name='Rubus', type='Flowering Tree', img="http://127.0.0.1:5555/static/Images/PurpleRobeLocustTree.jpg")
    plant8 = Plant(name='White Flowering Dogwood', scientific_name='Ginkgo', type='Flowering Tree', img="http://127.0.0.1:5555/static/Images/WhiteFloweringDogwood.jpg")
    plant9 = Plant(name='Purple Pony Plum', scientific_name='Pyrus', type='Flowering Tree', img="http://127.0.0.1:5555/static/Images/PurplePonyPlumTree.jpg")
    plant10 = Plant(name='Dynamite Crape Myrtle', scientific_name='Myrtus', type='Flowering Tree', img="http://127.0.0.1:5555/static/Images/DynamiteCrapeMyrtleTree.jpg")
    
    plant11 = Plant(name='Autumn Blaze Maple', scientific_name='Acer', type='Shade Tree', img="http://127.0.0.1:5555/static/Images/AutumnBlazeMaple.jpg")
    plant12 = Plant(name='Chaste Tree', scientific_name='Carya', type='Shade Tree', img="http://127.0.0.1:5555/static/Images/ChasteTree.jpg")
    plant13 = Plant(name='Weeping Willow Tree', scientific_name='Salix', type='Shade Tree', img="http://127.0.0.1:5555/static/Images/WeepingWillowTree.jpg")
    plant14 = Plant(name='River Birch', scientific_name='Betula', type='Shade Tree', img="http://127.0.0.1:5555/static/Images/RiverBirch.jpg")
    plant15 = Plant(name='Quaking Aspen Tree', scientific_name='Populus', type='Shade Tree', img="http://127.0.0.1:5555/static/Images/QuakingAspenTree.jpg")
    plant16 = Plant(name='Forest Pansy Redbud', scientific_name='Cercis', type='Shade Tree', img="http://127.0.0.1:5555/static/Images/ForestPansyRedbud.jpg")
    plant17 = Plant(name='Sunburst Honeylocust Tree', scientific_name='Rubus', type='Shade Tree', img="http://127.0.0.1:5555/static/Images/SunburstHoneyLocustTree.jpg")
    plant18 = Plant(name='Sugar Maple', scientific_name='Acer', type='Shade Tree', img="http://127.0.0.1:5555/static/Images/SugarMaple.jpg")
    plant19 = Plant(name='Purple Prince Crabapple', scientific_name='Vaccinium', type='Shade Tree', img="http://127.0.0.1:5555/static/Images/PurplePrinceCrabapple.jpg")
    plant20 = Plant(name='Golden Rain Tree', scientific_name='Juglans', type='Shade Tree', img="http://127.0.0.1:5555/static/Images/GoldenRainTree.jpg")

    plant21 = Plant(name='Eastern Red Cedar', scientific_name='Cedrus', type='Evergreen Tree', img="http://127.0.0.1:5555/static/Images/EasternRedCedar.jpg")
    plant22 = Plant(name='Emerald Green Arborvitae', scientific_name='Arborvitae', type='Evergreen Tree', img="http://127.0.0.1:5555/static/Images/EmeraldGreenArborvitae.jpg")
    plant23 = Plant(name='Deodar Cedar', scientific_name='Cedrus', type='Evergreen Tree', img="http://127.0.0.1:5555/static/Images/DeodarCedar.jpg")
    plant24 = Plant(name='Blue Atlas Cedar', scientific_name='Cedrus', type='Evergreen Tree', img="http://127.0.0.1:5555/static/Images/BlueAtlasCedar.jpg")
    plant25 = Plant(name='Bald Cypress', scientific_name='Cupressus', type='Evergreen Tree', img="http://127.0.0.1:5555/static/Images/BaldCypress.jpg")
    plant26 = Plant(name='Austrain Pine', scientific_name='Pinus', type='Evergreen Tree', img="http://127.0.0.1:5555/static/Images/AustrainPineTree.jpg")
    plant27 = Plant(name='Korean Pine', scientific_name='Pinus', type='Evergreen Tree', img="http://127.0.0.1:5555/static/Images/KoreanPineTree.jpg")
    plant28 = Plant(name='Ponderosa Pine', scientific_name='Pinus', type='Evergreen Tree', img="http://127.0.0.1:5555/static/Images/PonderosaPine.jpg")
    plant29 = Plant(name='Pinon Pine', scientific_name='Pinus', type='Evergreen Tree', img="http://127.0.0.1:5555/static/Images/PinonPine.jpg")
    plant30 = Plant(name='Norway Spruce', scientific_name='Picea', type='Evergreen Tree', img="http://127.0.0.1:5555/static/Images/NorwaySpruce.jpg")
    plant31 = Plant(name='Colorado Blue Spruce', scientific_name='Picea', type='Evergreen Tree', img="http://127.0.0.1:5555/static/Images/ColoradoBlueSpruce.jpg")


    plants = [plant1, plant2, plant3, plant4, plant5, plant6, plant7, plant8, plant9, plant10, plant11, plant12, plant13, plant14, plant15, plant16, plant17, plant18, plant19, plant20, plant21, plant22, plant23, plant24, plant25, plant26, plant27, plant28, plant29, plant30, plant31]
    
    # Add all instances to the session
    db.session.add_all(plants)
    
    # Commit the transaction
    db.session.commit()
