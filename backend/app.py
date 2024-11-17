from flask import Flask
from config import Config
from models import db
from schemas import ma
from routes.buildings import building_bp
from routes.resources import resource_bp
from routes.reminders import reminder_bp
from routes.usage_sessions import usage_session_bp

# Initialize the Flask app
app = Flask(__name__)

# Load configuration
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)  # SQLAlchemy
ma.init_app(app)  # Marshmallow

# Register blueprints (routes)
app.register_blueprint(building_bp)
app.register_blueprint(resource_bp)
app.register_blueprint(reminder_bp)
app.register_blueprint(usage_session_bp)

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
 
