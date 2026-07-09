import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'secrets',
  password: 'password',
  port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkExistingEmail = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkExistingEmail.rows.length > 0) {
      res.send("Email is already existing, try different email to register...");
    } else {
      await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
      res.render("secrets.ejs")
    }
  } catch (error) {
    console.log(error)
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  const checkExistingEmail = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  if (checkExistingEmail.rows.length > 0) {
    console.log(checkExistingEmail.rows);
    const user = checkExistingEmail.rows[0];
    console.log(user)
    const storedPassword = user.password
    console.log(storedPassword)

    if (password === storedPassword) {
      res.render("secrets.ejs");
    } else {
      res.send("Password incorrect...")
    }
  } else {
    console.log("There's an error...")
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
