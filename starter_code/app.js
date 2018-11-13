// ====== variables and requires at the top ======
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

//  ===============================================




// ================ MiddleWare ====================
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));

//  ===============================================




// =========== Routes at the bottom ==============

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
    // example on how to get 0 index in an array from route.
    console.log("---------- ", theRandomBeer[0].method.mash_temp[0].temp.value)

    // see randomBeer.hbs for how to get same index in view page.
    res.render('beerViews/randomBeer', {oneBeer: theRandomBeer})
  })
  .catch(error => {
    console.log(error)
  })
})

// ================================================

app.listen(3000);
