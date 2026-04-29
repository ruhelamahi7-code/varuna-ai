import firebase_admin
from firebase_admin import credentials, db
import os
import logging
from datetime import datetime, timezone

logger = logging.getLogger(__name__)

_firebase_initialized = False


def init_firebase():
    global _firebase_initialized
    if _firebase_initialized:
        return True
    try:
        cred_path = os.path.join(os.path.dirname(__file__), "serviceAccountKey.json")
        if not os.path.exists(cred_path):
            logger.warning("serviceAccountKey.json not found — Firebase disabled")
            return False
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred, {
            "databaseURL": os.getenv("FIREBASE_DB_URL", "")
        })
        _firebase_initialized = True
        return True
    except Exception as e:
        logger.error(f"Firebase init failed: {e}")
        return False


def write_vessel(vessel):
    try:
        if not init_firebase():
            return False
        ref = db.reference(f"vessels/{vessel['mmsi']}")
        ref.set(vessel)
        return True
    except Exception as e:
        logger.error(f"Error writing vessel: {e}")
        return False


def write_alert(alert):
    try:
        if not init_firebase():
            return False
        ref = db.reference("alerts").push()
        alert["id"] = ref.key
        ref.set(alert)
        return True
    except Exception as e:
        logger.error(f"Error writing alert: {e}")
        return False


def get_all_vessels():
    try:
        if not init_firebase():
            return []
        ref = db.reference("vessels")
        data = ref.get()
        return list(data.values()) if data else []
    except Exception as e:
        logger.error(f"Error fetching vessels: {e}")
        return []


def get_all_alerts():
    try:
        if not init_firebase():
            return []
        ref = db.reference("alerts")
        data = ref.get()
        return list(data.values()) if data else []
    except Exception as e:
        logger.error(f"Error fetching alerts: {e}")
        return []