
//DOM elements

const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const upperCaseEl = document.getElementById("upperCase");
const lowerCaseEl = document.getElementById("lowerCase");
const numberEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");


const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

//generate event listen
generateEl.addEventListener("click", () => {
    const lenght = +lenghtEl.value;
    const hasLower = lowerCaseEl.checked;
    const hasUpper = upperCaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolsEl.checked;

resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//copy pasword to clipboard



//generate password function
function generatePassword (lower, upper, number, symbol, length) {
    let finalPassword = "";
    const typesChecked = lower + upper + number + symbol;

    if (typesChecked === 0) {
        return "";                  //return nothing if there is nothing checked
    }

    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);  //0 means false

    for (let i=0; i<length; i+typesChecked) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];
            finalPassword += randomFunc[funcName]();
        });
    }
    return finalPassword;
}


// Generator functions

//generate random lower case letter according to character encoding in Browser character set https://net-comber.com/charset.html 
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//generate random uppercase letter

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//generate a random number between 0 and 9
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
    return symbols[Math.floor(Math.random() * symbols.length)];
}