import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "AUTOLOGIN",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

app.use(passport.initialize()) // Intializes Passport for incoming requests, allowing authentication strategies to be applied.
app.use(passport.session()) // Middleware that will restore login state from a session.

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "password",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get('/secrets', (req, res) => {
  console.log(req.user)
  // Test if request is authenticated.
  if (req.isAuthenticated()) {
    res.render("secrets.ejs")
  } else {
    res.redirect("/login")
  }
})

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (error) => {
            console.log(error);
            res.redirect("/secrets")
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Authenticates requests.
// Applies the nameed strategy (or strategies) to the incoming request, in order to authenticate the request. 
// If authentication is successful, the user will be logged in and populated at req.user and a session will be established by default. 
// If authentication fails, an unauthorized response will be sent.
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));

// Register a strategy for later use when authenticating requests. The name with which the strategy is registered is passed to authenticate(). 
passport.use( new Strategy( async function verify(username, password, cb) {
  console.log(username);

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          return cb(err)
        } else {
          if (result) {
            return cb(null, user)
          } else {
            return cb(null, false)
          }
        }
      });
    } else {
      return cb("User not found");
    }
  } catch (err) {
    return cb(err)
  }
}));


// Registers a function used to serialize user objects into the session.
passport.serializeUser((user, cb) => {
  cb(null, user)
});

// Registers a function used to deserialize user objects out of the session.
passport.deserializeUser((user, cb) => {
  cb(null, user)
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
