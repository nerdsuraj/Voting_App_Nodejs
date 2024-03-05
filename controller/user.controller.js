const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
const baseModel = require("../models/base.model");
const userModel = require("../models/user.model");
dotenv.config();
const db = require('../utillitis/dbquries');

let userController = {};


userController.register = async (req, res) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));

        // Check if there is already an admin user
        const adminUser = await userModel.findOne({ role: 'admin' });
        if (reqBody.role === 'admin' && adminUser) {
            return res.status(400).json({ error: 'Admin user already exists' });
        }

        // Validate Aadhar Card Number must have exactly 12 digit
        if (!/^\d{12}$/.test(reqBody.aadharCardNumber)) {
            return res.status(400).json({ error: 'Aadhar Card Number must be exactly 12 digits' });
        }

        // Check if a user with the same Aadhar Card Number already exists
        const existingUser = await userModel.findOne({ aadharCardNumber: reqBody.aadharCardNumber });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same Aadhar Card Number already exists' });
        }

        let createUser = await userModel.create(reqBody);
        if (createUser) {
            return res.status(200).json({ message: "User Registered Successfully", data: createUser});
        }

    } catch (error) {
        console.log(error);
    }
};

userController.login = async (req, res) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));

        if (!reqBody.aadharCardNumber || !reqBody.password) {
            return res.status(400).json({ error: 'Aadhar Card Number and password are required' });
        }

        const user = await userModel.findOne({ aadharCardNumber: reqBody.aadharCardNumber });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        } else {
            let checkPassword = user.comparePassword(reqBody.password);
            if (!checkPassword) {
                return res.status(400).json({ error: 'Invalid password' });
            } else {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SCECRET_KEY, { expiresIn: '7d' });
                return res.status(200).json({ status: 'success', data: token });
            }
        }

    } catch (error) {
        console.log(error);
    }
};

userController.fecthUser = async (req, res) => {
    try {
        let reqBody = JSON.parse(JSON.stringify(req.body));
        console.log("🚀 ~ reqBody:", reqBody)
        let userData = await db.findByQuery(baseModel.userdb, {});
        if (userData) {
            return res.status(200).json({ status: "success", data: userData });
        }
    } catch (error) {
        console.log(error);
    }
};




module.exports = userController;