import ref from './ref'

export function login(email, password, token){
    const url = ref + 'restau/login'

    return fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({email, password})
    })
    .then(data => data.json())
    .catch((e) => console.log(e))
}