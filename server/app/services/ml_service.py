from app.models.ml_model import PerformancePredictor
import pandas as pd
from typing import List, Dict
from app.sample_data import get_employee_data

class MLService:
    def __init__(self):
        self.predictor = PerformancePredictor()

    def get_employee_predictions(self, employee_id: int) -> Dict:
        # Get historical data for the employee
        historical_data = get_employee_data(employee_id)
        df = pd.DataFrame(historical_data)
        
        if df.empty:
            raise ValueError(f"No data found for employee {employee_id}")
        
        predicted_velocity = self.predictor.predict_next_sprint(df)
        trends = self.predictor.analyze_trends(df)
        historical_performance = self.predictor.get_historical_performance(df)
        
        return {
            "employee_id": employee_id,
            "predicted_velocity": float(predicted_velocity),
            "confidence_score": 0.85,  # Simplified confidence score
            "trends": trends,
            "historical_performance": historical_performance
        }

    def get_employee_stats(self, employee_id: int) -> Dict:
        historical_data = get_employee_data(employee_id)
        df = pd.DataFrame(historical_data)
        
        if df.empty:
            raise ValueError(f"No data found for employee {employee_id}")
        
        velocity = df['story_points_completed'] / df['story_points_committed']
        
        return {
            "average_velocity": float(velocity.mean()),
            "total_story_points_completed": int(df['story_points_completed'].sum()),
            "number_of_sprints": len(df),
            "trend": "Improving" if velocity.iloc[-3:].mean() > velocity.mean() else "Stable"
        }