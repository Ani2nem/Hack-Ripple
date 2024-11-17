 
# from flask import Blueprint, jsonify

# # Define the blueprint
# resource_bp = Blueprint('resources', __name__)

# from flask import Blueprint, jsonify
# from models import db, Resource, Category, Building
# from sqlalchemy.sql import func
# from flask import request


# resource_bp = Blueprint('resources', __name__)

# @resource_bp.route('/resources/over-limit', methods=['GET'])
# def get_resources_over_limit():
#     # Query resources exceeding their goal
#     over_limit_resources = db.session.query(
#         Resource.id,
#         Resource.usage,
#         Resource.goal,
#         (Resource.usage - Resource.goal).label('over_amount'),
#         ((Resource.usage - Resource.goal) / Resource.goal * 100).label('percent_over'),
#         Category.name.label('category_name'),
#         Building.name.label('building_name')
#     ).join(Category, Resource.category_id == Category.id) \
#      .join(Building, Category.building_id == Building.id) \
#      .filter(Resource.usage > Resource.goal) \
#      .order_by(func.abs(Resource.usage - Resource.goal).desc()) \
#      .all()

#     # Format the response
#     response = [
#         {
#             "resource_id": r.id,
#             "category_name": r.category_name,
#             "building_name": r.building_name,
#             "usage": r.usage,
#             "goal": r.goal,
#             "over_amount": r.over_amount,
#             "percent_over": r.percent_over
#         }
#         for r in over_limit_resources
#     ]
#     return jsonify(response)

# from flask import Blueprint, jsonify
# from models import db, Resource, Category, Building
# from sqlalchemy.sql import func

# resource_bp = Blueprint('resources', __name__)

# # Predefined categories
# ELECTRICAL_CATEGORIES = ['lights', 'hvac', 'appliances']
# WATER_CATEGORIES = ['faucet', 'flush', 'fountain']

# @resource_bp.route('/resources/electrical/over-limit', methods=['GET'])
# def get_electrical_resources_over_limit():
#     over_limit_resources = db.session.query(
#         Resource.id,
#         Resource.usage,
#         Resource.goal,
#         (Resource.usage - Resource.goal).label('over_amount'),
#         ((Resource.usage - Resource.goal) / Resource.goal * 100).label('percent_over'),
#         Category.name.label('category_name'),
#         Building.name.label('building_name')
#     ).join(Category, Resource.category_id == Category.id) \
#      .join(Building, Category.building_id == Building.id) \
#      .filter(Category.name.in_(['lights', 'hvac', 'appliances'])) \
#      .filter(Resource.usage > Resource.goal) \
#      .order_by(func.abs(((Resource.usage - Resource.goal) / Resource.goal) * 100).desc()) \
#      .all()


# @resource_bp.route('/resources/water/over-limit', methods=['GET'])
# def get_water_resources_over_limit():
#     over_limit_resources = db.session.query(
#         Resource.id,
#         Resource.usage,
#         Resource.goal,
#         (Resource.usage - Resource.goal).label('over_amount'),
#         ((Resource.usage - Resource.goal) / Resource.goal * 100).label('percent_over'),
#         Category.name.label('category_name'),
#         Building.name.label('building_name')
#     ).join(Category, Resource.category_id == Category.id) \
#      .join(Building, Category.building_id == Building.id) \
#      .filter(Category.name.in_(['faucet', 'flush', 'fountain'])) \
#      .filter(Resource.usage > Resource.goal) \
#      .order_by(func.abs(((Resource.usage - Resource.goal) / Resource.goal) * 100).desc()) \
#      .all()


# @resource_bp.route('/categories/summary', methods=['GET'])
# def get_category_summary():
#     # Get query parameter for type filtering
#     resource_type = request.args.get('type')  # "electrical" or "water"

#     # Define category filters
#     if resource_type == "electrical":
#         categories_filter = ['lights', 'hvac', 'appliances']
#     elif resource_type == "water":
#         categories_filter = ['faucet', 'flush', 'fountain']
#     else:
#         categories_filter = None  # Include all categories

#     # Query category summary
#     query = db.session.query(
#         Category.name.label('category_name'),
#         func.sum(Resource.usage).label('total_usage'),
#         func.sum(Resource.goal).label('total_goal'),
#         ((func.sum(Resource.usage) - func.sum(Resource.goal)) / func.sum(Resource.goal) * 100).label('percent_difference')
#     ).join(Resource, Resource.category_id == Category.id)

#     # Apply filters
#     if categories_filter:
#         query = query.filter(Category.name.in_(categories_filter))

#     # Group by category and sort by percentage difference
#     category_summary = query.group_by(Category.name) \
#                              .order_by(func.abs(((func.sum(Resource.usage) - func.sum(Resource.goal)) / func.sum(Resource.goal) * 100)).desc()) \
#                              .all()

#     # Format the response
#     response = [
#         {
#             "category_name": row.category_name,
#             "total_usage": row.total_usage,
#             "total_goal": row.total_goal,
#             "percent_difference": row.percent_difference
#         }
#         for row in category_summary
#     ]
#     return jsonify(response)



from flask import Blueprint, jsonify, request
from models import db, Resource, Category, Building
from sqlalchemy.sql import func

# Define the blueprint
resource_bp = Blueprint('resources', __name__)

# Predefined categories
ELECTRICAL_CATEGORIES = ['lights', 'hvac', 'appliances']
WATER_CATEGORIES = ['faucet', 'flush', 'fountain']

@resource_bp.route('/resources/over-limit', methods=['GET'])
def get_resources_over_limit():
    """Fetch all resources exceeding their goal."""
    try:
        over_limit_resources = db.session.query(
            Resource.id,
            Resource.usage,
            Resource.goal,
            (Resource.usage - Resource.goal).label('over_amount'),
            ((Resource.usage - Resource.goal) / Resource.goal * 100).label('percent_over'),
            Category.name.label('category_name'),
            Building.name.label('building_name')
        ).join(Category, Resource.category_id == Category.id) \
         .join(Building, Category.building_id == Building.id) \
         .filter(Resource.usage > Resource.goal) \
         .order_by(func.abs(Resource.usage - Resource.goal).desc()) \
         .all()

        # Format the response
        response = [
            {
                "resource_id": r.id,
                "category_name": r.category_name,
                "building_name": r.building_name,
                "usage": r.usage,
                "goal": r.goal,
                "over_amount": r.over_amount,
                "percent_over": r.percent_over
            }
            for r in over_limit_resources
        ]
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@resource_bp.route('/resources/electrical/over-limit', methods=['GET'])
def get_electrical_resources_over_limit():
    """Fetch electrical resources exceeding their goal."""
    try:
        over_limit_resources = db.session.query(
            Resource.id,
            Resource.usage,
            Resource.goal,
            (Resource.usage - Resource.goal).label('over_amount'),
            ((Resource.usage - Resource.goal) / Resource.goal * 100).label('percent_over'),
            Category.name.label('category_name'),
            Building.name.label('building_name')
        ).join(Category, Resource.category_id == Category.id) \
         .join(Building, Category.building_id == Building.id) \
         .filter(Category.name.in_(ELECTRICAL_CATEGORIES)) \
         .filter(Resource.usage > Resource.goal) \
         .order_by(func.abs(((Resource.usage - Resource.goal) / Resource.goal) * 100).desc()) \
         .all()

        # Format the response
        response = [
            {
                "resource_id": r.id,
                "category_name": r.category_name,
                "building_name": r.building_name,
                "usage": r.usage,
                "goal": r.goal,
                "over_amount": r.over_amount,
                "percent_over": r.percent_over
            }
            for r in over_limit_resources
        ]
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@resource_bp.route('/resources/water/over-limit', methods=['GET'])
def get_water_resources_over_limit():
    """Fetch water resources exceeding their goal."""
    try:
        over_limit_resources = db.session.query(
            Resource.id,
            Resource.usage,
            Resource.goal,
            (Resource.usage - Resource.goal).label('over_amount'),
            ((Resource.usage - Resource.goal) / Resource.goal * 100).label('percent_over'),
            Category.name.label('category_name'),
            Building.name.label('building_name')
        ).join(Category, Resource.category_id == Category.id) \
         .join(Building, Category.building_id == Building.id) \
         .filter(Category.name.in_(WATER_CATEGORIES)) \
         .filter(Resource.usage > Resource.goal) \
         .order_by(func.abs(((Resource.usage - Resource.goal) / Resource.goal) * 100).desc()) \
         .all()

        # Format the response
        response = [
            {
                "resource_id": r.id,
                "category_name": r.category_name,
                "building_name": r.building_name,
                "usage": r.usage,
                "goal": r.goal,
                "over_amount": r.over_amount,
                "percent_over": r.percent_over
            }
            for r in over_limit_resources
        ]
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@resource_bp.route('/categories/summary', methods=['GET'])
def get_category_summary():
    """Get a summary of categories with usage and goal."""
    try:
        # Get query parameter for type filtering
        resource_type = request.args.get('type')

        # Define category filters
        if resource_type == "electrical":
            categories_filter = ELECTRICAL_CATEGORIES
        elif resource_type == "water":
            categories_filter = WATER_CATEGORIES
        else:
            categories_filter = None  # Include all categories

        # Query category summary
        query = db.session.query(
            Category.name.label('category_name'),
            func.sum(Resource.usage).label('total_usage'),
            func.sum(Resource.goal).label('total_goal'),
            ((func.sum(Resource.usage) - func.sum(Resource.goal)) / func.sum(Resource.goal) * 100).label('percent_difference')
        ).join(Resource, Resource.category_id == Category.id)

        # Apply filters
        if categories_filter:
            query = query.filter(Category.name.in_(categories_filter))

        # Group by category and sort by percentage difference
        category_summary = query.group_by(Category.name) \
                                 .order_by(func.abs(((func.sum(Resource.usage) - func.sum(Resource.goal)) / func.sum(Resource.goal) * 100)).desc()) \
                                 .all()

        # Format the response
        response = [
            {
                "category_name": row.category_name,
                "total_usage": row.total_usage,
                "total_goal": row.total_goal,
                "percent_difference": row.percent_difference
            }
            for row in category_summary
        ]
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
