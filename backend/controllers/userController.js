const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const MailToken = require('../models/mailTokenSchema')
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// @desc    Create user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, website} = req.body

    if(!name || !email || !password || !website) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(regex.test(req.body.email) === false) {
        throw new Error('Please enter a valid email address')
    }

    if(req.body.password.length < 6) {
        throw new Error('Your password must contain more than 6 characters')
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        website,
        password: hashedPassword,
    })

    if(user) {
        // Create a verification token for this user
        // var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

        // Create AuthToken
        const authTokenSalt = generateAuthToken(user._id);
        // Save the verification token
        const authToken = await MailToken.create({
            user,
            token: authTokenSalt
        })

        // Send the email
        // var transporter = nodemailer.createTransport({ 
        //     host:process.env.SMTP_SERVER,
        //     port: process.env.SMTP_PORT,
        //     secure: process.env.SMTP_SECURE,
        //     auth: { 
        //         user: process.env.SMTP_LOGIN, 
        //         pass: process.env.SMTP_PASSWORD 
        //     } 
        // });
        // var mailOptions = { from: process.env.SMTP_LOGIN, to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + generateToken(user._id) + '.\n' };
        // transporter.sendMail(mailOptions, function (err) {
        //     if (err) { 
        //         return res.status(500).send({ msg: 'transporter message ###' + err.message }); 
        //     }
        //     res.status(200).send('A verification email has been sent to ' + user.email + '.');
        // });

        console.log("generateToken Again:", generateToken(user._id));
        res.status(201).json({
            _id: user.id,
            name: user.name,
            website: user.website,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(regex.test(req.body.email) === false) {
        throw new Error('Please enter a valid email address')
    }

    // Check for user email
    const user = await User.findOne({email})

    // Check for user password
    if(user && (await bcrypt.compare(password, user.password))) {

        // Make sure the user has been verified
        // WIP ACTIVATE FOR AUTHORIZATION !!!
        // if (!user.isVerified) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' }); 

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


// @desc    Get a user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// @desc    Get a user data
// @route   GET /api/users/me
// @access  Private
const getAll = asyncHandler(async (req, res) => {
    console.log("getAll")
    res.status(200).json({message: "getAll Func WIP"
    })
})

// @desc    Confirm Token after E-Mail Verification
// @route   POST /api/users/confirmation
// @access  Private
const confirmationPost = asyncHandler(async (req,res) => {
    console.log("confirmationPost")
    console.log("token", req.query.auth);
    const authToken =  req.query.auth;

    // Check for validation errors
    // if (errors) return res.status(400).send(errors);

    const {email, token} = req.body
    console.log(`email: ${email}, token: ${token}`)

    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if(regex.test(req.body.email) === false) {
        throw new Error('Please enter a valid email address')
    }

    // Check for user email
    // Find a matching token

    async function myFetch() {
        let token = await MailToken.findOne({authToken})
        if(token) { 
            console.log("TOKEN:", token.token)
        } else {
            console.log("No token found")
        }
      }
      
      await myFetch()
        .catch(e => {
          console.log('There has been a problem with your fetch operation: ' + e.message);
        })

        let blap = await User.findOne({email: email})
        if (!blap) {
            throw new Error('Please register first')
        }

        let delToken = await MailToken.deleteOne({authToken})
        console.log("delToken", delToken)
        // .then(blob => {
        //     User.findOne({ email: email }, function (err, user) {
        //         console.log("User findOne")
        //         if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
        //         if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
    
        //         // Verify and save the user
        //         console.log("Pre verified")
    
        //         user.isVerified = true;
        //         console.log(" User.save")
        //         user.save(function (err) {
        //             if (err) { return res.status(500).send({ msg: "// err in confirmationPost " + err.message }); }
        //             console.log("User.save")
        //             res.status(200).send("The account has been verified. Please log in.");
        //         });
        //     });
        // })


    res.status(200).json({
        message: "All working: confirmationPost"
    })
})

const resendTokenPost = asyncHandler(async (req,res) => {
    console.log("resendTokenPost")

    res.status(200).json({
        message: "All working: resendTokenPost"
    })
})



// Generate JWT
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
    )
}

// Generate JWT
const generateAuthToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_AUTH_SECRET,
        {expiresIn: '1d'}
    )
}

module.exports = {
    registerUser,
    loginUser,
    getAll,
    getMe,
    confirmationPost,
    resendTokenPost

}
