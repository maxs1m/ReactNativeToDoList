const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require("cors");

const app = express()

app.use(cors())
app.use(express.json({ inflate: true }))
app.use('/api/auth', require('./routes/user.routes'))
app.use('/task', require('./routes/tasks.router'))

const PORT = config.get('port') || 5000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(5000,() => console.log(`it is work ${PORT}`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()

