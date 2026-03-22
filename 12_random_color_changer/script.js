function changeColor() {

    const letters = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {

        const randomIndex = Math.floor(Math.random() * 16);

        color += letters[randomIndex];

    }

    document.body.style.backgroundColor = color;

    document.getElementById("colorCode").textContent =
        "Current Color: " + color;
}