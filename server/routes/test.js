const router = require('express').Router();
const {Test} = require("../model/test");
const {Result} = require("../model/result");
const {Quiz} = require("../model/quiz");



router.post('/', async (req, res) => {
    try {
        const testId = req.body.pin;
        const email = req.body.email
        const doc = await Test.findOne({pin: testId}).exec();
        const limitQuiz = Number(doc.amount)
        // console.log(limitQuiz);
        if (!doc) {
            return res.status(400).send({ message: "Test doesn't exist!" });
        }
        if (Date.parse(doc.expiry) < Date.now()) {
            return res.status(400).send({ message: "Test has expired!! " });
        }  
        const check = await Result.findOne({pin: testId, email}).exec();
        if (check) {
            return res.status(400).send({ message: "Test already taken!" });
        }
        const question = await Quiz.find({title: doc.title}).limit(limitQuiz).exec()
        question.time = doc.time;
        console.log(question);
        console.log(doc.title);
        return res.send({
            results: question,
            time: doc.time,
        });
        
    } catch (error) {
        console.log(error.message);
    }
})
router.route("/submit_test").post(async (req, res) => {
    try {
        const score = parseInt(req.body.score);
        const email = req.body.email.toLowerCase();
        const name = req.body.name;
        const pin = req.body.pin;
    
        const resultEntry = new Result({ email, name, pin, score });
        resultEntry
        .save()
        .then(() => res.send("result added!"))
        .catch((err) => res.status(400).json("error : " + err));
        res.json(resultEntry)
    } catch (error) {
        console.log(errror.message);
    }    
});
router.route("/get_test").post(async (req, res) => {
    const email = req.body.email;
    try {
        const doc = await Test.find({ email }).sort("-created").exec();
        return res.send(doc);
    } catch (err) {
        console.log(err);
        return res.status(400).send();
    }
});
router.route("/get_result").post(async (req, res) => {
    const pin = req.body.pin;
    try {
        const resultdoc = await Result.find({ pin }).exec();
        return res.send(resultdoc);
    } catch (err) {
        return res.status(400).send();
    }
});
router.route("/add_test").post(async (req, res) => {
    try {
        const pin = (await Test.countDocuments({}).exec()) + 1000;
        const email = req.body.email
        const amount = req.body.amount;
        const title = req.body.title;
        const time = req.body.time;
        const expiry = Date.parse(req.body.expiry);
        const created = Date.parse(req.body.created);
        const newtest = new Test({
        pin,
        email,
        amount,
        title,
        time,
        expiry,
        created,
        });
        newtest
        .save()
        .then(() => res.send("test added!"))
        .catch((err) => res.status(400).json("error : " + err.message));
        } catch (error) {
            console.log(error.message)
        }
});
  


module.exports = router