const Band = require("../models/band.model");

//We are exporting an object of key value pairs.
//The Key being how we're referring to our calls
// And the Call itself (arrow func), being the value!
//We can easily access these in the band.routes.js

module.exports = {
  findAllBands: (req, res) => {
    Band.find({}) //Will find all documents in a collection
      .then((allBands) => {
        console.log(allBands);
        res.json(allBands);
      })
      .catch((err) => {
        console.log("findAllBands has failed!");
        console.log(err);
        res.json(err);
      });
  },

  createNewBand: (req, res) => {
    console.log("BODY", req.body);
    /*
      req.body looks like...
      {
        ...,
        memberOne: "Paul",
        memberTwo: "George",
        memberThree: "Ringo",
        memberFour: "Paul"
      }

      // so we can do this
      req.body.members = [memberOne, memberTwo, memberThree, memberFour] 
      
    */

    Band.create(req.body) //creates a new doc based on info passed through the client request's body (like a form)
      .then((newBand) => {
        console.log(newBand);
        res.json(newBand);
      })
      .catch((err) => {
        // console.log(err);
        console.log("createNewBand has failed!");
        //We set a response status of 400 to
        //display our err, which is the result of the rejection of our promise.

        //A 400 status means our client is talking
        //to our server just fine, but the client isn't sending good info.

        //This is how we will eventually display
        //our validations from the server in react!

        //A 404 status error means the client's
        //requesting data that doesn't exist
        //Often due to a typo on the endpoint of your request uri

        //On the flip-side, a status of 200 means we are looking good!
        res.status(400).json(err);
      });
  },

  findOneBand: (req, res) => {
    //We use the paramater's (params) or the client's request to search for a
    //specific document by the field (here _id) specified
    Band.findOne({ _id: req.params.id }) //the params id MUST MATCH how we write it in our routes!!!
      .then((oneBand) => {
        console.log(oneBand);
        res.json(oneBand);
      })
      .catch((err) => {
        console.log(err);
        console.log("findOneBand has failed!");
        res.json(err);
      });
  },

  //Syntax is near-idential to our findOne.
  deleteOneBand: (req, res) => {
    Band.deleteOne({ _id: req.params.id })
      .then((deletedBand) => {
        console.log(deletedBand);
        res.json(deletedBand);
      })
      .catch((err) => {
        console.log(err);
        console.log("deleteOneBand has failed!");
        res.json(err);
      });
  },

  updateBand: (req, res) => {
    //This Mongoose query requires both a parameter AND body from the request!
    Band.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      //These options return a new doc and allow schema valids to run on PUT req
      { new: true, runValidators: true }
    )
      .then((updatedBand) => {
        console.log(updatedBand);
        res.json(updatedBand);
      })
      .catch((err) => {
        console.log(err);
        console.log("updateBand has failed!");
        res.status(400).json(err); //See above (explained in create)
      });
  },

  //ALTERNATIVE WAY TO WRITE IT WHICH IS SHOWN IN SOME PLACES ON IN THE PLATFORM.
  //THEY HAVE MODULE.EXPORT.KEY_NAME FOR EVERY SINGLE METHOD
  //I THINK THE WAY ABOVE IS EASIER, BUT THEY ARE ULTIMATELY THE SAME (NO CHANGE TO ROUTES SYNTAX), SO DO WHAT FEELS GOOD!

  // module.exports.findAllBands = (req, res) => {
  // Band.find({})
  //         .then(allBands => res.json(allBands))
  //         .catch(err => res.json({ message: 'Something went wrong', error: err }));
  // },

  // module.exports.findOneBand = (req, res) =>{
  //     Band.findOne({_id: req.params.id})
  //         .then((oneBand)=>{
  //             console.log(oneBand);
  //             res.json(oneBand)
  //         })
  //         .catch((err)=>{
  //             console.log("Find one Band failed");
  //             res.json({ message: 'Something went wrong in findOneBand', error: err });
  //         })
  // }
};
