import ref from './ref'

export function saveCateg(titre, description, img_link, idRestau, token){
    const url = ref + 'restau/save_categ'

    return fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({titre, description, img_link, idRestau})
    })
    .then(data => data.text())
    .catch((e) => console.log(e))
}