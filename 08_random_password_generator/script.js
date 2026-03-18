function generatePassword() {

    const length = document.getElementById("length").value;

    const upper = document.getElementById("uppercase").checked;
    const lower = document.getElementById("lowercase").checked;
    const number = document.getElementById("numbers").checked;
    const symbol = document.getElementById("symbols").checked;

    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+";

    let allChars = "";

    if (upper) allChars += upperChars;
    if (lower) allChars += lowerChars;
    if (number) allChars += numberChars;
    if (symbol) allChars += symbolChars;

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    document.getElementById("password").value = password;
}


function copyPassword(){

    const passwordField = document.getElementById("password");

    passwordField.select();
    document.execCommand("copy");

    alert("Password Copied!");
}