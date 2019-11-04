const path = require('path')
const express = require('express')
const hbs = require('hbs')

const summoner = require('./utils/summoner')

const app = express()
const port = process.env.PORT || 8080

//Define paths express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars as view engine, set views location
app.set('view enginge', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))

//Render views
app.get('', (req, res) => {
    res.render('index', {
        title: 'Summoner Data',
        name: 'Alex Santos'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})