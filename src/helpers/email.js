"use strict";

// This module provides the abilty to send emails
// using gmail service and nodemailer.
// The sender must have two step verification enabled
// and use the application password provided by google

const nodemailer = require("nodemailer");

function createTransport(user, pass) {
    return nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: { user, pass },
    });
}

/**
 * 
 * @param {string} user 
 * @param {string} pass 
 * @param {{from?: string, to?: string, subject?: string, body?: string, html?: string}} options 
 */
async function sendMail(user, pass, options) {
    const transporter = createTransport(user, pass)
    try {
        await transporter.sendMail(options);
    } catch (err) {
        console.log(err);
    }
}

/**
 * 
 * @param {{from?: string, to?: string, subject?: string, body?: string, html?: string}} options 
 */
async function superAdminSendMail(options) {
    sendMail(process.env.SUPERADMIN_EMAIL, process.env.SUPERADMIN_PASS, options);
}

module.exports = { sendMail, superAdminSendMail };
