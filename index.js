require('dotenv').config()
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
let rowdy = require('rowdy-logger')
const rowdyResults = rowdy.begin(express())
let db = require('./models')
let methodOverride = require('method-override')

//Alpaca stuff: 
const alpApiKey = process.env.APCA_API_KEY_ID
const alpSecretKey = process.env.APCA_API_SECRET_KEY
const moment = require("moment");
const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca({keyId:alpApiKey, secretKey:alpSecretKey, paper: true, usePolygon: false})

const PORT = 3000




const app = express();
const port = process.env.PORT || 3000;

rowdy.begin(app)

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'))
// method override so we can put and delete
app.use(methodOverride('_method'))


// app.get('/', (req,res) => {
//     res.render('index')
//   })









// GET / - main index of site
app.get('/', (req, res) => {
    const x = alpaca.lastQuote('SPY')
    .then((response) => {
       let stockPrice = response.last.askprice
       res.render("index", {stockPrice:stockPrice})
    })
   
})


//need an app.post call to add ticker, last close, and 20 day average


// Going back 21 days
var d = new Date();
 console.log(d.setDate(d.getDate()-21))
console.log(d.toLocaleString())



// https://alpaca.markets/docs/api-documentation/how-to/market-data/

async function getInfo(){
    let bars = alpaca.getBarsV2(
        "AAPL",
        {
        start: moment().subtract(30, "days").format(),
        end: moment().subtract(1, "days").format(),
        timeframe: "1Day",
        },
        alpaca.configuration
    );
    // console.log(JSON.stringify(bars))
    const barset = []
    let avg = 0
    for await (let b of bars) {
        barset.push(b);
        avg += b.ClosePrice
        
    } 
    console.log(barset.length)
    // console.log(barset[0].ClosePrice, "86")
   avg = avg/barset.length
    
    console.log(avg);
}
getInfo()

// //endpoint
// https://paper-api.alpaca.markets
//Get a quote using URL
//https://data.alpaca.markets/v1/last/stocks/GOOG



app.listen(PORT, () => {
    console.log("Welcome to PORT 3000")
})

