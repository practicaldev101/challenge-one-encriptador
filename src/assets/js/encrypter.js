export function Encrypter(){
    const patronEncrypt = {
        "a": "ai",
        "e": "enter",
        "i": "imes",
        "o": "ober",
        "u": "ufat"
    }
    //Revierte las llaves y valores de patronEncrypt de b:a hacia a:b
    const patronDecrypt = Object.fromEntries(
        Object.entries(patronEncrypt)
        .map( ( [key, value] ) => [value, key] )
    );
    
    const encryptWord = ( word )=>{
        return word
        .split("")
        .map( ( letter ) => {
            const toReplace = patronEncrypt[letter] ? patronEncrypt[letter] : letter;
            return letter.replace(letter, toReplace);
        }).join("");
    }
    
    const decryptWord = ( word )=>{
        let originalWord = word;
            Object
            .getOwnPropertyNames( patronDecrypt )
            .forEach( ( propertyName ) => {
                while(originalWord.includes( propertyName )){
                    originalWord = originalWord.replace( propertyName, patronDecrypt[propertyName] );
                }
            })
        return originalWord;
    }
    
    return{
        encrypt: ( text ) => {
            return text.split(" ").map( ( word ) => encryptWord( word ) ).join(" ");
        },
        decrypt: ( text ) => {
            return text.split(" ").map( ( word ) => decryptWord( word ) ).join(" ");
        }
    }
    
}
