
// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

//function that randomizes characters
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

//copy to clipboard feature
clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password) { return; }  //if no password generated, return nothing.
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Generated password copied to clipboard');
});


//fetch the values from input fields in the browser window
generateEl.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);        //put inputs from briwser into the generatePassword c
});

function generatePassword(lower, upper, number, symbol, length) {
	let finalPassword = '';
	const typesChecked = lower + upper + number + symbol;                                            //add up types - value 1 if checked
	const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]); //value 0 (false) menas not checked, 1 (true) means checked
	
	// If tehre is no checked type of characters
	if(typesChecked === 0) {
		return '';
	}
	
	for(let i=0; i<length; i+=typesChecked) {    //loop through the types checked for the length given in the browser window and inclerement by types checked
		typesArray.forEach(type => {              //for each type checked randomize a character
			const funcName = Object.keys(type)[0];  // take first type checked
			finalPassword += randomFunc[funcName]();  //concatinate the lastPassword fraction with new random character
		});
	}
	
	//const finalPassword = finalPassword.slice(0, length);
	
	return finalPassword;
}

//The generator algorythm for randomizing characters
//characters are randomly selected usign this Char Browser Set : https://net-comber.com/charset.html 
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}
