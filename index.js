const PORT = 9002
const express = require("express")
const data = require('./nav.json')
const { gallery } = require("./gallery")
    // console.log(gallery);
    // console.log(data);

// npm init -y
// npm install express ejs

const app = express()

//configuration
app.set('view engine', 'ejs');

//middleware
app.use((req, _, next) => {
    // console.log("neue request: ", req.method, req.url);
    next()
})

app.use(express.static("public"))

//routes

app.get("/", (req, res) => {
    res.render("home", { data })
        // console.log({ navList: data });
})

app.get("/gallery", (req, res) => {
    res.render("gallery", { data, gallery })
        // console.log({ navList: data, gallery });
})
app.get("/contact", (req, res) => {
    res.render("contact", { data })
        // console.log({ navList: data, gallery });
})
app.get("/team", (req, res) => {
    res.render("team", { data })
        // console.log({ navList: data, gallery });
})
app.get("/about", (req, res) => {
    res.render("about", { data })
        // console.log({ navList: data, gallery });
})

// app.get("/:name", (req, res) => {
//     const navname = req.params.name
//     const nav = data.find(n => n.name.toLowerCase() === navname)
//     console.log(nav);
//     res.render("otherSites", { nav })
// })





app.use((_, res) => {
    res.status(404).sendFile(__dirname + "/public/error.html")
})

app.listen(PORT, () => console.log("The server listen to the Port: ", PORT))