const PORT = 9001
const express = require("express")
const data = require('./nav.json')
console.log(data);

// npm init -y
// npm install express ejs

const app = express()

//configuartion
app.set('view engine', 'ejs');

//middleware
app.use((req, _, next) => {
    console.log("neue request: ", req.method, req.url);
    next()
})

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("home", { navList: data })
})

app.get("/:name", (req, res) => {
    const navname = req.params.name
    const nav = data.find(n => n.name.toLowerCase() === navname)
    console.log(nav);
    res.render("otherSites", { nav })
})

app.get(":url", (req, res) => {
    const navurl = req.params.url
    const url = data.find(u => u.url === navurl)
    res.render("otherSites", { url })
})


app.use((_, res) => {
    res.status(404).sendFile(__dirname + "/public/error.html")
})

app.listen(PORT, () => console.log("The server listen to the Port: ", PORT))