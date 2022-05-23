const http = require('http')
const port = 3000
const express = require('express')
const app = express()
const fs = require('fs')
const server = http.createServer(app).listen(port)

app.use(express.static(__dirname+"/static/js"));
app.use(express.static(__dirname+"/static/templates"));
app.use(express.static(__dirname+"/static/assets"));

let allAds = fs.readFileSync('ads.json')
let Ads = JSON.parse(allAds)

app.get('/',(req, res) => {
    res.sendFile(__dirname + "/templates/index.html");
})
app.get('/ads',(req, res) => {
    res.cookie('cookies',{samesite:'none'})
    res.json(Ads);
})

const temp_type = ['A','B','C'];

temp_type.forEach((endPoint) => {
    app.get('/temp_'+endPoint, (req, res) => {
        res.sendFile(__dirname + '/templates/temp_'+endPoint+'.html')
    });
});

const screens_numbers = [1,2,3];

screens_numbers.forEach((endPoint) => {
    app.get('/screen=' + endPoint, (req, res) => {
        res.sendFile(__dirname + "/templates/index.html");
    });
    app.get('/screen=' + endPoint+ 'ads', (req, res) => {
        let ads = [];
        for (let i = 0; i < Ads.length; i++) {
            if (Ads[i].screens.includes(endPoint)) {
                ads[ads.length] =Ads[i];
            }
        }
        res.json(ads);
    });
});