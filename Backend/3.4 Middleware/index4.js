import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let bandName;

app.use(bodyParser.urlencoded({
  extended: true
}));

function bandNameUrl(req, res, next) {
  console.log(req.body)
  bandName = req.body["street"] + req.body["pet"]
  next()
}

app.use(bandNameUrl)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`<h1>Your Band Name is:</h1>${bandName}`)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});