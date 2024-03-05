const express = require('express');
const router = express.Router();
const userRouter = require('./user.router');
const candidateRouter = require('./candidate.routes');
router.use('/user', userRouter);
router.use('/candidate', candidateRouter);


module.exports = router;