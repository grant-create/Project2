# Project2

For project 2 I am thinking of making a stock analysis website. This site will take in all the stocks you wish to enter, or if you just want a bunch in a certain price range it will take in those instead. Then by default it will find the 20 day rolling average for the stock and report back if it is above the rolling average or below it.
I found an AlphaVantage API that will work for this. I'm not sure if there is a request limit. but all i should need are the past 20-21 days per stock.
 
 I think I will need help determining what the models will be. Maybe a base list of S&P500, and one for user picks?
 The main table will only show the stock if they are below their rolling average.
 
 ![image](https://user-images.githubusercontent.com/63885329/121231718-97340700-c845-11eb-8761-854faba5f802.png)

I imagine that I will have trouble with the routes, as that's something I'm still having trouble with in general. Most of the code for processing the data I have already made in a python file, but I'll have to convert it to JS (it's not very complicated though)

MVP: program that shows the rolling average for stocks that are below user input price.
 
 
Stretch goals:
-Styling, 
-Having a stock list show,
-A loading bar for getting the table,
-Creating a custom list of stocks other than just ones below a certain price.
-Other parameters than rolling average (though i'm not sure what)



##Below is what was added to the class Readme (for reference)



 # Project 2 Pitch Guidelines
Project Description and Pitch Guidelines for SEIR SEA P2

---
## Project 2 Goals

In your second project you will create a full stack Express and Postgres app which has:
- *At least x2 models, and utilize and build at least one relationship between the two models.*
- *Sequelize as an ORM to interact with and create your database.*
- *An Express server utilizing EJS/EJS layouts for UI design and styling.*
- *Interaction with and inclusion of at least one API.*

## Project 2 Pitch Guidelines

In designing and building your project, you will start by forking and cloneing this repository, and then editing this README to include the following information: 
1. Name of your app: S&P500 Rolling AVG
2. Tech stack you plan to use: Node, Express, HTML, CSS
3. wireframe:
     ![image](https://user-images.githubusercontent.com/63885329/121231718-97340700-c845-11eb-8761-854faba5f802.png)
     
4. API you plan to use: Alpha Vantage API, and maybe the alpaca API


5. Example of how to call/invoke your API, and a description of what data comes back. 

    We tested this with postman and my API key and it worked:
https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=demo

Here is what is returned:
{
    "Meta Data": {
        "1. Information": "Intraday (5min) open, high, low, close prices and volume",
        "2. Symbol": "IBM",
        "3. Last Refreshed": "2021-06-07 19:35:00",
        "4. Interval": "5min",
        "5. Output Size": "Full size",
        "6. Time Zone": "US/Eastern"
    },
    "Time Series (5min)": {
        "2021-06-07 19:35:00": {
            "1. open": "148.0000",
            "2. high": "148.0000",
            "3. low": "148.0000",
            "4. close": "148.0000",
            "5. volume": "400"

6. MVP goals (x3-5)

    The program takes user input for the max they want to pay per share uses input to run through S&P500 and find all stocks within that range and return only the stocks that are below their 20 day rolling average to a table on the main page.

    
7. Stretch goals (x2-5)
    
    Allow user input for adding/deleting custom stocks
    Kanye West quotes at the bottom
    A loading bar
    Target price/other parameters in the table, maybe bollinger bands?


9. Any potential roadblocks?

    Routes, and getting things to show up and update on the page
    Using models
    Basically most of the stuff from Section 2 I am still not very confident using

## Grant Project2 Desc.

For project 2 I am thinking of making a stock analysis website. This site will take in all the stocks you wish to enter, or if you just want a bunch in a certain price range it will take in those instead. Then by default it will find the 20 day rolling average for the stock and report back if it is above the rolling average or below it.
I found an AlphaVantage API that will work for this. I'm not sure if there is a request limit. but all i should need are the past 20-21 days per stock.
 
 I think I will need help determining what the models will be. Maybe a base list of S&P500, and one for user picks?
 The main table will only show the stock if they are below their rolling average.
 


I imagine that I will have trouble with the routes, as that's something I'm still having trouble with in general. Most of the code for processing the data I have already made in a python file, but I'll have to convert it to JS (it's not very complicated though)

MVP: program that shows the rolling average for stocks that are below user input price.
 
 
Stretch goals:
-Styling, 
-Having a stock list show,
-A loading bar for getting the table,
-Creating a custom list of stocks other than just ones below a certain price.
-Other parameters than rolling average (though i'm not sure what)

 


## How to get started
1. **Fork and clone this repository.**
2. **Edit the text above to include specifics of your project.**
3. **Commit, push, and submit a pull request to this repo with your edited pitch README.**
4. *After you have met with a staff member and your pitch has been approved, suggested next steps:*
      * Write out your routes and create a RESTful routing chart (good example [here](https://gk-hynes.github.io/restful-routes-chart/)).
      * Come up with a breakdown of what you plan to accomplish each day and how you are going to accomplish it.
      * Create a new git repo for your project. 
      * Make all test API calls you need to to ensure your API will be usable for this project. 
      




