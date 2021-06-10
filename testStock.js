const db = require("./models")
//Alpaca stuff: 
var yahooFinance = require('yahoo-finance');
const alpApiKey = process.env.APCA_API_KEY_ID
const alpSecretKey = process.env.APCA_API_SECRET_KEY
const moment = require("moment");
const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca({keyId:alpApiKey, secretKey:alpSecretKey, paper: true, usePolygon: false})

 

 listOfStocks = ['SPY', 'QQQ', 'DIA', 'AAPL', 'MMM', 'ABT',
  'ABBV', 'ABMD', 'ACN', 'ATVI', 'ADBE', 'AMD', 'AAP', 'AES',
   'AFL', 'A', 'APD', 'AKAM', 'ALK', 'ALB', 'ARE', 'ALXN',
    'ALGN', 'ALLE', 'LNT', 'ALL', 'GOOGL', 'GOOG', 'MO',
     'AMZN', 'AMCR', 'AEE', 'AAL', 'AEP', 'AXP', 'AIG',
      'AMT', 'AWK', 'AMP', 'ABC', 'AME', 'AMGN', 'APH',
       'ADI', 'ANSS', 'ANTM', 'AON', 'AOS', 'APA', 'AAPL',
        'AMAT', 'APTV', 'ADM', 'ANET', 'AJG', 'AIZ',
         'T', 'ATO', 'ADSK', 'ADP', 'AZO', 'AVB',
          'AVY', 'BKR', 'BLL', 'BAC', 'BK', 'BAX',
           'BDX', 'BRK.B', 'BBY', 'BIO', 'BIIB',
            'BLK', 'BA', 'BKNG', 'BWA', 'BXP', 'BSX',
             'BMY', 'AVGO', 'BR', 'BF.B', 'CHRW', 'COG',
              'CDNS', 'CZR', 'CPB', 'COF', 'CAH', 'KMX',
               'CCL', 'CARR', 'CTLT', 'CAT', 'CBOE',
                'CBRE', 'CDW', 'CE', 'CNC', 'CNP',
                 'CERN', 'CF', 'CRL', 'SCHW', 'CHTR',
                  'CVX', 'CMG', 'CB', 'CHD', 'CI', 'CINF',
                   'CTAS', 'CSCO', 'C', 'CFG', 'CTXS',
                    'CLX', 'CME', 'CMS', 'KO', 'CTSH',
                     'CL', 'CMCSA', 'CMA', 'CAG',
                      'COP', 'ED', 'STZ', 'COO', 'CPRT',
                       'GLW', 'CTVA', 'COST', 'CCI', 'CSX', 'CMI',
                        'CVS', 'DHI', 'DHR', 'DRI', 'DVA', 'DE', 'DAL',
                         'XRAY', 'DVN', 'DXCM', 'FANG', 'DLR', 'DFS', 'DISCA', 'DISCK', 'DISH', 'DG',
                          'DLTR', 'D', 'DPZ', 'DOV', 'DOW', 'DTE', 'DUK', 'DRE', 'DD', 'DXC', 'EMN', 'ETN',
                           'EBAY', 'ECL', 'EIX', 'EW', 'EA', 'EMR', 'ENPH', 'ETR', 'EOG', 'EFX', 'EQIX', 'EQR', 'ESS',
                            'EL', 'ETSY', 'EVRG', 'ES', 'RE', 'EXC', 'EXPE', 'EXPD', 'EXR', 'XOM', 'FFIV', 'FB', 'FAST',
                             'FRT', 'FDX', 'FIS', 'FITB', 'FE', 'FRC', 'FISV', 'FLT', 'FMC', 'F', 'FTNT', 'FTV',
                              'FBHS', 'FOXA', 'FOX', 'BEN', 'FCX', 'GPS', 'GRMN', 'IT', 'GNRC', 'GD', 'GE',
                               'GIS', 'GM', 'GPC', 'GILD', 'GL', 'GPN', 'GS', 'GWW', 'HAL', 'HBI', 'HIG',
                                'HAS', 'HCA', 'PEAK', 'HSIC', 'HSY', 'HES', 'HPE', 'HLT', 'HOLX', 'HD', 'HON',
                                 'HRL', 'HST', 'HWM', 'HPQ', 'HUM', 'HBAN', 'HII', 'IEX', 'IDXX', 'INFO', 'ITW',
                                  'ILMN', 'INCY', 'IR', 'INTC', 'ICE', 'IBM', 'IP', 'IPG', 'IFF', 'INTU',
                                   'ISRG', 'IVZ', 'IPGP', 'IQV', 'IRM', 'JKHY', 'J', 'JBHT', 'SJM', 'JNJ',
                                    'JCI', 'JPM', 'JNPR', 'KSU', 'K', 'KEY', 'KEYS', 'KMB', 'KIM', 'KMI',
                                     'KLAC', 'KHC', 'KR', 'LB', 'LHX', 'LH', 'LRCX', 'LW', 'LVS', 'LEG', 'LDOS',
                                      'LEN', 'LLY', 'LNC', 'LIN', 'LYV', 'LKQ', 'LMT', 'L', 'LOW', 'LUMN', 'LYB',
                                       'MTB', 'MRO', 'MPC', 'MKTX', 'MAR', 'MMC', 'MLM', 'MAS', 'MA', 'MKC', 'MXIM',
                                        'MCD', 'MCK', 'MDT', 'MRK', 'MET', 'MTD', 'MGM', 'MCHP', 'MU', 'MSFT',
                                         'MAA', 'MHK', 'TAP', 'MDLZ', 'MPWR', 'MNST', 'MCO', 'MS', 'MOS', 'MSI',
                                          'MSCI', 'NDAQ', 'NTAP', 'NFLX', 'NWL', 'NEM', 'NWSA', 'NWS', 'NEE',
                                           'NLSN', 'NKE', 'NI', 'NSC', 'NTRS', 'NOC', 'NLOK', 'NCLH', 'NOV',
                                            'NRG', 'NUE', 'NVDA', 'NVR', 'NXPI', 'ORLY', 'OXY', 'ODFL', 'OMC',
                                             'OKE', 'ORCL', 'OGN', 'OTIS', 'PCAR', 'PKG', 'PH', 'PAYX', 'PAYC',
                                              'PYPL', 'PENN', 'PNR', 'PBCT', 'PEP', 'PKI', 'PRGO', 'PFE', 'PM',
                                               'PSX', 'PNW', 'PXD', 'PNC', 'POOL', 'PPG', 'PPL', 'PFG', 'PG',
                                                'PGR', 'PLD', 'PRU', 'PTC', 'PEG', 'PSA', 'PHM', 'PVH', 'QRVO',
                                                 'PWR', 'QCOM', 'DGX', 'RL', 'RJF', 'RTX', 'O', 'REG', 'REGN',
                                                  'RF', 'RSG', 'RMD', 'RHI', 'ROK', 'ROL', 'ROP', 'ROST', 'RCL',
                                                   'SPGI', 'CRM', 'SBAC', 'SLB', 'STX', 'SEE', 'SRE', 'NOW', 'SHW',
                                                    'SPG', 'SWKS', 'SNA', 'SO', 'LUV', 'SWK', 'SBUX', 'STT', 'STE',
                                                     'SYK', 'SIVB', 'SYF', 'SNPS', 'SYY', 'TMUS', 'TROW', 'TTWO',
                                                      'TPR', 'TGT', 'TEL', 'TDY', 'TFX', 'TER', 'TSLA', 'TXN',
                                                       'TXT', 'TMO', 'TJX', 'TSCO', 'TT', 'TDG', 'TRV', 'TRMB', 'TFC', 'TWTR', 'TYL', 'TSN', 'UDR', 'ULTA', 'USB', 'UAA', 'UA', 'UNP', 'UAL', 'UNH', 'UPS', 'URI', 'UHS', 'UNM', 'VLO', 'VTR', 'VRSN', 'VRSK', 'VZ', 'VRTX', 'VFC', 'VIAC', 'VTRS', 'V', 'VNO', 'VMC', 'WRB', 'WAB', 'WMT', 'WBA', 'DIS', 'WM', 'WAT', 'WEC', 'WFC', 'WELL', 'WST', 'WDC', 'WU', 'WRK', 'WY', 'WHR', 'WMB', 'WLTW', 'WYNN', 'XEL', 'XLNX', 'XYL', 'YUM', 'ZBRA', 'ZBH', 'ZION', 'ZTS']
async function getInfo(){

    let i = 0
    for(stock of listOfStocks){
    i++
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
               
            //    console.log(stock, avg, lastClose, todayDate)
               
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
