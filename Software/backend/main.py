from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict
import time

app = FastAPI()

# In-memory store for device location (simulate a real database)
device_locations: Dict[str, dict] = {}

class LocationUpdate(BaseModel):
    device_id: str
    latitude: float
    longitude: float

@app.post("/update-location/")
def update_location(data: LocationUpdate):
    device_locations[data.device_id] = {
        "latitude": data.latitude,
        "longitude": data.longitude,
        "timestamp": time.time()
    }
    return {"status": "updated"}

@app.get("/get-location/{device_id}")
def get_location(device_id: str):
    if device_id not in device_locations:
        raise HTTPException(status_code=404, detail="Device not found")
    return device_locations[device_id]
