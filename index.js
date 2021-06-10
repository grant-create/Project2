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
    async function findData() {
        try{
            const stockData = await db.stocks.findAll()
            res.render("index", {stocks:stockData})

        }catch(error) {
            console.log(error)
          }
            }
      
            findData()
    })
   
// })


//need an app.post call to add ticker, last close, and 20 day average








app.listen(PORT, () => {
    console.log("Welcome to PORT 3000")
})

