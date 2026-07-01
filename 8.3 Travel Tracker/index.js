import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: 'password',
  port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', async (req, res) => {
  //Write your code here.
  let countryCode = []
  const result = await db.query("SELECT country_code FROM visited_countries");
  const rows = result.rows.map(row => row.country_code)
    countryCode = rows;
  console.log(countryCode)
  res.render("index.ejs", {
    countries: countryCode,
    total: countryCode.length
  })
});

// Check the name=country against countries table then save the country_code to visited countries

app.post('/add', async (req, res) => {
  let country = req.body.country;
  const dbCountries = await db.query("SELECT * FROM countries");
  const countriesData = dbCountries.rows.find((row) => 
    row.country_name.toLowerCase() === country.toLowerCase() || row.country_code.toLowerCase() === country.toLowerCase()
  );

  if (!countriesData){
    res.send('<div>This country doesnt exist, please try again</div>')
  } else {
    await db.query(
      "INSERT INTO visited_countries (country_code) VALUES ($1)",
      [countriesData.country_code]
    );
    res.redirect('/')
  }
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
