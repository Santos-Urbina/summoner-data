const request  = require('request');
const chalk = require('chalk');

//TODO: refactor so we don't share the api key! And use the key as a header param NOT a query param!
const api_key = '';

const summoner = (summonerName, callback) => {
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${api_key}`;
    console.log(chalk.green('Endpoint: ') + url);

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            console.log(chalk.red('Error connecting to API'));
            callback('Unable to connect to API');
        } else if (body.status) {
            //If we get an error code from the api
            if (body.status.status_code === 404) {
                console.log(chalk.red('Error connecting to API'));
                callback('Unable to find summoner. Try another search.');
            } else if (body.status.status_code === 403) {
                console.log(chalk.red('Error connecting to API'));
                callback('API key has expired.');
            }
        } else {
            callback(undefined, {
                name: body.name,
                level: body.summonerLevel
            });

            console.log(chalk.green(`Found summoner ${summonerName}`));
        }
    });
}

module.exports = summoner;