
import { storageService } from './async-storage.service.js'
import Axios from 'axios'
var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = 'http://localhost:3030/api/bug'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
}

function getDefaultFilter() {
	return { txt: '', severity: '', pageIdx: 0, pageSize: 5 }
}

async function query(filterBy = {}) {
    // send the server the filterBy object
    var { data: bugs } = await axios.get(BASE_URL, { params: filterBy })

	return bugs
}

async function getById(bugId) {
    var {data: bug} = await axios.get(BASE_URL+`/${bugId}`)
    return bug
}
async function remove(bugId) {
    var {data: bug} = await axios.delete(BASE_URL+`/${bugId}`)
    return bug
}

async function save(bug) {
    let url = BASE_URL
    console.log("url", url);
    if (bug._id) {
        var {data: bugToSave} = await axios.put(url, bug)
    } else {
        var {data: bugToSave} = await axios.post(url, bug)
    }
    return bugToSave
}








// async function save(bug) {
//     let queryParam = `?_id=${bug._id}&title=${bug.title}&description=${bug.description}&severity=${bug.severity}&labels=${bug.label}`
//     let url = BASE_URL + '/save' + queryParam
//     console.log("url", url);
//     // var {data: bugToSave} = await axios.get(url)
//     var {data: bugToSave} = await axios.post(url)
//     return bugToSave
// }