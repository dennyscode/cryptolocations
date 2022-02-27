// these routes are meant to get:
// 1. the email authorization token and
// 2. the resend token (in case 1 has expired)

const express = require('express')
const router = express.Router()

app.post('/confirmation', userController.confirmationPost);
app.post('/resend', userController.resendTokenPost);