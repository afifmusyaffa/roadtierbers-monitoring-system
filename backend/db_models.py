from sqlalchemy import Column, Integer, String, DateTime, JSON
from datetime import datetime
from database import Base

class DetectionHistory(Base):
    __tablename__ = "detection_history"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    filename = Column(String, index=True)
    results = Column(JSON) # Store the aggregated YOLO results
