const express = require("express");

const port = 8000;

const app = express();

app.use(express.urlencoded());

app.set("view engine", "ejs");
app.get("/", (req, res) => {
    return res.render("index", { user: tasks });
})

let tasks = [
    {
        id: 1,
        task: "Task-1"
    },
    {
        id: 2,
        task: "Task-2"
    },
    {
        id: 3,
        task: "Task-3"
    },
    {
        id: 4,
        task: "Task-4"
    },

];

app.post("/insertData", (req, res) => {
    let obj = {
        id: tasks.length + 1,
        task: req.body.task,
    }
    tasks.push(obj);
    return res.redirect("back");
})

app.get("/editData", (req, res) => {
    let taskId = req.query.id;

    let data = tasks.filter((val) => {
        return val.id == taskId;
    });

    return res.render("edit", { user: data[0] });
});

app.post("/editData", (req, res) => {
    let taskId = req.body.id;

    let data = tasks.filter((currentData) => {
        if (currentData.id == taskId) {
            currentData.task = req.body.task;
        }
        return currentData;
    });
    // tasks = data;
    return res.redirect("/");
});

app.get("/deleteData", (req, res) => {
    let taskId = req.query.id

    let data = tasks.filter((val) => {
        return val.id != taskId;
    })
    // console.log(data);
    tasks = data;
    return res.redirect("back");
})

app.listen(port, (error) => {
    if (error) {
        console.log("Server Not Start");
    }
    console.log("Server start at port : ", port);
});