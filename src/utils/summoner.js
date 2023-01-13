const request  = require('request');
const chalk = require('chalk');

const config = require('../../config.json');
const api_key = config.key;

const summoner = (summonerName, callback) => {
    const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
    console.log(chalk.green('Endpoint: ') + url);

    //Object for setting http request headers/options
    const options = {
        url,
        json: true,
        headers: {
            "X-Riot-Token": api_key
        }
    }

    request(options, (error, { body }) => {
        if (error) {
            console.log(chalk.red('Error connecting to API'));
            callback('Unable to connect to API');
        } else if (body.status) {
            //If we get an error code from the api
            if (body.status.status_code === 401) {
                console.log(chalk.red('Unauthorized. Check API key.'));
                callback('Unauthorized. Check API key');
            } else if (body.status.status_code === 404) {
                console.log(chalk.red('Unable to find summoner'));
                callback('Unable to find summoner. Try another search.');
            } else if (body.status.status_code === 403) {
                console.log(chalk.red('Error connecting to API. API key may have expired.'));
                callback('API key has expired.');
            }
        } else {
            console.log(chalk.green(`Found summoner ${summonerName}`));

            callback(undefined, {
                name: body.name,
                level: body.summonerLevel,
                iconID: body.profileIconId
            });
        }
    });
}

module.exports = summoner;