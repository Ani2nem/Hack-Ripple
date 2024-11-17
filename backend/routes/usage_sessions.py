from flask import Blueprint, jsonify
from models import db, UsageSession
from sqlalchemy.sql import func

usage_session_bp = Blueprint('usage_sessions', __name__)

@usage_session_bp.route('/usage_sessions/<resource_id>', methods=['GET'])
def get_resource_usage(resource_id):
    # Query usage sessions for the given resource
    sessions = db.session.query(
    func.date_part('dow', UsageSession.start_time).label('day_of_week'),  # Day of the week
    func.date_part('hour', UsageSession.start_time).label('start_hour'),  # Start hour
    func.date_part('hour', UsageSession.end_time).label('end_hour'),      # End hour
    func.sum(func.age(UsageSession.end_time, UsageSession.start_time)).label('total_duration')  # Total duration
).filter(UsageSession.resource_id == resource_id) \
 .group_by('day_of_week', 'start_hour', 'end_hour') \
 .order_by('day_of_week', 'start_hour') \
 .all()


    # Format the response
    response = [
        {
            "day_of_week": int(s.day_of_week),
            "start_hour": int(s.start_hour),
            "end_hour": int(s.end_hour),
            "total_duration": s.total_duration.total_seconds() / 3600  # Convert duration to hours
        }
        for s in sessions
    ]
    return jsonify(response)
