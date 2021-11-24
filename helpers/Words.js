import {frenchWords, englishWords} from "./wordSource"

export default function Words(wordToFind){
    let langue = localStorage.getItem("lang") || "fr"
    console.log(langue)
    const source = langue === "fr"? frenchWords: englishWords

    return source[wordToFind]
}
