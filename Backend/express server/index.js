import express from 'express';
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>This is Homepage...</h1>")
})

app.get("/about", (req, res) => {
  res.send("<h1>About...</h1>")
})

app.get("/contact", (req, res) => {
  res.send("<h1>0083138303801...</h1>")
})

app.listen(3000, () => {
  console.log(`Server is running on port ${port}.`)
})