const express = require('express')

const router = express.Router()
const testRoute = require('./test')
const quizRoute = require('./quiz')
const routesIndex = [
    {
        path: '/test',
        route: testRoute
    },
    {
        path: '/quiz',
        route: quizRoute
    },
    // không cần phải app.use() mỗi route con nữa
]
routesIndex.forEach(route => {
    router.use(route.path, route.route)
})


module.exports = router