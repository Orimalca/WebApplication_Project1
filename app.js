const express = require('express');
const path = require('path')
// const ads = require()



const app = express()
app.use(express.static(__dirname+"/static/"));


app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "./templates/index.html"));
    // res.render(__dirname + "/templates/index.html");
    // res.end()
});


const screens_numbers = [1,2,3,4,5,6,7];
screens_numbers.forEach((endPoint) => {
    app.get('/screen='+endPoint, (req, res) => {
        // ads ---> ads_new

        // res.render('/screen='+endPoint);
        res.sendFile(__dirname + "/templates/index.html")
    });
});


app.listen(8080);




