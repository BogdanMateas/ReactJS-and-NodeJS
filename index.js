const mysql = require("mysql");
const express = require("express");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "todo_app"
});

connection.connect();

app.use(express.json());

app.get("/lists", function(req, res) {
  connection.query("SELECT * FROM todolists", function(error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/lists/:id/todos", function(req, res) {
  connection.query(
    "SELECT * FROM todo_app.todotasks WHERE todoListId = ?",
    [req.params.id],
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.post("/lists", function(req, res) {
  connection.query("INSERT INTO todo_app.todolists SET ?", req.body, function(
    error,
    results
  ) {
    if (error) throw error;
    console.log(results);
    res.json(results.insertId);
  });
});

app.post("/lists/:id/todos", function(req, res) {
  const data = { ...req.body, todoListId: req.params.id };
  console.log(data);
  connection.query("INSERT INTO todo_app.todotasks SET?", data, function(
    error,
    results
  ) {
    if (error) throw error;
    console.log(results);
    res.json(results.insertId);
  });
});

app.delete("/lists/:id", function(req, res) {
  connection.query(
    "DELETE FROM  todo_app.todolists WHERE id = ?",
    [req.params.id],
    function(error, results) {
      if (error) throw error;
      console.log("Number of records deleted: " + results.affectedRows);
      res.json(results.affectedRows);
    }
  );
});
app.delete("/todos/:id", function(req, res) {
  connection.query(
    "DELETE FROM  todo_app.todotasks WHERE id = ?",
    [req.params.id],
    function(error, results) {
      if (error) throw error;
      console.log("Number of records deleted: " + results.affectedRows);
      res.json(results.affectedRows);
    }
  );
});

app.put("/todos/:id", function(req, res) {
  connection.query(
    "UPDATE todo_app.todotasks SET ?  WHERE id = ?",
    [req.body, req.params.id],
    function(error, results) {
      if (error) throw error;
      console.log(results);
      res.json(results.insertId);
    }
  );
});

app.listen(5000);
