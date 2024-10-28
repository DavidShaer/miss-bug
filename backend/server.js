import express from 'express'


import cors from 'cors'

const app = express()
    app.get('/', (req, res) => res.send('Hello 2223')) 
    app.listen(3030, () => console.log('Server ready at port 3030'))

const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true
}
app.use(express.static('public'))
app.use(cors(corsOptions))
app.use(express.json())

// add bug routes
import { BugRoutes } from './api/bugs/bug.routes.js'
app.use('/api/bug', BugRoutes)


//  CRUDL
// let bugs = await bugService.query()
// // get bug
// app.get('/api/bug', async (req, res) => {
//     console.log('req.query_____', req.query)     
//     const {txt, severity, pageIdx, pageSize} = req.query
//     const filterBy = {txt, severity: +severity, pageIdx: +pageIdx, pageSize: +pageSize}
//     const bugsToSend = await bugService.query(filterBy)

//     res.send(bugsToSend)
// })
// app.get('/api/bug/:bugId', async (req, res) => {
//     const {bugId} = req.params
//     const bug = bugService.getById(bugId)
//     res.send(bug)
// })
// app.delete('/api/bug/:bugId', async (req, res) => {
//     const {bugId} = req.params // why is working ?
//     await bugService.remove(bugId)
//     res.send(`Bug removed successfully ${bugId}`)
// })

// app.post('/api/bug', async (req, res) => {
//     console.log('req.body', req.body)
//     const {title, severity, description, label} = req.body
//     const bugToSave = {title, severity, description, label, createdAt: new Date()}
//     await bugService.save(bugToSave)
//     res.send(bugToSave)
// })
// app.put('/api/bug', async (req, res) => {
//     console.log('req.body', req.body)
//     const {title, severity, description, label, createdAt, _id} = req.body
//     const bugToSave = {title, severity, description, label, createdAt, _id}
//     await bugService.save(bugToSave)
//     res.send(bugToSave)
// })

