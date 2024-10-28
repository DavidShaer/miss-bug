import { bugService } from './bug.service.js'



// get bug
// app.get('/api/bug', async (req, res) => {

export async function getBugs(req, res) {
    console.log('req.query_____', req.query)     
    const {txt, severity, pageIdx, pageSize} = req.query
    const filterBy = {txt, severity: +severity, pageIdx: +pageIdx, pageSize: +pageSize}
    const bugsToSend = await bugService.query(filterBy)

    res.send(bugsToSend)
}

export async function getBug(req, res) {
    const {bugId} = req.params
    const bug = bugService.getById(bugId)
    res.send(bug)
}

export async function deleteBug(req, res) {
    const {bugId} = req.params // why is working ?
    await bugService.remove(bugId)
    res.send(`Bug removed successfully ${bugId}`)
}

export async function addBug(req, res) {
    console.log('req.body', req.body)
    const {title, severity, description, label} = req.body
    const bugToSave = {title, severity, description, label, createdAt: new Date()}
    await bugService.save(bugToSave)
    res.send(bugToSave)
}

export async function updateBug(req, res) {
    console.log('req.body', req.body)
    const {title, severity, description, label, createdAt, _id} = req.body
    const bugToSave = {title, severity, description, label, createdAt, _id}
    await bugService.save(bugToSave)
    res.send(bugToSave)
}