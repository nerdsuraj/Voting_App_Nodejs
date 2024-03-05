const mongoose = require('mongoose');

const userdb = require('../models/user.model');
const Candidate = require('../models/candidate.model');



module.exports = {
    userdb,
    Candidate
}