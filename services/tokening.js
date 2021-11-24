import ref from './ref'

export function tokening(email, password, device_name){
   const url = ref + 'restau/tokening'

   return fetch(url, {
       method: 'post',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({email, password, device_name})
   })
   .then(data => data.text())
   .catch((e) => console.log(e))
}