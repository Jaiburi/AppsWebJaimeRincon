const express = require("express");
const app = express();

let names = [];
let tasks = [];
let error = null;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); 

app.route("/")
.get((req, res) => {
    res.render(__dirname + "/html/index.html", { error, names, tasks });
})
.post((req, res) => {
    res.send("Response");
});

app.route("/greet")
.get((req, res) => {
    const name = req.query.name;
    if (name) {
        names.push(name);
        error = null;
    }
    res.redirect("/");
})
.put((req, res) => {
    const name = req.body.name;
    if (name) {
        names.push(name);
    }
    res.json({ names });
});

app.route("/task")
.get((req, res) => {
    res.json({ tasks });
})
.post((req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
        error = null;
    }
    res.redirect("/");
});

app.get("/delete", (req, res) => {
    const index = req.query.source;
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }
    res.redirect("/");
});

app.get("/up", (req, res) => {
    const index = Number(req.query.source);
    if (index > 0) {
        const task = tasks.splice(index, 1)[0];
        tasks.splice(index - 1, 0, task);
    }
    res.redirect("/");
});

app.get("/down", (req, res) => {
    const index = Number(req.query.source);
    if (index < tasks.length - 1) {
        const task = tasks.splice(index, 1)[0];
        tasks.splice(index + 1, 0, task);
    }
    res.redirect("/");
});

app.get("/wazzup", (req, res) => {
    const index = req.query.source;
    if (index >= 0 && index < names.length) {
        res.render(__dirname + "/html/wazzup.html", { name: names[index] });
    } else {
        error = "Name not registered";
        res.redirect("/");
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});