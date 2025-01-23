import pymongo
import os
import sys
from rsvp import Rsvp

class DataBase:
  def __init__(self, database, collection):
    self.database = database
    self.collection = collection
    self.connection_string = os.getenv('ATLAS_CONNECTION_STRING')
    if not self.connection_string:
      raise ValueError("Connection string not found. Please set ATLAS_CONNECTION_STRING/")
    self.client = self.__mongo_connect()
  
  # Retrieves Client
  def __mongo_connect(self):
    # Create a connection using MongoClient.
    try:
      client = pymongo.MongoClient(self.connection_string)
      return client
    except pymongo.errors.ConfigurationError:
      print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
      sys.exit(1)

  # Retrieve Mongo Collection of Rsvps
  def __getRsvpCollection(self):
    db = self.client[self.database]
    rsvp_collection = db[self.collection]

    return rsvp_collection

  def addRsvp(self, rsvp : Rsvp):
    rsvp_dictionary = rsvp.getRSVP()

    # Note! Consider Adding an abstracting helper method
    try:
      self.__getRsvpCollection().insert_one(rsvp_dictionary)
    except pymongo.errors.OperationFailure:
      print("An authentication error was received. Are you sure your database user is authorized to perform write operations?")
      sys.exit(1)
    else:
      print("Rsvp successfully inserted.")
      print("\n")
  
  def deleteRsvp(self, rsvp : Rsvp):
    rsvp_dictionary = rsvp.getRSVP()

    # Note! Consider Adding an abstracting helper method
    try:
      self.__getRsvpCollection().delete_one(rsvp_dictionary)
    except pymongo.errors.OperationFailure:
      print("An authentication error was received. Are you sure your database user is authorized to perform write operations?")
      sys.exit(1)
    else:
      print("Rsvp successfully deleted.")
      print("\n")


  # TODO
  def findRsvp(self, searchQuery: str):

    # parse query

    # increment over query
      # test name, email, phone number ...
      # if match, add rsvp to close_queries
    return None
  
  # Print all RSVPS
  def printRsvps(self):
    collection = self.getRsvps()
    for rsvp in collection:
      print(rsvp)

  # Get all RSVPS
  def getRsvps(self):
    try:
      return self.__getRsvpCollection().find()
    except Exception as e:
      print(f"Error retrieving RSVPS: {e}")
      return []

  '''
    Functions to Manipulate Data
  '''

  # Sort collection by field
  def sortData(self, field: str, ascending: bool) :
    sort_order = pymongo.ASCENDING if ascending else pymongo.DESCENDING
    try:
      return list(self.__getRsvpCollection().find().sort(field, sort_order))
    except Exception as e:
      print(f"Error sorting data: {e}")
      return []


