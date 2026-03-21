function toFahrenheit(){

    const celsius = Number(document.getElementById("temperature").value);

    const fahrenheit = (celsius * 9/5) + 32;

    document.getElementById("result").textContent =
        "Fahrenheit: " + fahrenheit.toFixed(2) + " °F";
}


function toCelsius(){

    const fahrenheit = Number(document.getElementById("temperature").value);

    const celsius = (fahrenheit - 32) * 5/9;

    document.getElementById("result").textContent =
        "Celsius: " + celsius.toFixed(2) + " °C";
}