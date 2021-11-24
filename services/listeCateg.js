import ref from './ref'

export function listeCateg(idRestau, token){
    const url = ref + 'restau/liste_categ'

    return fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({idRestau})
    })
    .then(data => data.json())
    .catch((e) => console.log(e))
}