# For RSVP Objects

class Rsvp:
  def __init__(self, first_name, last_name, email, phone_number, instagram, 
               timestamp, status):
    self.first_name = first_name
    self.last_name = last_name
    self.email = email
    self.phone_number = phone_number
    self.instagram = instagram
    self.timestamp = timestamp
    self.status = status

  # Convert and return rsvp info as a python dictionary
  def getRSVP(self):
    information = {
      'first_name' : self.first_name,
      'last_name' : self.last_name,
      'email' : self.email,
      'phone_number' : self.phone_number,
      'instagram' : self.instagram,
      'timestamp' : self.timestamp,
      'status': self.status
    }

    return information
  


  