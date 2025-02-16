// See: http://localhost:5038/InviteManager/InviteManager/Event

require('dotenv').config();


var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());
app.use(Express.json());

var CONNECTION_STRING= process.env.ATLAS_CONNECTION_STRING;
var DATABASENAME = process.env.DATABASE;
var database;

console.log("hi");

// Connect to MongoDB first, then start the server
MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    database = client.db(DATABASENAME);
    console.log("MongoDB Connection Successful");

    app.listen(5038, () => {
      console.log("Server is running on port 5038");
    });
  })
  .catch(error => {
    console.error("MongoDB Connection Failed:", error);
  });


//  http://localhost:5038/InviteManager/Event/GetRSVPS
app.get(`/api/getRSVPS`, async (request, response) => {
  try {
    if (!database) {
      return response.status(500).send("Database not connected");
    }
    const result = await database.collection("Event").find({}).toArray();
    response.send(result);
  } catch (error) {
    console.error("Error fetching events:", error);
    response.status(500).send("Internal Server Error");
  }
});


// Add RSVPS to Database
app.post('/api/addRSVPS', async (request, response) => {
  try {
    if (!database) {
      return response.status(500).send("Database not connected");
    }

    // Fetch the current document count
    const numOfDocs = await database.collection("Event").countDocuments();

    const result = await database.collection("Event").insertOne({
      id: (numOfDocs + 1).toString(),
      description: request.body.newNotes
    });

    response.send(result);
  } catch (error) {
    console.error("Error adding RSVP:", error);
    response.status(500).send("Internal Server Error");
  }
});

// Remove RSVPs from Database
app.delete('/api/deleteRSVPS', async (request, response) => {
  try {
    if (!database) {
      return response.status(500).send("Database not connected");
    }

    const { id } = request.query; // Get ID from query params

    if (!id) {
      return response.status(400).json({ error: "Missing ID parameter" });
    }

    // Ensure you're deleting based on the correct field
    const result = await database.collection("Event").deleteOne({ id: id });

    if (result.deletedCount === 0) {
      return response.status(404).json({ error: "No matching document found" });
    }

    response.json({ message: "RSVP deleted successfully" });

  } catch (error) {
    console.error("Error deleting RSVP:", error);
    response.status(500).send("Internal Server Error");
  }
});




