let timerInterval;
let totalTime = 0;
let isRunning = false;

const hoursElem = document.getElementById('hours');
const minutesElem = document.getElementById('minutes');
const secondsElem = document.getElementById('seconds');
const alarmSound = document.getElementById('alarm-sound');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('stop').addEventListener('click', stopTimer);

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    totalTime = 0;
    isRunning = false;
    updateDisplay();
}

function stopTimer() {
    clearInterval(timerInterval);
    totalTime = 0;
    isRunning = false;
    alarmSound.play();
    showNotification("Timer Stopped", "The timer has been stopped.");
    updateDisplay();
}

function updateTimer() {
    totalTime++;
    updateDisplay();
}

function updateDisplay() {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;

    hoursElem.textContent = String(hours).padStart(2, '0');
    minutesElem.textContent = String(minutes).padStart(2, '0');
    secondsElem.textContent = String(seconds).padStart(2, '0');
}

function showNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, { body });
    }
}

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}
