const time = document.querySelector("#time");
const timeLabel = document.querySelector("#timeLabel");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");
const userSession = document.querySelector("#userSession");
const userBreak = document.querySelector("#userBreak");
const upBtns = nodeToArr(document.querySelectorAll(".adjustUp"));
const downBtns = nodeToArr(document.querySelectorAll(".adjustDown"));

let timeRemaining;
let sessionTime = 25;
let breakTime = 5;
let timeoutID;
let isWorkDone = false;

setSessionTime(sessionTime, breakTime);

setUserTime(sessionTime, breakTime);






play.addEventListener('click', startTimer);

pause.addEventListener('click', stopTimer);

stop.addEventListener('click', () => {
	isWorkDone = false;
	stopTimer();
	setSessionTime(sessionTime, breakTime);
});

reset.addEventListener('click', () => {
	isWorkDone = false;
	stopTimer();
	sessionTime = 25;
	breakTime = 5;
	setSessionTime(sessionTime, breakTime);
	setUserTime(sessionTime, breakTime);
});

upBtns[0].addEventListener('click', () => {
	if (sessionTime < 60) {
		sessionTime++;
		setSessionTime(sessionTime, breakTime);
		setUserTime(sessionTime, breakTime);
	}
});

upBtns[1].addEventListener('click', () => {
	if (breakTime < 60) {
		breakTime++;
		setSessionTime(sessionTime, breakTime);
		setUserTime(sessionTime, breakTime);	
	}
});

downBtns[0].addEventListener('click', () => {
	if (sessionTime > 1) {
		sessionTime--;
		setSessionTime(sessionTime, breakTime);
		setUserTime(sessionTime, breakTime);
	}
});

downBtns[1].addEventListener('click', () => {
	if (breakTime > 1) {
		breakTime--;
		setSessionTime(sessionTime, breakTime);
		setUserTime(sessionTime, breakTime);
	}
});






function startTimer() {
	timeoutID = setInterval(showTimeRemaining, 1000);
}

function showTimeRemaining() {
	time.innerHTML = convertToMinSec(timeRemaining);
	timeRemaining--;

	if (timeRemaining < -1) {
		stopTimer();

		if (isWorkDone) {
			isWorkDone = false;
		} else {
			isWorkDone = true;
		}

		setSessionTime(sessionTime, breakTime);
		startTimer();
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

function setUserTime(workTime, playTime) {
	userSession.innerHTML = workTime;
	userBreak.innerHTML = playTime;
}

function nodeToArr(nodelist) {
	let arr = [];
	for (let i = 0; i < nodelist.length; i++) {
		arr[i] = nodelist[i];
	}

	return arr;
}