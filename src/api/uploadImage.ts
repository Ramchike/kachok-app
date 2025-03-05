import { API_URL } from "../config"

export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData
    formData.append('file', file, file.name)
    return fetch(API_URL+'upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        return response.json()
    }).then(data => data.url)
    
    .catch(error => {
        throw error
    })
}