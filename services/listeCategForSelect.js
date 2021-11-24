import ref from './ref'

export function listeCategForSelect(id, token){
    const url = ref + 'restau/getCategForSelect'

    return fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({id})
    })
    .then(data => data.json())
    .catch((e) => console.log(e))
}