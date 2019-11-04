const path = require('path')
const express = require('express')
const hbs = require('hbs')

const summoner = require('./utils/summoner')

const app = express()
const port = process.env.PORT || 8080
