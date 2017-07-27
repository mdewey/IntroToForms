const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const bodyParser = require('body-parser')

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.use(express.static('public'))

// this will attach the bodyParser to the pipeline and attach the
// the data to the req as JSON
app.use(bodyParser.json())
// this will take the url encoded data and
//only accept the primitive types of data (strings, numbers, NOT arrays, NOT objects)
app.use(bodyParser.urlencoded({extended:false}))

// define a home page
app.get("/", (req, res) => {
  console.log("home page was here!")
  res.render('home')
});

app.post('/thankyou', (req, res) => {
  console.log("the request came from :", req.headers['user-agent'])
  // i want to show the user that we got their info
  const name = req.body.fullName
  console.log("the user said their name was: " + name)
  console.log("the full body",req.body )
  res.render('thankyou', {
    fullName: req.body.fullName,
    email: req.body.email
  })
});

app.listen(3000, () => {
  console.log("Magic is happening on port 3000")
});
