from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

# Models go here!
class Plant(db.Model, SerializerMixin):
    __tablename__ = 'plants'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    scientific_name = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    img = db.Column(db.String)
    
    # Relationship to Projects via the join table
    projects = db.relationship('Project', secondary='project_plants', back_populates='plants')

    # Serialize Rules
    serialize_rules = ("-projects.plants",)

class Project(db.Model, SerializerMixin):
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    status = db.Column(db.String, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # Relationships
    user = db.relationship('User', back_populates='projects')
    landscapers = db.relationship('Landscaper', secondary='project_landscapers', back_populates='projects')
    plants = db.relationship('Plant', secondary='project_plants', back_populates='projects')

    # Serialize Rules
    serialize_rules = ("-user.projects", "-landscapers.projects", "-plants.projects")
    

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    
    # Relationship to Projects
    projects = db.relationship('Project', back_populates='user', cascade="all, delete-orphan")

    # Serialize Rules
    serialize_rules = ('-projects.user','-_password_hash')
    
    # Password hashing and validation
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))
    
    # Validations
    @validates('email')
    def validate_email(self, key, address):
        if '@' in address:
            return address           
        else:
            raise ValueError('Invalid email format')

    @validates('name')
    def validate_name(self, key, name):
        if len(name) > 3:
            return name
        else:
            raise ValueError('Name must be at least 3 characters long')


class Landscaper(db.Model, SerializerMixin):
    __tablename__ = 'landscapers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    
    # Relationship to Projects via the join table
    projects = db.relationship('Project', secondary='project_landscapers', back_populates='landscapers')

    # Serialize Rules
    serialize_rules = ("-projects.landscapers", "-_password_hash")
    
    # Password hashing and validation
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))

    
    @validates('email')
    def validate_email(self, key, address):
        if '@' in address:
            return address           
        else:
            raise ValueError('Invalid email format')

    
    @validates('name')
    def validate_name(self, key, name):
        if len(name) > 3:
            return name
        else:
            raise ValueError('Name must be at least 3 characters long')


# Join tables
class ProjectPlant(db.Model, SerializerMixin):
    __tablename__ = 'project_plants'

    project_id = db.Column('project_id', db.Integer, db.ForeignKey('projects.id'), primary_key=True)
    plant_id = db.Column('plant_id', db.Integer, db.ForeignKey('plants.id'), primary_key=True)

class ProjectLandscaper(db.Model, SerializerMixin):
    __tablename__ = 'project_landscapers'
    
    project_id= db.Column('project_id', db.Integer, db.ForeignKey('projects.id'), primary_key=True)
    landscaper_id = db.Column('landscaper_id', db.Integer, db.ForeignKey('landscapers.id'), primary_key=True)