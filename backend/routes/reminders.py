from flask import Blueprint, jsonify

reminder_bp = Blueprint('reminders', __name__)

@reminder_bp.route('/reminders/sorted/<int:building_id>', methods=['GET'])
def get_sorted_reminders_by_building(building_id):
    # Query reminders for the given building, sorted by due_date
    reminders = Reminder.query.filter_by(building_id=building_id).order_by(Reminder.due_date.asc()).all()

    # Format the response
    response = [
        {
            "id": reminder.id,
            "title": reminder.title,
            "description": reminder.description,
            "due_date": reminder.due_date.strftime('%Y-%m-%d %H:%M:%S'),
            "status": reminder.status,
            "resource_id": reminder.resource_id
        }
        for reminder in reminders
    ]

    return jsonify(response)

