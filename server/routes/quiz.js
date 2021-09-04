const { Quiz } = require('../model/quiz');

const router = require('express').Router();
router.post('/add_quiz', async (req, res) => {
    try {
        const quiz = new Quiz({
            ...req.body
        })
        await quiz.save();
        res.json(quiz)
    } catch (error) {
        throw error
    }
})
router.get('/quiz/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const quiz = await Quiz.findById(_id)
        res.json(quiz)
    } catch (error) {
        res.status(404).send('Not found')
    }
})
router.get('/all', async (req, res) => {
    try {
        const quiz = await Quiz.find({}).limit(parseInt(req.query.limit))
        res.json(quiz)
    } catch (error) {
        throw error
    }
})
router.get('/get_title', async (req, res) => {
    try {
        const quiz = await Quiz.find({})
        res.json(quiz)
    } catch (error) {
        throw error
    }
})

// delete tinh sao

module.exports = router