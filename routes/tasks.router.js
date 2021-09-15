const {Router} = require('express')
const Task = require('../models/task')

const router = Router()

router.get('/get/:owner', async (req,res) => {
    try {
        const owner = req.params.owner

        const tasks = await Task.find({owner})

        res.status(201).json({tasks})
    } catch (e) {
        res.status(500).json({
            errors: 'Ошибка',
            message: 'Что-то пошло не так'
        })
    }
})

router.post('/add', async (req,res) => {
    try {
        const {owner, value} = req.body

        const candidateTask = await Task.findOne({owner, value})

        if (candidateTask) {
            return res.status(400).json({
                errors: 'Ошибка',
                message: 'Такая задача уже существует'
            })
        }

        const task = new Task ({owner, value, isDone: false, isImportant: false})

        await task.save()

        res.status(201).json({message: 'Задача создана'})
    } catch (e) {
        res.status(500).json({
            errors: 'Ошибка',
            message: 'Что-то пошло не так'
        })
    }
})

router.patch('/patch', async (req,res) => {
    try {
        const {owner, value, isDone, isImportant} = req.body

        await Task.findOneAndUpdate({owner, value}, { $set: {isDone, isImportant}})

        res.status(201).json({message: 'Задача обновлена'})
    } catch (e) {
        res.status(500).json({
            errors: 'Ошибка',
            message: 'Что-то пошло не так'
        })
    }
})

router.patch('/delete', async (req,res) => {
    try {
        const {owner, value} = req.body

        await Task.deleteOne({owner, value})

        res.status(201).json({message: 'Задача удалена'})
    } catch (e) {
        res.status(500).json({
            errors: 'Ошибка',
            message: 'Что-то пошло не так'
        })
    }
})

module.exports = router