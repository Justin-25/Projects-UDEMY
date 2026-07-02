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

async function visitedCountries() {
  let countries = []
  const result = await db.query("SELECT country_code FROM visited_countries");
    countries = result.rows.map(row => row.country_code)

  return countries;
}

app.get('/', async (req, res) => {
  //Write your code here.
  const countryCode = await visitedCountries(); 
  res.render("index.ejs", {
    countries: countryCode,
    total: countryCode.length
  })
});

// Check the name=country against countries table then save the country_code to visited countries

app.post('/add', async (req, res) => {
  let country = req.body.country;
  const result = await db.query("SELECT (country_name), (country_code) FROM countries WHERE country_name ILIKE $1", [`%${country}%`]);
    try {
      if(result.rows.length !== 0) {
        const data = result.rows[0];
        const countryCode = data.country_code
      
        await db.query(
          "INSERT INTO visited_countries (country_code) VALUES ($1)",
          [countryCode]
        );
        res.redirect('/')
      } else {
        const countryCode = await visitedCountries();
        res.render("index.ejs", {
          countries: countryCode,
          total: countryCode.length,
          error: 'Countries does not exist, Please try again...'
        })
      }
    } catch (error) {
      console.log(error)
      const countryCode = await visitedCountries();
      res.render("index.ejs", {
        countries: countryCode,
        total: countryCode.length,
        error: 'Countries already exist, Insert new countries...'
      })
    }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
