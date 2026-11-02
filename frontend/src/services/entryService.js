import api from './api'

async function getMyEntries(){
    const response = await api.get('/entries/my-entries')
    return response.data
}

async function getPublicEntries(){
    const response = await api.get('/entries')
    return response.data
}

async function createEntry(formData){
    const response = await api.post('/entries', formData)
    return response.data
}

export {
  getMyEntries,
  getPublicEntries,
  createEntry
};
