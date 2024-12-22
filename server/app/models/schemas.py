from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class EmployeePerformance(BaseModel):
    employee_id: int
    sprint_id: int
    story_points_completed: int
    story_points_committed: int
    sprint_start_date: datetime
    sprint_end_date: datetime

class PerformancePrediction(BaseModel):
    employee_id: int
    predicted_velocity: float
    confidence_score: float
    trends: List[str]
    historical_performance: List[float]

class PerformanceStats(BaseModel):
    average_velocity: float
    total_story_points_completed: int
    number_of_sprints: int
    trend: str