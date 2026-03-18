function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Add leading zero
    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    const time = hours + ":" + minutes + ":" + seconds;

    document.getElementById("clock").textContent = time;
}

/* Update clock every second */

setInterval(updateClock, 1000);

/* Run once immediately */

updateClock();