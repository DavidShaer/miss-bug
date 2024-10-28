import { utilService } from '../../services/util.service.js'



export const bugService = {
    query,
    save,
    getById,
    remove,
    // add
}


const dataFilePath = './data/bugs.json'
let bugs = utilService.readJsonFile(dataFilePath)
const PAGE_SIZE = 5

async function query(filterBy = {}) {
    try {
        let filteredBugs = [...bugs]

        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            filteredBugs = filteredBugs.filter(bug => regExp.test(bug.title))
        }
        if (filterBy.severity) {
            filteredBugs = filteredBugs.filter(bug => bug.severity === filterBy.severity)
        }
        if (!isNaN(filterBy.pageIdx)) {
            const startIdx = filterBy.pageIdx * filterBy.pageSize
            filteredBugs = filteredBugs.slice(startIdx, startIdx + filterBy.pageSize)
        }
        return filteredBugs

    } catch (err) {
        console.log('Cannot read bugs file', err)
        throw err
    }
}

async function save(bugToSave) {
    if (bugToSave._id && bugToSave._id !== 'undefined') {
        const idx = bugs.findIndex(bug => bug._id === bugToSave._id)
        if (idx !== -1) {
            // Bug found, update it
            bugs[idx] = bugToSave;
        } else {
            // Bug not found, add it as a new bug
            bugs.push(bugToSave);
        }
    } else {
        // New bug, generate ID and add it
        bugToSave._id = utilService.makeId();
        bugs.push(bugToSave);
    }
    await utilService.saveToFile(dataFilePath, bugs);
}

function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    return bug
}

async function remove(bugId) {
    bugs = bugs.filter(bug => bug._id !== bugId)
    await utilService.saveToFile(dataFilePath, bugs)
}
