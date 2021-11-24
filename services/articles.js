import ref from "./ref";
import { getResponseJson, getError, getResponseText, writeServer } from './gettinFormat'


export function saveArticle(nom, description, prix_reel, remise, prix_vente, legume, personnalisable, disponible, lien_img, idRestau, categListe, token)
{
    return fetch(ref + 'restau/save_article', writeServer({nom, description, prix_reel, remise, prix_vente, legume, personnalisable, disponible, lien_img, idRestau, categListe, token}))
    .then(getResponseText)
    .catch(getError)
}

export function getArticles(idRestau, token)
{
    return fetch(ref + 'restau/getByRestau', writeServer({idRestau, token}))
    .then(getResponseJson)
    .catch(getError)
}