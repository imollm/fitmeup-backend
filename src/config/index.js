const { parsed } = require('dotenv').config()

module.exports = {
    mongoUrl:               parsed.MONGO_URL,
    incomingPort:           parsed.API_INCOMING_PORT,
    tokenSecret:            parsed.TOKEN_SECRET,
    refreshTokenSecret:     parsed.REFRESH_TOKEN_SECRET,
    tokenExpTime:           String(parsed.TOKEN_EXP_TIME),
    refreshTokenExpTime:    String(parsed.REFRESH_TOKEN_EXP_TIME),
    bcryptSalt:             Number(parsed.BCRYPT_SALT)
}