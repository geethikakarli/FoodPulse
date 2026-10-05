import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import pickle
import os

# Create mock dataset for NGOs
data = {
    'ngo_id': [1, 2, 3, 4, 5],
    'ngo_lat': [12.9716, 12.9720, 12.9650, 12.9800, 12.9500],
    'ngo_lng': [77.5946, 77.5950, 77.5800, 77.6000, 77.5500],
    'accepts_cooked': [1, 0, 1, 1, 0],
    'accepts_raw': [1, 1, 0, 1, 1],
    'capacity_meals': [50, 200, 30, 100, 500],
    'past_acceptance_rate': [0.9, 0.85, 0.95, 0.7, 0.99]
}
df = pd.DataFrame(data)
df.to_csv('ngo_data.csv', index=False)
print("Saved mock NGO data to ngo_data.csv")

# Train a dummy model
# In reality, this would predict suitability score based on donor lat/lng, food type, etc.
# Here we'll just train a Random Forest to output a score based on distance & capacity
X = df[['ngo_lat', 'ngo_lng', 'capacity_meals', 'past_acceptance_rate']]
y = df['past_acceptance_rate'] * 100 # Mock score target

rf = RandomForestRegressor(n_estimators=10)
rf.fit(X, y)

with open('rf_model.pkl', 'wb') as f:
    pickle.dump(rf, f)
print("Saved mock Random Forest model to rf_model.pkl")
