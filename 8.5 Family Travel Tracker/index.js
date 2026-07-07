import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "password",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries JOIN users ON user_id = users.id WHERE users.id = $1", [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return (
    users.find((user) => {
      return user.id == currentUserId;
    })
  )
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUsers = await getCurrentUser();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUsers.color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body.country;

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    const data = result.rows[0];
    const countryCode = data.country_code;
    const currentUsers = await getCurrentUser(); 
    try {
      if (currentUserId === currentUsers.id) {
        await db.query(
          "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
          [countryCode, currentUserId]
        );
        res.redirect("/"); 
      } else {
        console.log("There's an error...")
      }
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  currentUserId = parseInt(req.body.user);
  const add = req.body.add;
  const currentUsers = await getCurrentUser(); 

  if (add === "new") {
    res.render('new.ejs')
  } else if (currentUserId === currentUsers.id) {
    await db.query("SELECT country_code FROM visited_countries JOIN users ON user_id = users.id WHERE users.id = $1", [currentUserId]);
    res.redirect("/")
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const name = req.body.name;
  const color = req.body.color;
  try {
    const result = await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id;", [name, color]);
    const user = result.rows[0];
    const newUserId = user.id;
      currentUserId = newUserId;

    if (!currentUserId) {
      return null
    }

    res.redirect("/");
  } catch (error) {
    console.error("There's an error", error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
