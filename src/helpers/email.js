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

async function sendMail(user, pass, to, subject, body) {
    const transporter = createTransport(user, pass)
    try {
        await transporter.sendMail({
            from: process.env.SUPERADMIN_EMAIL,
            to: to,
            subject: subject,
            text: body,
        });
    } catch (err) {
        console.log(err);
    }
}

async function superAdminSendMail(to, subject, body) {
    sendMail(process.env.SUPERADMIN_EMAIL, process.env.SUPERADMIN_PASS, to, subject, body);
}

module.exports = { sendMail, superAdminSendMail };
