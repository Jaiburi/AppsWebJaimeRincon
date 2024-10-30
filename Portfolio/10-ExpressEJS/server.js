const express = require("express");
const app = express();
const https = require("https");

// Configure express server
app.set('view engine', 'ejs'); // Set EJS as templating engine
app.use(express.static('public')); // Serve static files
app.use(express.json()); // Handle JSON input/output
app.use(express.urlencoded({ extended: true })); // Handle form data

const longContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare...";

let posts = [];
let name;

// Root route
app.get("/", (req, res) => {
    res.render("index"); // Changed to render index.ejs instead of sending HTML file
});

// Unsecured login route (GET)
app.get("/login", (req, res) => {
    name = req.query.name;
    res.render("test", { 
        name: name,
        securityLevel: "unsecured"
    });
});

// Secured login route (POST)
app.post("/login", (req, res) => {
    name = req.body.name;
    res.render("test", { 
        name: name,
        securityLevel: "secured"
    });
});

// Home route (blog listing)
app.get("/home", (req, res) => {
    if (!name) {
        res.redirect("/");
    } else {
        res.render("home", { name: name, posts: posts });
    }
});

// Create new post
app.post("/post", (req, res) => {
    const { title, content } = req.body;
    posts.push({ 
        id: posts.length + 1,
        title, 
        content 
    });
    res.redirect("/home");
});

// View single post
app.get("/post/:id", (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    res.render("post", { name: name, post: post });
});

app.post("/post/:id/delete", (req, res) => {
  const postId = parseInt(req.params.id);
  // Filter out the post with the matching id
  posts = posts.filter(post => post.id !== postId);
  // Redirect back to the home page after deletion
  res.redirect('/home');
});

app.listen(3000, (err) => {
    console.log("Listening on port 3000");
});