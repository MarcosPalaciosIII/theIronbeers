
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', (req, res, next) => {
  res.render('index');
});

// this route is to get the list of beers
app.get('/beersList', (req, res, next) => {
  punkAPI.getBeers()
  .then(theListOfBeers => {
    // console.log("===============", theListOfBeers)
    res.render('beerViews/beerList', {beers: theListOfBeers})
  })
  .catch(error => {
    console.log(error)
  })

})

// this route is to get 1 random beer from the api
app.get('/randomBeers', (req, res, next) => {
  punkAPI.getRandom()
  .then(theRandomBeer => {
    console.log("---------- ", theRandomBeer)
    res.render('beerViews/randomBeer', {oneBeer: theRandomBeer})
  })
  .catch(error => {
    console.log(error)
  })
})

app.listen(3000);
