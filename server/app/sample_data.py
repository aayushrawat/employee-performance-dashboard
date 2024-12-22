from datetime import datetime, timedelta
import random

def generate_sample_data():
    base_date = datetime(2023, 1, 1)
    sample_data = []
    
    # Performance patterns for different employee types
    patterns = {
        'high_performer': {'base_committed': 12, 'base_completed': 11, 'variance': 2},
        'average_performer': {'base_committed': 8, 'base_completed': 7, 'variance': 2},
        'improving_performer': {'base_committed': 6, 'base_completed': 4, 'variance': 1},
        'declining_performer': {'base_committed': 10, 'base_completed': 10, 'variance': 2},
        'inconsistent_performer': {'base_committed': 8, 'base_completed': 8, 'variance': 4}
    }
    
    # Assign patterns to employees
    employee_patterns = {
        1: 'high_performer',      # Consistently high performer
        2: 'declining_performer', # Starting strong but declining
        3: 'improving_performer', # Steadily improving
        4: 'average_performer',   # Stable average performance
        5: 'inconsistent_performer', # Highly variable performance
        6: 'high_performer',      # Another strong performer
        7: 'improving_performer', # Another improving performer
        8: 'declining_performer', # Another declining performer
        9: 'average_performer',   # Another stable performer
        10: 'inconsistent_performer' # Another variable performer
    }

    # Generate data for 10 employees over 10 sprints
    for employee_id in range(1, 11):
        pattern = patterns[employee_patterns[employee_id]]
        
        for sprint_id in range(1, 11):
            pattern_values = pattern.copy()
            
            # Modify values based on employee type and sprint progression
            if employee_patterns[employee_id] == 'improving_performer':
                pattern_values['base_completed'] += sprint_id * 0.3
            elif employee_patterns[employee_id] == 'declining_performer':
                pattern_values['base_completed'] -= sprint_id * 0.2
            
            # Add some randomness
            committed = pattern_values['base_committed'] + random.uniform(-1, 1)
            completed = pattern_values['base_completed'] + random.uniform(
                -pattern_values['variance'], 
                pattern_values['variance']
            )
            
            # Ensure completed points are not negative
            completed = max(0, completed)
            
            sprint_start = base_date + timedelta(days=(sprint_id-1)*14)
            sprint_end = sprint_start + timedelta(days=14)
            
            sample_data.append({
                "employee_id": employee_id,
                "sprint_id": sprint_id,
                "story_points_committed": round(committed, 1),
                "story_points_completed": round(completed, 1),
                "sprint_start_date": sprint_start,
                "sprint_end_date": sprint_end
            })
    
    return sample_data

# Store sample data in memory
SAMPLE_DATA = generate_sample_data()

def get_employee_data(employee_id: int):
    return [data for data in SAMPLE_DATA if data["employee_id"] == employee_id]