import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from typing import List, Tuple

class PerformancePredictor:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)

    def prepare_features(self, data: pd.DataFrame) -> pd.DataFrame:
        # Calculate rolling averages and other features
        df = data.copy()
        df['velocity'] = df['story_points_completed'] / df['story_points_committed']
        df['rolling_avg_velocity'] = df['velocity'].rolling(window=3, min_periods=1).mean()
        return df

    def predict_next_sprint(self, data: pd.DataFrame) -> float:
        if len(data) < 2:
            return data['story_points_completed'].mean()
        
        df = self.prepare_features(data)
        
        # Use last 10 sprints to predict next sprint
        X = df[['story_points_committed', 'rolling_avg_velocity']].tail(3)
        y = df['story_points_completed'].tail(3)
        
        self.model.fit(X, y)
        
        # Predict next sprint using last sprint's data
        last_data = X.iloc[-1:]
        prediction = self.model.predict(last_data)[0]
        
        return max(0, prediction)  # Ensure non-negative prediction

    def analyze_trends(self, data: pd.DataFrame) -> List[str]:
        trends = []
        df = self.prepare_features(data)
        
        # Analyze velocity trend
        recent_velocity = df['velocity'].tail(3).mean()
        overall_velocity = df['velocity'].mean()
        
        if recent_velocity > overall_velocity * 1.1:
            trends.append("Improving performance trend")
        elif recent_velocity < overall_velocity * 0.9:
            trends.append("Declining performance trend")
        else:
            trends.append("Stable performance")
        
        # Analyze consistency
        velocity_std = df['velocity'].std()
        if velocity_std < 0.1:
            trends.append("Very consistent performance")
        elif velocity_std < 0.2:
            trends.append("Moderately consistent performance")
        else:
            trends.append("Variable performance")
        
        return trends

    def get_historical_performance(self, data: pd.DataFrame) -> List[float]:
        return (data['story_points_completed'] / data['story_points_committed']).tolist()