import fs from 'fs'


export const utilService = {
    makeId,
    readJsonFile,
    saveToFile,
    // makeLorem,
    // getRandomIntInclusive,
    // loadFromStorage,
    // saveToStorage
}

function saveToFile(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

function readJsonFile(path) {
    const data = fs.readFileSync(path, 'utf8')
    return JSON.parse(data)
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

// function makeLorem(size = 100) {
//     var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
//     var txt = ''
//     while (size > 0) {
//         size--
//         txt += words[Math.floor(Math.random() * words.length)] + ' '
//     }
//     return txt
// }

// function getRandomIntInclusive(min, max) {
//     min = Math.ceil(min)
//     max = Math.floor(max)
//     return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
// }

function saveToServer(key, value) {
    // localStorage.setItem(key, JSON.stringify(value))
}

function loadFromServer(key) {
    // const data = localStorage.getItem(key)
    // return (data) ? JSON.parse(data) : undefined
}