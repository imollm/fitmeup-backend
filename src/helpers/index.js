'use strict'

const bcrypt = require('bcrypt')
const config = require('../config')

async function encryptPass(plainPassword) {
    const salt = await bcrypt.genSalt(config.bcryptSalt);
    const passwordEncrypted = await bcrypt.hash(plainPassword, salt);

    return passwordEncrypted
}

module.exports = {
    encryptPass,
}