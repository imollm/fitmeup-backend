'use strict'

const bcrypt = require('bcrypt')
const env = process.env.NODE_ENV
let envVars

if (env === 'prod' || env === 'stg') {
    envVars = {
        mongoUrl:               process.env.MONGO_URL,
        incomingPort:           process.env.PORT,
        tokenSecret:            process.env.TOKEN_SECRET,
        refreshTokenSecret:     process.env.REFRESH_TOKEN_SECRET,
        tokenExpTime:           String(process.env.TOKEN_EXP_TIME),
        refreshTokenExpTime:    String(process.env.REFRESH_TOKEN_EXP_TIME),
        bcryptSalt:             Number(process.env.BCRYPT_SALT),
        superAdminEmail:        process.env.SUPERADMIN_EMAIL,
        superAdminPass:         bcrypt.hashSync(process.env.SUPERADMIN_PASS, bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT))),
        limitBody:              process.env.API_LIMIT_CONTENT_LENGTH,
        confirmationTokenSecret: process.env.CONFIRMATION_TOKEN_SECRET,
    }
} else {
    const { parsed } = require('dotenv').config()
    envVars = {
        mongoUrl:               parsed.MONGO_URL,
        incomingPort:           parsed.API_INCOMING_PORT,
        tokenSecret:            parsed.TOKEN_SECRET,
        refreshTokenSecret:     parsed.REFRESH_TOKEN_SECRET,
        tokenExpTime:           String(parsed.TOKEN_EXP_TIME),
        refreshTokenExpTime:    String(parsed.REFRESH_TOKEN_EXP_TIME),
        bcryptSalt:             Number(parsed.BCRYPT_SALT),
        superAdminEmail:        parsed.SUPERADMIN_EMAIL,
        superAdminPass:         bcrypt.hashSync(parsed.SUPERADMIN_PASS, bcrypt.genSaltSync(Number(parsed.BCRYPT_SALT))),
        limitBody:              parsed.API_LIMIT_CONTENT_LENGTH,
        confirmationTokenSecret: parsed.CONFIRMATION_TOKEN_SECRET
    }
}

module.exports = envVars
