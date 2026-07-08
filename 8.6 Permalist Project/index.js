import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'todo',
  password: 'password',
  port: 5432
})

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

async function getTodoList() {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  items = result.rows;
  return items
}

app.get("/", async (req, res) => {
  const todoList = await getTodoList();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: todoList,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    if (!item) {
      return null
      res.redirect('/');
    } else {
      await db.query("INSERT INTO items (title) VALUES ($1) RETURNING *;", [item]);
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
  }
});

app.post("/edit", async (req, res) => {
  const updateItem = req.body.updatedItemTitle;
  const updateId = req.body.updatedItemId;
  await db.query("UPDATE items SET title = $1 WHERE id = $2", [updateItem, updateId]);
  res.redirect('/')
});

app.post("/delete", async (req, res) => {
  const deleteItem = req.body.deleteItemId;
  await db.query("DELETE FROM items WHERE id = $1", [deleteItem]);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
