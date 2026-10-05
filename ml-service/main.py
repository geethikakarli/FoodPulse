from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import pickle
import math

app = FastAPI(title="FoodPulse ML Service", description="AI recommendations for food redistribution")

class DonationRequest(BaseModel):
    food_category: str
    food_type: str
    quantity: int
    donor_lat: float
    donor_lng: float

class NGOResponse(BaseModel):
    ngo_id: int
    ngo_name: str
    match_score: float
    distance_km: float

# Load data and model
try:
    ngo_df = pd.read_csv('ngo_data.csv')
    with open('rf_model.pkl', 'rb') as f:
        rf_model = pickle.load(f)
except Exception as e:
    print("Warning: Could not load model or data. Run train_model.py first.")
    ngo_df = pd.DataFrame()
    rf_model = None

def haversine(lat1, lon1, lat2, lon2):
    R = 6371 # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2) * math.sin(dlat/2) + math.cos(math.radians(lat1)) \
        * math.cos(math.radians(lat2)) * math.sin(dlon/2) * math.sin(dlon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

@app.get("/")
def health_check():
    return {"status": "ML Service is running"}

@app.post("/api/recommend", response_model=list[NGOResponse])
def recommend_ngo(donation: DonationRequest):
    if rf_model is None or ngo_df.empty:
        return []
    
    recommendations = []
    for _, row in ngo_df.iterrows():
        dist = haversine(donation.donor_lat, donation.donor_lng, row['ngo_lat'], row['ngo_lng'])
        
        # Features: [ngo_lat, ngo_lng, capacity_meals, past_acceptance_rate]
        features = [[row['ngo_lat'], row['ngo_lng'], row['capacity_meals'], row['past_acceptance_rate']]]
        
        # Predict base score
        base_score = rf_model.predict(features)[0]
        
        # Penalize score based on distance
        final_score = max(0, base_score - (dist * 2)) 
        
        recommendations.append({
            "ngo_id": int(row['ngo_id']),
            "ngo_name": f"NGO {int(row['ngo_id'])}",
            "match_score": round(final_score, 1),
            "distance_km": round(dist, 2)
        })
        
    recommendations.sort(key=lambda x: x["match_score"], reverse=True)
    return recommendations
