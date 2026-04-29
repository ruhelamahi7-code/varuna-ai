import requests
import random
import os
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv()

GFW_API_KEY = os.getenv("GFW_API_KEY", "")

# Realistic Indian coastal coordinates for dummy data
INDIAN_COAST_BOUNDS = {
    "lat_min": 8.0, "lat_max": 23.0,
    "lng_min": 68.0, "lng_max": 97.0
}

VESSEL_NAMES = [
    "MV Sagar Mitra", "FV Coastal Star", "MV Bay Trader",
    "FV Ocean Pride", "MV Lakshadweep Runner", "FV Deep Sea",
    "MV Gulf Carrier", "FV Mandovi Fisher", "MV Andaman Chief",
    "FV Kerala Dawn", "MV Konkan Express", "FV Tamil Fisher"
]


def fetch_from_gfw():
    """Fetch real vessel data from Global Fishing Watch API."""
    try:
        headers = {"Authorization": f"Bearer {GFW_API_KEY}"}
        url = "https://gateway.api.globalfishingwatch.org/v3/vessels"
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            return response.json()
    except Exception:
        pass
    return None


def generate_dummy_vessels(count=15):
    """
    Generate realistic dummy vessel data for demo.
    Behaves exactly like real AIS data.
    """
    vessels = []
    for i in range(count):
        lat = round(random.uniform(
            INDIAN_COAST_BOUNDS["lat_min"],
            INDIAN_COAST_BOUNDS["lat_max"]
        ), 6)
        lng = round(random.uniform(
            INDIAN_COAST_BOUNDS["lng_min"],
            INDIAN_COAST_BOUNDS["lng_max"]
        ), 6)

        # 20% chance transponder is off (suspicious)
        transponder_active = random.random() > 0.2
        # Speed: mostly slow fishing boats, some fast suspicious ones
        speed = round(random.choice([
            random.uniform(3, 12),   # normal fishing
            random.uniform(3, 12),
            random.uniform(3, 12),
            random.uniform(20, 40),  # suspicious fast vessel
        ]), 1)

        vessels.append({
            "mmsi": f"419{random.randint(100000, 999999)}",
            "name": random.choice(VESSEL_NAMES),
            "lat": lat,
            "lng": lng,
            "speed": speed,
            "transponder_active": transponder_active,
            "vessel_type": random.choice(["fishing", "cargo", "tanker"]),
            "flag": "IN",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "flagged": False
        })
    return vessels


def fetch_vessel_data():
    """Main function — tries real API first, falls back to dummy data."""
    if GFW_API_KEY:
        real_data = fetch_from_gfw()
        if real_data:
            return real_data

    # Fallback to realistic dummy data
    return generate_dummy_vessels(15)