const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require("mongoose");
const port = process.env.PORT || 4000;
const routes = require('./routes')
app.use(express.json())
const xss = require('xss-clean') 
// sanitize
app.use(xss())
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
})
mongoose.connection.once("open", () => {
    console.log("connection established successfully");
  });  

app.use('/api', routes)


  app.use(express.static("client/build"));
  if (process.env.NODE_ENV === "production") {
    const path = require('path')
    app.get("/*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

app.listen(port, () =>console.log(`listening on port ${port}`))