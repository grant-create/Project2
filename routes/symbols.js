require('dotenv').config()
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
let rowdy = require('rowdy-logger')
const rowdyResults = rowdy.begin(express())
let db = require('../models')
let methodOverride = require('method-override')
const router = express.Router();

//Alpaca stuff: 
const alpApiKey = process.env.APCA_API_KEY_ID
const alpSecretKey = process.env.APCA_API_SECRET_KEY
const moment = require("moment");
const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca({keyId:alpApiKey, secretKey:alpSecretKey, paper: true, usePolygon: false})






//need an app.post call to add ticker, then auto fills the last close 20 day average and date
// Add stocks to the list: using POST





// Press a button to update entire table. While running, should have a loading bar








// Delete stock from table:


router.delete('/:name', (req, res) => {
    let removeStock = req.params.ticker
    
    req.params.name
    async function removeStockFromDF() {
      try {
        await db.stocks.destroy({
          where: { 
            ticker:  removeStock
          }
        })
        
      } catch (error) {
        console.log(error)
      }
      // const allRemainingPkmn = await db.pokemon.findAll()
      // for (const pokemon of allRemainingPkmn){
      //   console.log(pokemon.name)
      // }
    }
    removeStockFromDF()
    
    res.redirect('/index')
    
    
    
  })


  module.exports = router;