const time = document.querySelector("#time");
const timeLabel = document.querySelector("#timeLabel");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");
let timeRemaining;
let sessionTime = 0.5;
let breakTime = 0.25;
let timeoutID;
let isWorkDone = false;

setSessionTime(sessionTime, breakTime);





play.addEventListener('click', () => {
	timeoutID = setInterval(showTimeRemaining, 1000);
});

pause.addEventListener('click', stopTimer);

stop.addEventListener('click', () => {
	stopTimer();
	setSessionTime(sessionTime, breakTime);
});

reset.addEventListener('click', () => {
	stopTimer();
	setSessionTime(25, 5);
});





function showTimeRemaining() {
	time.innerHTML = convertToMinSec(timeRemaining);
	timeRemaining--;

	if (timeRemaining < 0) {
		stopTimer();

		if (isWorkDone) {
			isWorkDone = false;
		} else {
			isWorkDone = true;
		}

		setSessionTime(sessionTime, breakTime);
	}
}

function convertToMinSec(sec) {
	let timeString = Math.floor(sec / 60);

	sec = sec % 60;

	if (sec < 10) {
		timeString += `:0${sec}`;
	} else {
		timeString += `:${sec}`;
	}

	return timeString;
}

function stopTimer() {
	clearInterval(timeoutID);
}

function setSessionTime(workTime, playTime) {
	if (isWorkDone) {
		time.innerHTML = convertToMinSec(playTime * 60);
		timeLabel.innerHTML = "Rest Session";
		timeRemaining = playTime * 60;
	} else {
		time.innerHTML = convertToMinSec(workTime * 60);
		timeLabel.innerHTML = "Work Session";
		timeRemaining = workTime * 60;
	}
}