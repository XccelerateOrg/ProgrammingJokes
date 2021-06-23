const express = require("express");
const bodyParser = require("body-parser");
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());
// first route is going to be a get all route
app.get("/api/jokes", (request, response) => {
  return knex("jokes")
    .select("*")
    .then((jokes) => {
      response.send(jokes);
    });
});

// post route
app.post("/api/jokes", (request, response) => {
  let joke = request.body;
  console.log("joke", joke);
  return knex("jokes")
    .insert(joke)
    .then(() => {
      response.send("inserted");
    });
});

app.listen(3001, () => {
  console.log(`port listening on 3001`);
});
