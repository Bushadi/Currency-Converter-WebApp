const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle ware
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies", async(req, res)=>{
    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=501bd23c53854650815acfb4894ff741";
    try {
        const namesResponce = await axios.get(nameURL);
        const nameData = namesResponce.data;
        return res.json(nameData);
    } catch (err) {
        console.error(err);
    }
});

//get the target amount
app.get("/convert", async(req,res)=>{
    const{date,sourceCurrency,targetCurency,amountInSourceCurrency}=req.query;
    try {
        const dataURL=`https://openexchangerates.org/api/historical/${date}.json?app_id=501bd23c53854650815acfb4894ff741`;
        const dataResponce = await axios.get(dataURL);
        const rates = dataResponce.data.rates;

        //rates
        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurency];

        //final target val
        const targetAmount = (targetRate/sourceRate)*amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2));

        } catch (error) {
        console.error(error);    
    }
})

//listen to a port
app.listen(5000,()=>{
    console.log('server started');
    
})
