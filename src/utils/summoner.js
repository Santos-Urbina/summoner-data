const request  = require('request')

const api_key = 'RGAPI-4fba817b-d752-49eb-9bb5-6301554c6971'

const summoner = (summonerName, callback) => {
    const url = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName + '?api_key=' + api_key

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to API')
        } else if (body.status.status_code === 404) {
            callback('Unable to find summoner. Try another search.')
        } else if (body.status.status_code === 403) {
            callback('API key has expired.')
        } else {
            callback(undefined, {
                id: body.id
            })
        }
    })
}