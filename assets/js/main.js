import { Encrypter } from "./encrypter.js";

const encrypter = Encrypter();
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const emptyBox = document.getElementById("emptyBox");
const textBox = document.getElementById("textBox");
const warnText = document.getElementById("warnText");
const warnIcon = document.getElementById("warnIcon");

const swapButton = document.getElementById("swapButton");
const lowerCaseButton = document.getElementById("lowerCaseButton");
const fixButton = document.getElementById("fixButton");
const cleanButton = document.getElementById("cleanButton");
const encryptButton = document.getElementById("encryptButton");
const decryptButton = document.getElementById("decryptButton");
const copyButton = document.getElementById("copyButton");

const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;


const setWarn = (message) => {
    warnText.innerText = message;
    warnIcon.style.filter = "none";
}
const resetWarn = () => {
    warnText.innerText = "Only lower case letters and without accent are allowed.";
    warnIcon.style.filter = "brightness(0) invert(1)";
}

const hasSpecialChar = (text) => {
    return regex.test(text);
}

const fixText = (text) => {
    let fixedText = text;
    while(regex.test(fixedText)){
        fixedText = fixedText.replace(regex, "");
    }
    return fixedText;
}

const checkRequirements = () => {
    const text = inputText.value;
    console.log(text)
    if (text.toLowerCase() !== text){
        setWarn("Upper case letters aren't allowed.")
        return false;
    }else if(hasSpecialChar(text)){
        setWarn("Special characters aren't allowed.")
        return false;
    }
    resetWarn();
    return true
}

const onKeyUp = (event) => {
    checkRequirements();
}

const toggleElement = (element, displayType) => {
    if (displayType === "flex"){
        element.style.display = "flex";
    }
    else if(displayType === "block"){
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
    }
} 


const showOutputText = (text) => {
    outputText.innerText = text;

    if (outputText.innerText.trim() != ""){
        toggleElement(textBox, "flex");
        toggleElement(emptyBox, "none");
    }
    else{
        toggleElement(textBox, "none");
        toggleElement(emptyBox, "flex");
    }
}

const changeInputText = (text) => {
    inputText.value = text;
    checkRequirements();
}

const fixInputText = () => {
    const newText = fixText(inputText.value);
    changeInputText(newText);
    inputText.focus();
}

const cleanAllTexts = () => {
    changeInputText("");
    showOutputText("");
    inputText.focus();
}
const inputToLowerCase = () => {
    const lowerCaseText = inputText.value.toLowerCase().trim();
    changeInputText(lowerCaseText);
    inputText.focus();
}

const swapText = () => {
    const outputContent = outputText.innerText;
    const inputContent = inputText.value;
    if (outputContent.trim() !== "" && inputContent.trim() !== ""){
        changeInputText(outputContent);
        showOutputText(inputContent);
        inputText.focus();
    }
}

const encryptText = () =>{
    const textIsvalid = checkRequirements();
    if (textIsvalid){
        const securedText = encrypter.encrypt(inputText.value);
        showOutputText(securedText);
    }
}

const decryptText = () =>{
    const textIsvalid = checkRequirements();
    if (textIsvalid){
        const securedText = encrypter.decrypt(inputText.value);
        showOutputText(securedText);
    }
}

const copyTextToClipboard = () => {
    const toCopy = outputText.innerText;
    navigator.clipboard.writeText(toCopy);
    copyButton.innerText = "Copied!";
    setTimeout(()=>{
        copyButton.innerText = "Copy";
    }, 2000)
}

const startSystem = () => {    
    inputText.focus();

    inputText.addEventListener("keyup", onKeyUp);
    encryptButton.addEventListener("click", encryptText);
    decryptButton.addEventListener("click", decryptText);
    copyButton.addEventListener("click", copyTextToClipboard);
    swapButton.addEventListener("click", swapText);
    lowerCaseButton.addEventListener("click", inputToLowerCase);
    fixButton.addEventListener("click", fixInputText);
    cleanButton.addEventListener("click", cleanAllTexts);

    encryptButton.addEventListener("touchend", encryptText);
    decryptButton.addEventListener("touchend", decryptText);
    copyButton.addEventListener("touchend", copyTextToClipboard);
}

window.addEventListener("load", startSystem)