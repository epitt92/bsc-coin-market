const express = require('express')
const app = express()
const cors = require('cors');
const port = 3001
const axios = require('axios');
const bodyParser = require('body-parser');

// const proxy = require('http-proxy-middleware'); 

// let options = {
//     target: baseApiUrl, //api.example.com 
//     changeOrigin: true,
//     logLevel: 'debug',
//     onError: function onError(err, req, res) {
//         console.log('Something went wrong with the proxy middleware.', err)
//         res.end();
//     }
// };

// app.use('/getTokens', proxy(options)); //only forward calls with '/api' route

app.use(cors({ origin: "*" }));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/getTokens', (req, res) => {
    console.log(req.body.flag)
    let API
    if (req.body.flag == 0) {
        // API = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
        // API = "https://bch.getblock.io/mainnet/";
        // API = "https://api.covalenthq.com/v1/56";
        // API = 'https://bsc.getblock.io/mainnet'
        // API = "https://api.covalenthq.com/v1/56/address/demo.bnb/balances_v2/?key=ckey_docs"
        API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=binance-smart-chain&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h"
    } else if (req.body.flag == 1) {
        API = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/trending/gainers-losers";
    } else {
        API = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    }

    axios.get(API, {
            headers: {
                'Accepts': 'application/json',
                // 'X-CMC_PRO_API_KEY': 'f5d2b9df-18b2-479a-8972-181d2b8395c7',
                // 'x-api-key': '614b68aa-f61d-4170-ab6f-397f4b3f50c8',
            }
        })
        .then(response => {
            // console.log('res:'+response.data)
            res.json(response.data)
        }).catch(err => {
            console.log(err)
            res.send('error')
        })
})

app.get('/getNewTokens', (req, res) => {
    let API
    API = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    axios.get(API, {
            headers: {
                'Accepts': 'application/json',
                'X-CMC_PRO_API_KEY': 'f5d2b9df-18b2-479a-8972-181d2b8395c7',
            }
        })
        .then(response => {
            res.json(response.data)
        }).catch(err => {
            console.log(err)
            res.send('error')
        })
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))