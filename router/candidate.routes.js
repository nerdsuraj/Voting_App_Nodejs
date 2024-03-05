const express = require('express');
const router = express.Router();
const helper = require('../utillitis/helper');
const candidateController = require('../controller/candidate.controller');

router.post('/add_candidate',helper.CheckToken, candidateController.addCandidate);
router.get('/get_all_candidates',helper.CheckToken, candidateController.getAllCandidates);
router.post('/vote/:candidateID',helper.CheckToken, candidateController.VoteForCandidate);
router.get('/vote/count',helper.CheckToken, candidateController.CountVotes);

module.exports = router;