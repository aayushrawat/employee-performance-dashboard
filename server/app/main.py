from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.services.ml_service import MLService
from app.models.schemas import PerformancePrediction, PerformanceStats

app = FastAPI(title="AI Insights Engine")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://employee-performance-dashboard.onrender.com",
        "http://localhost:3001"
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ml_service = MLService()

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Insights Engine (assignment for VenEx)"}

@app.get("/api/v1/predict/employee/{employee_id}", response_model=PerformancePrediction)
def predict_employee_performance(employee_id: int):
    try:
        return ml_service.get_employee_predictions(employee_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/stats/employee/{employee_id}", response_model=PerformanceStats)
def get_employee_stats(employee_id: int):
    try:
        return ml_service.get_employee_stats(employee_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI app with Uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)