const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/user')
const {body, validationResult} = require('express-validator')

const router = Router()

router.post(
    '/register',
    [
        body('email', 'Некорректный email').isEmail(),
        body('password', 'Минимальная длинна пароля 4 символа').isLength({min: 4})
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({
                errors: 'Ошибка',
                message: 'Такой пользователь уже существует'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User ({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'Пользователь создан', userId: user.id})
    } catch (e) {
        res.status(500).json({
            errors: 'Ошибка',
            message: 'Что-то пошло не так'
        })
    }
})

router.post(
    '/login',
    [
        body('email', 'Введите корректный email').normalizeEmail().isEmail(),
        body('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            })
        }

        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({
                errors: 'Ошибка',
                message: 'Такого пользователя не существует'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                errors: 'Ошибка',
                message: 'Неверный пароль'
            })
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.status(201).json({token, userId: user.id})

    } catch (e) {
        res.status(500).json({
            errors: 'Ошибка',
            message: 'Что-то пошло не так'
        })
    }
})

module.exports = router