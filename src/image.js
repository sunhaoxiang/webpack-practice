import './css/main.css'

let smallImg = document.createElement('img')
// 必须 require 进来
smallImg.src = require('./images/small.jpeg')
document.body.appendChild(smallImg)

let bigImg = document.createElement('img')
bigImg.src = require('./images/big.jpeg')
document.body.appendChild(bigImg)
