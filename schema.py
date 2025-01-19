# schema.py

from datetime import datetime
from typing import Any, List

class Message:
    def __init__(self, message_id: str, content: str, sender: str, timestamp: datetime):
        self.message_id = message_id
        self.content = content
        self.sender = sender
        self.timestamp = timestamp

    def __repr__(self):
        return f"Message(id={self.message_id}, content={self.content}, sender={self.sender}, timestamp={self.timestamp})"

class Event:
    def __init__(self, event_type: str, data: List[Message], timestamp: datetime):
        self.event_type = event_type
        self.data = data
        self.timestamp = timestamp

    def __repr__(self):
        return f"Event(type={self.event_type}, data={self.data}, timestamp={self.timestamp})"

class Response:
    def __init__(self, response_id: str, content: str, recipient: str, timestamp: datetime, status: str = "pending"):
        self.response_id = response_id
        self.content = content
        self.recipient = recipient
        self.timestamp = timestamp

    def __repr__(self):
        return f"Response(id={self.response_id}, content={self.content}, recipient={self.recipient}, timestamp={self.timestamp}, status={self.status})"