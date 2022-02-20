const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").createServer(app);
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(express.static("build"));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"), function (err) {
    if (err) {
      console.log(err);
    }
  });
});

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
