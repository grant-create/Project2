const db = require("./models")
//Alpaca stuff: 
var yahooFinance = require('yahoo-finance');
const alpApiKey = process.env.APCA_API_KEY_ID
const alpSecretKey = process.env.APCA_API_SECRET_KEY
const moment = require("moment");
const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca({keyId:alpApiKey, secretKey:alpSecretKey, paper: true, usePolygon: false})



 listOfStocks = ['SPY', 'QQQ', 'DIA', 'AAPL', 'MMM', 'ABT', 'ABBV', 'AES', 'ALK',
 'ALLE', 'ALL',
 'AOS', 'AJG', 'T', 'ADSK', 'AVY', 'BLL', 'BAC',
 'BK', 'BR', 'CPB', 'KMX', 'CAT',
 'CDW', 
 'CLX', 'CME', 'CMS', 'CL', 'CMCSA', 'CMA', 'CAG',
  'GLW',
 'TER', 'TJX', 'TSCO', 'TT', 'TRV', 'TFC', 'TSN',
 'USB', 'UAA', 
 'VZ', 'VFC', 'VTRS', 'VMC', 'WRB', 'WMT', 'WBA', 'WM',
 'WEC', 'WFC', 'WRK', 'YUM', 'ZBH', 'ZION']


 async function getInfo(){


    for(stock of listOfStocks){
    
        // https://alpaca.markets/docs/api-documentation/how-to/market-data/
        let bars = alpaca.getBarsV2(
            stock,
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
        // console.log(barset.length)
        // console.log(barset[0].ClosePrice, "86")
       avg = avg/barset.length
        
    //    console.log(avg);
       

// //endpoint
// https://paper-api.alpaca.markets
//Get a quote using URL
//https://data.alpaca.markets/v1/last/stocks/GOOG






//      To get Last Close


        let lastClose = 0
        let barsY = alpaca.getBarsV2(
            stock,
            {
            start: moment().subtract(4, "days").format(),
            end: moment().subtract(20, "minutes").format(),
            timeframe: "1Day",
            },
            alpaca.configuration
        );
        // console.log(JSON.stringify(bars))
        const barsetY = []
        
        for await (let b of barsY) {
            barsetY.push(b);
            
            
        } 
        // console.log(barsetY)
        lastClose = barsetY[barsetY.length - 1].ClosePrice
        
       


        // To get the date:
       
        var d = new Date();
        let todayDate = (d.toLocaleString())
       



        //Creating the base stocks
       
       db.stocks.create({
           
               ticker: stock,
               rollingAvg: avg,
               lastClose: lastClose,
               date: todayDate
           }).then(stocks => {
                   console.log('Created: ', stocks.ticker, stocks.rollingAvg, stocks.lastClose, stocks.date)
               })
               
               console.log(stock, avg, lastClose, todayDate)
               
    }
}
getInfo()





// // CLEAR the table:

// db.stocks.destroy({
//     where: {},
//     truncate: true
//   })


// // Going back 21 days
// var d = new Date();
// console.log(d.toLocaleString())
// console.log(d)
//  console.log(d.setDate(d.getDate()-21))
