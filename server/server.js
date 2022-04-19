//This order is necessary! Don't move things around.
const express = require("express");
const cors = require("cors");
const app = express();

//This parses incoming requests with JSON payloads.
//Allows us to recongnize Request Object as a JSON Object.
app.use(express.json());
//This parses incoming requests with JSON payloads consisting of STRINGS OR ARRAYS.
//Allows us to recongnize Request Object as a strings or arrays.
app.use(express.urlencoded({ extended: true }));

//This lets our front-end at port 3000 make calls to our back-end at port 8000.
//Taking it away will result in "cors errors" when attemptnig your axios calls!
//This security feature is built into the browser. That's why we don't experience it in Postman.
app.use(cors());

require("./routes/band.routes")(app);
// Longhand for line 23:
// const bandRoutes = require("./routes/game.routes");
// bandRoutes(app);

require("./config/mongoose.config"); //connects to mongodb

const myPort = 8000;
//After connecting to our port (8000), this console.log lets us know we're connected to our server.
app.listen(myPort, () => console.log(`You are connected to port ${myPort}`));

//PUT A .GITIGNORE IN YOUR APPLICATIONS ROOT (HERE W5D2) TO IGNORE NODE_MODULES IN THE SERVER
//THESE ARE AUTOMATICALLY IGNORE IN THE CLIENT AFTER RUNNING CRA BUT NOT THE SERVER.
