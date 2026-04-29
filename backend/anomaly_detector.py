from datetime import datetime

# Indian marine protected zones (lat/lng polygon boundaries)
PROTECTED_ZONES = [
    {"name": "Gulf of Mannar", "lat_min": 8.5, "lat_max": 9.5, "lng_min": 78.0, "lng_max": 79.5},
    {"name": "Lakshadweep Sea", "lat_min": 8.0, "lat_max": 12.0, "lng_min": 71.0, "lng_max": 74.0},
    {"name": "Sundarbans", "lat_min": 21.5, "lat_max": 22.5, "lng_min": 88.5, "lng_max": 89.5},
    {"name": "Gulf of Kutch", "lat_min": 22.0, "lat_max": 23.5, "lng_min": 68.0, "lng_max": 70.5},
    {"name": "Andaman Waters", "lat_min": 10.0, "lat_max": 14.0, "lng_min": 92.0, "lng_max": 94.0},
]

MAX_FISHING_SPEED = 25      # knots — above this = suspicious
NIGHT_START = 22            # 10pm
NIGHT_END = 5               # 5am


def is_in_protected_zone(lat, lng):
    for zone in PROTECTED_ZONES:
        if (zone["lat_min"] <= lat <= zone["lat_max"] and
                zone["lng_min"] <= lng <= zone["lng_max"]):
            return True, zone["name"]
    return False, None


def is_night_time():
    hour = datetime.utcnow().hour + 5  # IST offset
    hour = hour % 24
    return hour >= NIGHT_START or hour < NIGHT_END


def analyze_vessel(vessel):
    """
    Rule-based AI anomaly detection engine.
    Returns flagged status, threat type, and confidence score.
    """
    lat = vessel.get("lat", 0)
    lng = vessel.get("lng", 0)
    speed = vessel.get("speed", 0)
    transponder_active = vessel.get("transponder_active", True)

    threats = []
    confidence = 0

    # Rule 1 — Zone intrusion
    in_zone, zone_name = is_in_protected_zone(lat, lng)
    if in_zone:
        threats.append(f"Zone intrusion: {zone_name}")
        confidence += 40

    # Rule 2 — Transponder went dark
    if not transponder_active:
        threats.append("Transponder signal lost")
        confidence += 35

    # Rule 3 — Abnormal speed in fishing area
    if speed > MAX_FISHING_SPEED:
        threats.append(f"Abnormal speed: {speed} knots")
        confidence += 15

    # Rule 4 — Night movement in protected zone
    if in_zone and is_night_time():
        threats.append("Night movement in restricted zone")
        confidence += 10

    confidence = min(confidence, 99)  # cap at 99%

    return {
        "flagged": len(threats) > 0,
        "threat_type": " | ".join(threats) if threats else "None",
        "confidence": confidence
    }