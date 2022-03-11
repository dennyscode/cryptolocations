const asyncHandler = require('express-async-handler')

const Cryptoshop = require('../models/cryptoshopModel')
const User = require('../models/userModel')

// @desc    Get cryptoshops
// @route   GET /api/cryptoshops
// @access  Private

const getCryptoshops = asyncHandler(async (req,res) => {
    const cryptoshops = await Cryptoshop.find({}) // ({ user: req.user.id })

    res.status(200).json(cryptoshops)
})

// @desc    Get my cryptoshops
// @route   GET /api/cryptoshops
// @access  Private

const getMyCryptoshops = asyncHandler(async (req,res) => {
    const cryptoshops = await Cryptoshop.find({ user: req.user.id }) // ({ user: req.user.id })

    res.status(200).json(cryptoshops)
})

// @desc    Set cryptoshop
// @route   POST /api/cryptoshops/:id
// @access  Private

const setCryptoshop = asyncHandler(async (req,res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field') // Instead of: res.status(400).json({message: 'Please add a text field'})
    }
    // if(!req.body.shop) {
    //     res.status(400)
    //     throw new Error('Please add a shop') // Instead of: res.status(400).json({message: 'Please add a text field'})
    // }
    console.log(req.body.text)
    const cryptoshop = await Cryptoshop.create({
        user: req.user.id,
        text: req.body.text
    })

    res.status(200).json(cryptoshop)
})

// @desc    Update cryptoshop
// @route   PUT /api/cryptoshops/:id
// @access  Private

const updateCryptoshop = asyncHandler(async (req, res) => {
    const cryptoshop = await Cryptoshop.findById(req.params.id)
    if(!cryptoshop) {
        res.status(400)
        throw new Error('Cryptoshop not found'
        )
    }

    // check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the login user matches the cryptoshop user
    if(cryptoshop.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedCryptoshop = await Cryptoshop.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}
    )
    res.status(200).json(updatedCryptoshop)
})

// @desc    Delete cryptoshop
// @route   DELETE /api/cryptoshops/:id
// @access  Private

const deleteCryptoshop = asyncHandler(async (req,res) => {
    const cryptoshop = await Cryptoshop.findById(req.params.id)

    if(!cryptoshop) {
        res.status(400)
        throw new Error('Cryptoshop not found'
        )
    }


    // check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the login user matches the cryptoshop user
    if(cryptoshop.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await cryptoshop.remove()
    res.status(200).json({id: req.params.id})})

module.exports = {
    getMyCryptoshops,
    getCryptoshops,
    setCryptoshop,
    updateCryptoshop,
    deleteCryptoshop,
}