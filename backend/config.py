import os

class Config:
    # Replace with your PostgreSQL credentials
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql+pg8000://neondb_owner:7ZAwuK5DPGRb@ep-hidden-king-a53lfinp.us-east-2.aws.neon.tech/neondb')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
 
