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


router.get('/', (req,res) =>{
    res.render("profile")
})






router.post('/', (req,res) => {
    let currentUser = req.body.username
    db.user.findAll({
        where: {
            username: currentUser
        }
    }).then((response) => {
        let username = response[0].dataValues.username
    })

    res.render('index')
})

router.get('/', (req,res) => {
    res.render('index')
})

















module.exports = router;