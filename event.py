import os

class Event:
  def __init__(self, collection_name):
    self.name = None
    self.database = os.getenv('DATABASE')
    self.collection = collection_name

  
  def getTotalRsvp(self):
    pass

  def getTotalRsvpYes(self) -> int:
    pass

  def getTotalRsvpNo(self) -> int:
    pass

  def getTotalRsvpMaybe(self) -> int :
    pass