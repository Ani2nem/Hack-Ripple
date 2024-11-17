from flask import Blueprint, jsonify
from models import db, Building, Category
from sqlalchemy.sql import func

building_bp = Blueprint('buildings', __name__)

# Predefined conversion factors
ELECTRICITY_COST_PER_UNIT = 0.12  # $/unit
WATER_COST_PER_UNIT = 0.004      # $/unit

@building_bp.route('/buildings/<int:id>/summary', methods=['GET'])
def get_building_summary(id):
    # Fetch building details
    building = Building.query.get_or_404(id)
    
    # Fetch total usage and goal for electricity
    electricity = db.session.query(
        func.sum(Category.usage).label('total_usage'),
        func.sum(Category.goal).label('total_goal')
    ).filter(Category.building_id == id, Category.name.in_(['lights', 'hvac', 'appliances'])).first()

    # Fetch total usage and goal for water
    water = db.session.query(
        func.sum(Category.usage).label('total_usage'),
        func.sum(Category.goal).label('total_goal')
    ).filter(Category.building_id == id, Category.name.in_(['faucet', 'flush', 'fountain'])).first()

    # Calculate electricity metrics
    electricity_diff = electricity.total_usage - electricity.total_goal
    electricity_percent = (electricity_diff / electricity.total_goal) * 100 if electricity.total_goal else 0
    electricity_cost = electricity_diff * ELECTRICITY_COST_PER_UNIT

    # Calculate water metrics
    water_diff = water.total_usage - water.total_goal
    water_percent = (water_diff / water.total_goal) * 100 if water.total_goal else 0
    water_cost = water_diff * WATER_COST_PER_UNIT

    # Prepare response
    response = {
        "building": building.name,
        "electricity": {
            "usage": electricity.total_usage,
            "goal": electricity.total_goal,
            "percent_difference": electricity_percent,
            "cost_difference": electricity_cost
        },
        "water": {
            "usage": water.total_usage,
            "goal": water.total_goal,
            "percent_difference": water_percent,
            "cost_difference": water_cost
        }
    }

    return jsonify(response)
