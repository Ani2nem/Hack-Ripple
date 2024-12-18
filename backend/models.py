from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ENUM


db = SQLAlchemy()

# Example Building Model
class Building(db.Model):
    __tablename__ = 'buildings'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    electricity_goal = db.Column(db.Float, nullable=False)
    water_goal = db.Column(db.Float, nullable=False)

# Category Model
class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    building_id = db.Column(db.Integer, db.ForeignKey('buildings.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    usage = db.Column(db.Float, default=0.0)
    goal = db.Column(db.Float, default=0.0)

# Resource Model
class Resource(db.Model):
    __tablename__ = 'resources'
    id = db.Column(db.String(50), primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    usage = db.Column(db.Float, default=0.0)
    goal = db.Column(db.Float, default=0.0)


# UsageSession Model
class UsageSession(db.Model):
    __tablename__ = 'usage_sessions'
    id = db.Column(db.Integer, primary_key=True)
    resource_id = db.Column(db.String(50), db.ForeignKey('resources.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<UsageSession(resource_id={self.resource_id}, start_time={self.start_time}, end_time={self.end_time})>"
    
class Reminder(db.Model):
    __tablename__ = 'reminders'

    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(255), nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    building_id = db.Column(db.Integer, db.ForeignKey('buildings.id'), nullable=False)
    priority = db.Column(
        ENUM('low', 'medium', 'high', name='priority_levels', create_type=False),
        nullable=False,
        default='medium'
    )  # Priority column with ENUM for levels

    # Relationships
    # building = db.relationship('Building', backref=db.backref('reminders', lazy=True))
    
 
