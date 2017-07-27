const express = require('express')
const app = express()

const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

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
// This is registered after the bodyParser so that
// there is something to validate
app.use(expressValidator())

// define a home page
app.get("/", (req, res) => {
  console.log("home page was here!")
  res.render('home')
});

app.post('/thankyou', (req, res) => {
  console.log("the full body",req.body )

  req
    .checkBody("email", "You must give me your email")
    .notEmpty();

  req
    .checkBody("fullName", "We need your full name")
    .notEmpty();

  const errors = req.validationErrors()
  console.log(errors)
  if (errors){
    // render the form again with the errors
    const data = {
      errors: errors
    }
    res.render('home', data)
  } else{
    // render the thank you page
      res.render('thankyou', {
        fullName: req.body.fullName,
        email: req.body.email
      })
  }
});

app.listen(3000, () => {
  console.log("Magic is happening on port 3000")
});
