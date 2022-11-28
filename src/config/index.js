const { parsed } = require('dotenv').config()
const bcrypt = require('bcrypt')

module.exports = {
    mongoUrl:                parsed.MONGO_URL,
    incomingPort:            parsed.API_INCOMING_PORT,
    confirmationTokenSecret: parsed.CONFIRMATION_TOKEN_SECRET, 
    tokenSecret:             parsed.TOKEN_SECRET,
    refreshTokenSecret:      parsed.REFRESH_TOKEN_SECRET,
    tokenExpTime:            String(parsed.TOKEN_EXP_TIME),
    refreshTokenExpTime:     String(parsed.REFRESH_TOKEN_EXP_TIME),
    bcryptSalt:              Number(parsed.BCRYPT_SALT),
    superAdminEmail:         parsed.SUPERADMIN_EMAIL,
    superAdminPass:          bcrypt.hashSync(parsed.SUPERADMIN_PASS, bcrypt.genSaltSync(Number(parsed.BCRYPT_SALT)))
}