//We export an object of key-value pairs from our controller.
//Rather than writing the ENTIRE function, we simply access it using BandController.findAllBands
//(or whatever key corresponds with the route)
const BandController = require("../controllers/band.controller");

//app parameter gets app variable argument ( express() ) in server.js when invoked
module.exports = (app) => {
  //if data is only being read, we can use a GET HTTP Verb
  app.get("/api/bands", BandController.findAllBands);
  //if data is being sent to my server to create a new document, we use a POST HTTP Verb
  // IMPORTANT: the endpoints can be the same as long as they have differing HTTP Verbs
  app.post("/api/bands", BandController.createNewBand);
  //Always put the ones with params after the ones that do not have them.
  //The parameter (params) id, as defined in the controller MUST MATCH
  //what we defined it as in the controller!
  app.get("/api/bands/:id", BandController.findOneBand);
  app.delete("/api/bands/:id", BandController.deleteOneBand);
  app.put("/api/bands/:id", BandController.updateBand);
};

//TEST THESE IN POSTMAN BEFORE YOU DO ANYTHING IN REACT
//This allows us to be sure that any error that occurs when making requests on the front-end
// isn't due to a problem in the back-end.
//You effectively decrease the "error search" by 50%!
