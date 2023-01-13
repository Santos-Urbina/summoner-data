const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');

//Script to get data from api
const summoner = require('./utils/summoner');

const app = express();
const port = process.env.PORT || 8080;

//Define paths express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars as view engine, set views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

//Render views
app.get('', (req, res) => {
    res.render('index', {
        title: 'Summoner Data'
    });
});

app.get('/summoner', (req, res) => {
    const summonerName = req.query.name;

    if(!summonerName) {
        return res.send({
            //TODO: display this as an error message on the page
            error: 'You must provide a summoner name.'
        });
    }

    //Runs only if we are provided a name
    summoner(summonerName, (error, { name, level, iconID } = {}) => {
        if(error) {
            return res.send({ error });
        }

        res.send({
            name,
            level,
            iconID
        });

        console.log(`${name}, ${level}, ${iconID}`);
    });
});

app.listen(port, () => {
    console.log(chalk.black.bgCyan.bold(`Server is up on port ${port}`));
});