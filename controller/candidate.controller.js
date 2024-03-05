const dotenv = require("dotenv");
dotenv.config();
const baseModel = require("../models/base.model");
const helper = require("../utillitis/helper");
const dbquries = require("../utillitis/dbquries");
const mongoose = require("mongoose");


let candidateController = {};

candidateController.addCandidate = async (req, res) => {
    try {
        if (req.decoded.role !== 'admin') {
            return res.status(403).json({ message: 'You are not allowed to add candidate' });
        }
        let reqBody = JSON.parse(JSON.stringify(req.body));

        let createCandidate = await dbquries.createOne(baseModel.Candidate, reqBody);
        if (createCandidate) {
            return res.status(200).json({ message: "Candidate Added Successfully", data: createCandidate });
        }

    } catch (error) {
        console.log(error);
    }
};

candidateController.getAllCandidates = async (req, res) => {
    try {
        if (req.decoded.role !== 'admin') {
            return res.status(403).json({ message: 'You are not allowed to view candidates' });
        }
        let candidates = await dbquries.findByQuery(baseModel.Candidate, {});
        if (candidates) {
            return res.status(200).json({ status: "success", data: candidates });
        }

    } catch (error) {
        console.log(error);
    }
};

candidateController.updateCandidate = async (req, res) => {
    try {
        let id = req.params.id;
        let candidate = await dbquries.findOne(baseModel.Candidate, id);
        if (!candidate) {
            return res.status(400).json({ error: 'Candidate not found' });
        } else {
            let updateCandidate = await dbquries.findByIdAndUpdate(baseModel.Candidate, id, reqBody);
            if (updateCandidate) {
                return res.status(200).json({ message: "Candidate Updated Successfully", data: updateCandidate });
            }
        }

    } catch (error) {
        console.log(error);
    }
}


candidateController.VoteForCandidate = async (req, res) => {
    try {
        let userId = {
            _id: new mongoose.Types.ObjectId(req.decoded._id)
        }
        let candidateID = {
            _id: new mongoose.Types.ObjectId(req.params.candidateID)
        }

        let candidate = await dbquries.findOne(baseModel.Candidate, candidateID);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const user = await dbquries.findOne(baseModel.userdb, userId);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        if (user.role == 'admin') {
            return res.status(403).json({ message: 'admin is not allowed' });
        }
        if (user.isVoted) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        // Update the Candidate document to record the vote
        candidate.votes.push({ user: userId })
        candidate.voteCount++;
        await candidate.save();

        // update the user document
        user.isVoted = true
        await user.save();

        return res.status(200).json({ message: 'Vote recorded successfully' });


    } catch (error) {
        console.log(error);
    }
};

candidateController.CountVotes = async (req, res) => {
    try {
        const candidate = await dbquries.findByQuery(baseModel.Candidate, {});

        // Map the candidates to only return their name and voteCount
        const voteRecord = candidate.map((data) => {
            return {
                party: data.party,
                count: data.voteCount
            }
        });
        return res.status(200).json(voteRecord);

    } catch (error) {
        console.log(error);
    }
};

module.exports = candidateController;