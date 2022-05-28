const http    = require('http');
const port    = 8080;
const express = require('express');
const app     = express();
const fs      = require('fs');
const server  = http.createServer(app).listen(port);
const adsPath = 'ads.json';

app.use(express.static(__dirname+"/static/js"));
app.use(express.static(__dirname+"/static/templates"));
app.use(express.static(__dirname+"/static/assets"));

let allAds = fs.readFileSync(adsPath);
let Ads    = JSON.parse(allAds);
let screen_number;

app.get('/',(req, res) => {
    screen_number = 0;
    res.sendFile(__dirname + "/templates/index.html");
    app.get('/ads',(req, res) => {
        res.json(Ads);
    });
});

app.get('/temp_:template', (req, res) => {
    let temp_type = req.params['template'];
    res.sendFile(__dirname + '/templates/temp_'+temp_type+'.html');
});

app.get('/screen=:number',(req,res) => {
    screen_number = req.params['number'];
    if(screen_number.indexOf('ads') !== -1){
        screen_number = parseInt(screen_number.replace('ads',''));
        let ads = [];
        for (let i = 0; i < Ads.length; i++) {
            if (Ads[i].screens.includes(screen_number)) {
                ads[ads.length] =Ads[i];
            }
        }
        res.json(ads);
    } else {
        res.sendFile(__dirname + "/templates/index.html");
    }
});