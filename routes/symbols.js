require('dotenv').config()
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
let rowdy = require('rowdy-logger')
const rowdyResults = rowdy.begin(express())
let db = require('../models')
let methodOverride = require('method-override')
const router = express.Router();
const { Op } = require("sequelize");
let curl = require('curl')

//Alpaca stuff: 
const alpApiKey = process.env.APCA_API_KEY_ID
const alpSecretKey = process.env.APCA_API_SECRET_KEY
const moment = require("moment");
const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca({keyId:alpApiKey, secretKey:alpSecretKey, paper: true, usePolygon: false})


// Getting functions from private folder/getInfo.js
const getInfo = require('../private/getInfo.js')

// getInfo.function()




//ADD TO LIST

//need an app.post call to add ticker, then auto fills the last close 20 day average and date
// Add stocks to the list: using POST

router.post('/', (req,res) => {
    // console.log(req.body.name)
   
    const newStock = req.body.name
    async function findOrCreateStock(){
      try {
  

        
        let lastClose = await getInfo.getLastClose(newStock)
        let rollingAvg = await getInfo.getRollingAvg(newStock)
        let sDate = await new Date()
        
        // the findOrCreate promise returns an array with two elements,
        // so 'array destructuring' is used to assign the names to the elements
        
        const [stocks, created] = await db.stocks.findOrCreate({
          // where is used search for values in columns
          where: {
            ticker: newStock,
            
          },
          default: {
              rollingAvg: lastClose,
              lastClose: rollingAvg,
              date: sDate

          }
        })

        //

        let allStocks = await db.stocks.findAll()

    
        for(stock of allStocks){
          let ticker = stock.get().ticker
          let lastClose = await getInfo.getLastClose(ticker)
          let rollingAvg = await getInfo.getRollingAvg(ticker)
        // i++
          // console.log(ticker)
        //https://sequelize.org/master/manual/model-querying-basics.html#simple-update-queries
        // Change everyone without a last name to "Doe"
          await db.stocks.update({ 
            ticker: ticker,
            rollingAvg: rollingAvg,
            lastClose: lastClose,
            date: sDate
        
        }, {
           where: {
              ticker: ticker
          }
        });
      }
        res.redirect('/')


        console.log(`${stocks.ticker} was ${created ? 'created' : 'found'}`)
      }catch (error) {
        console.log(error)
      }
    }
      findOrCreateStock()
      res.redirect('/')
})



// UPDATE LIST

// Press a button to update entire table. While running, should have a loading bar
router.put('/', async (req,res) => {
  let i = 0
  let allStocks = await db.stocks.findAll()

    
    for(stock of allStocks){
      let ticker = stock.get().ticker
      let lastClose = await getInfo.getLastClose(ticker)
      let rollingAvg = await getInfo.getRollingAvg(ticker)
    // i++
      // console.log(ticker)
    //https://sequelize.org/master/manual/model-querying-basics.html#simple-update-queries
    
    // Test the await on 119
      await db.stocks.update({ 
        ticker: ticker,
        rollingAvg: rollingAvg,
        lastClose: lastClose,
        date: new Date()
    
    }, {
       where: {
          ticker: ticker
      }
    });
  }


//  PART OF UPDATE LIST

  // TRYING TO ADD WALLSTREET BETS REDDIT TO TABLE (UPDATES BUTTON)

  
db.wsb.destroy({
    where: {},
    truncate: true
  })


  let wsbUrl = 'https://dashboard.nbshare.io/api/v1/apps/reddit'
    
    let wsbRes = await axios.get(wsbUrl)
      for (item of wsbRes.data){

            // console.log(item.sentiment, item.ticker)
        
        //     //post to wsb table, then update
        
        db.wsb.findOrCreate({
          
          where: {
            
            ticker: item.ticker,
            sentiment: item.sentiment,
            sentiment_score: item.sentiment_score
          }
          
      }).then(response => {
        // console.log(response)
      })
      
    db.wsb.update
      }
    res.redirect('/')
}) // post req close












// DELETE FROM LIST


// Delete stock from table:
router.delete('/:ticker', (req, res) => {
    let removeStock = req.params.ticker
    
    req.params.name
    async function removeStockFromDF() {
      // console.log("delte funct")
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
    
    res.redirect('/')
    
    
    
  })





// TO FILTER TABLE BY PRICE OF STOCK

router.get('/number', async (req,res) =>{
  // console.log(req.query.number)
  const wsbData = await db.wsb.findAll()
  db.stocks.findAll({

    where: { 
      lastClose: {

        [Op.lt]: parseInt(req.query.number)
      }
    },
  }).then(foundstocks => {
    
    // console.log(foundstocks)
    const wsb = db.wsb.findAll()
    
    res.render("index", {stocks:foundstocks, wsb:wsbData})
  })
})






// router.post('/', (req,res) => {

  
//   let wsbUrl = 'https://dashboard.nbshare.io/api/v1/apps/reddit'
  
//     let wsbRes = await axios.get(wsbUrl)
  
//       // console.log(wsbRes)
  
//       //post to wsb table, then update
  
//       db.wsb.findOrCreate({
//           where: {
//             ticker: 'WOOF',
//             sentiment: 'Bearish',
//             sentiment_score: 0.81
//         }).then(stock => {
//                 console.log('Created: ', stock.sentiment)
//        })
      
          
        
//           db.wsb.update
        
//       })























//api call, then update db, when update other table










  module.exports = router;