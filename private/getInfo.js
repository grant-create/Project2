const db = require("../models")
//Alpaca stuff: 
var yahooFinance = require('yahoo-finance');
const alpApiKey = process.env.APCA_API_KEY_ID
const alpSecretKey = process.env.APCA_API_SECRET_KEY
const moment = require("moment");
const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca({keyId:alpApiKey, secretKey:alpSecretKey, paper: true, usePolygon: false})





//  TAKING APART THE FUNCTIONS :

 

  // ROLLING AVG

  async function getRollingAvg(stock){
    if(stock == "" || typeof(stock) == 'integer'|| stock.length>5){
        //pass
    }else{

        
        // https://alpaca.markets/docs/api-documentation/how-to/market-data/
        let bars = alpaca.getBarsV2(
            stock,
            {
                start: moment().subtract(28, "days").format(),
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
            avg = Number((avg).toFixed(3))
            return avg
        }
        }
        
        
        // //endpoint
        // https://paper-api.alpaca.markets
        //Get a quote using URL
        //https://data.alpaca.markets/v1/last/stocks/GOOG
        
        
        
//  LAST CLOSE  


//      To get Last Close
async function getLastClose(stock){

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
        lastClose = barsetY[barsetY.length - 1].ClosePrice
        return lastClose
}
        
        
        
async function getTodaysDate(){

    
    // To get the date:
    
    var d = new Date();
    let todayDate = (d.toLocaleString())
    return todayDate   
}




// 20 DAY BREAKOUT

async function getTwentyBreakout(stock){
    if(stock == "" || typeof(stock) == 'integer'|| stock.length>5){
        //pass
    }else{

        
        // https://alpaca.markets/docs/api-documentation/how-to/market-data/
        let bars = alpaca.getBarsV2(
            stock,
            {
                start: moment().subtract(28, "days").format(),
                end: moment().subtract(1, "days").format(),
                timeframe: "1Day",
            },
            alpaca.configuration
            );
            // console.log(JSON.stringify(bars))
            const barset = []
            let tDayBreakout =false
            for await (let b of bars) {
                barset.push(b.ClosePrice);   
            } 
            // console.log(barset.length)

            lastClose = barset[barset.length - 1]
            if(lastClose>= Math.max(...barset)){
                tDayBreakout = true
            }
            
            return tDayBreakout
        }
        }



        // 70 Day Breakout

async function getSeventyBreakout(stock){
    if(stock == "" || typeof(stock) == 'integer'|| stock.length>5){
        //pass
    }else{

        
        // https://alpaca.markets/docs/api-documentation/how-to/market-data/
        let bars = alpaca.getBarsV2(
            stock,
            {
                start: moment().subtract(70, "days").format(),
                end: moment().subtract(1, "days").format(),
                timeframe: "1Day",
            },
            alpaca.configuration
            );
            // console.log(JSON.stringify(bars))
            const barset = []
            let sDayBreakout =false
            for await (let b of bars) {
                barset.push(b.ClosePrice);   
            } 
            
            lastClose = barset[barset.length - 1]
            if(lastClose>= Math.max(...barset)){
                sDayBreakout = true
            }
            
            return sDayBreakout
        }
        }





// DETAILS:

async function getDetails(stock){
  

        
        // https://alpaca.markets/docs/api-documentation/how-to/market-data/
        let bars = alpaca.getBarsV2(
            stock,
            {
                start: moment().subtract(70, "days").format(),
                end: moment().subtract(1, "days").format(),
                timeframe: "1Day",
            },
            alpaca.configuration
            );
            // console.log(JSON.stringify(bars))
            const barset = []
            let tDayBreakout =false
            for await (let b of bars) {
                barset.push(b);   
            } 
            return barset
        }
        












// 4 day









// 8 day










module.exports= {getRollingAvg, getLastClose, getTwentyBreakout, getSeventyBreakout, getDetails}
