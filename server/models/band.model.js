const mongoose = require("mongoose");

const BandSchema = new mongoose.Schema(
  {
    // an _id field is AUTOMATICALLY created each time we add a new document

    name: {
      type: String,
      //Our validatoions are defined right here in our schema
      //Most take two values, the criteria and the message!
      //The messages from validators will be accessible after we set our
      //res.status(400).json(err) in our controller
      required: [true, "A band's name is required"],
      //maxlength and minlength are for Strings, max/min are for number types
      minlength: [2, "The band name must be at least 2 chracters long!"],
    },

    picture: {
      //url of image from the internet
      type: String,
      required: [true, "A band's picture is required"],
    },

    yearFormed: {
      //maxlength and minlength are for Strings, max/min are for number types
      type: Number,
      min: [1940, "No older than 1940!"],
      max: [2022, "We are in the year 2022!"],
    },
    label: {
      // if a document's field is not required, then you do not need a validator
      type: String,
    },
    active: {
      type: Boolean,
    },
    members: {
      type: String,
      required: [true, "We need some members!"],
    },
    genre: {
      type: String,
      required: [true, "We need some members!"],
      //An enum will require this field's value in the request to
      //include one of these values EXACTLY as typed here
      enum: [
        "Rock",
        "Jazz",
        "Prog",
        "Hip Hop",
        "RnB",
        "Soul",
        "Classical",
        "Metal",
        "Pop",
        "Techno",
        "Grunge",
      ],
    },

    //timestamps automatically create "createdAt" and"updatedAt" date and time info for each document
    //everytime a doc is updated, it will change the "updatedAt"
  },
  { timestamps: true }
);

//The Model is a combination of the:
//1. Collection name which will be a singular, capitalized version of the collection name that's held in the db (collection will show in our db as "bands")
//2. The Schema
const Band = mongoose.model("Band", BandSchema);

//mongoose docs note: The first argument is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name.
// Thus, for the example above, the model Tank is for the tanks collection in the database.

//Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

module.exports = Band;
