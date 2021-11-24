import ref from "./ref";
import { getResponseJson, getError, getResponseText, writeServer } from './gettinFormat'


export function saveClient(nomCli, email, password, code_phone, tel, token)
{
    return fetch(ref + 'client/saveClient', writeServer({nomCli, email, password, code_phone, tel, token}))
    .then(getResponseText)
    .catch(getError)
}
