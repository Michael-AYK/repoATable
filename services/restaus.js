import ref from "./ref";
import { getResponseJson, getError, getResponseText, writeServer } from './gettinFormat'


export function getAllRestau(token)
{
    return fetch(ref + 'restau/all', writeServer({token}))
    .then(getResponseJson)
    .catch(getError)
}
