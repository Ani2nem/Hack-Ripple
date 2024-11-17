from flask import Blueprint, jsonify
from models import db, Reminder


reminder_bp = Blueprint('reminders', __name__)

@reminder_bp.route('/reminders/sorted/<int:building_id>', methods=['GET'])
def get_sorted_reminders_by_building(building_id):
    # Query reminders for the given building, sorted by due_date
    reminders = Reminder.query.filter_by(building_id=building_id).order_by(Reminder.due_date.asc()).all()

    # Format the response
    response = [
        {
            "id": reminder.id,
            "title": reminder.task_name,
            "due_date": reminder.due_date.strftime('%Y-%m-%d %H:%M:%S'),
            "status": reminder.status,
            "priority":reminder.priority
        }
        for reminder in reminders
    ]

    return jsonify(response)

