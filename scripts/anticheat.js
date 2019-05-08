var hasFocus = true;
var defocusCounter = 0;

var anticheatDisplay;
var timerText;
var defocusCountText;

var currentTimer = -1;

window.addEventListener('load', function(event) {
    showWarning(lang["anticheat.enabledText"].replace("{0}", defocusTimeLimit).replace("{1}", defocusLimit));
    
    start = function() {
        console.log(lang["anticheat.startWithButton"]);
    };

    var debuggerBlocker = setInterval(function() {
        debugger;
    }, 50);
    
    var origClearInterval = clearInterval;
    
    clearInterval = function(interval) {
        if(interval == debuggerBlocker) {
            console.error(lang["anticheat.blockedClearInterval"]);
            return -1;
        } else {
            return origClearInterval(interval);
        }
    };
});

window.addEventListener('gamestart', function(event) {
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur); 
    
    anticheatDisplay = document.createElement("div");
    anticheatDisplay.style.zIndex = "-1";
    anticheatDisplay.style.position = "absolute";
    anticheatDisplay.style.top = "0";
    
    timerText = document.createElement("p");
    timerText.innerText = lang["anticheat.timer"] + ": " + lang["anticheat.timer.notStarted"];
    
    defocusCountText = document.createElement("p");
    defocusCountText.innerText = lang["anticheat.defocusCount"] + ": " + defocusCounter;
    
    anticheatDisplay.appendChild(timerText);
    anticheatDisplay.appendChild(defocusCountText);
    
    document.body.appendChild(anticheatDisplay);
});

window.addEventListener('gameend', function(event) {
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('blur', handleBlur);
});

function handleFocus(event) {
    if(event.isTrusted) {
        hasFocus = true;
        stopTimer();
    }
}

function handleBlur(event) {
    if(event.isTrusted) {
        hasFocus = false;
        startTimer();
        incrementDefocusCount();
        if(defocusCounter > defocusLimit) {
            wentOverDefocusLimit();
        }
    }
}

function startTimer() {
    if(currentTimer != -1) {
        clearTimeout(currentTimer);
    }
    currentTimer = setTimeout(timerOver, defocusTimeLimit * 1000);
    timerText.innerText = lang["anticheat.timer"] + ": " + lang["anticheat.timer.started"];
}

function stopTimer() {
    clearTimeout(currentTimer);
    currentTimer = -1;
    timerText.innerText = lang["anticheat.timer"] + ": " + lang["anticheat.timer.stopped"];
}

function timerOver() {
    timerText.innerText = lang["anticheat.timer"] + ": " + lang["anticheat.timer.runOut"]
    showAlert(lang["anticheat.disqualifyTime"].replace("{0}", defocusTimeLimit));
    showResults();
    changeResultsDisqualified();
}

function wentOverDefocusLimit() {
    stopTimer();
    showAlert(lang["anticheat.disqualifyCount"].replace("{0}", defocusLimit));
    showResults();
    changeResultsDisqualified();
}

function changeResultsDisqualified() {
    var scoreDisplay = document.querySelector("h1.text-center");
    scoreDisplay.innerText = lang["anticheat.results.disqualified"];
}

function incrementDefocusCount() {
    defocusCounter++;
    defocusCountText.innerText = lang["anticheat.defocusCount"] + ": " + defocusCounter;
}

function showAlert(message) {
    if(showAnticheatAlerts)
        alert(message);
}

function showWarning(message) {
    if(showAnticheatWarnings)
        alert(lang["anticheat.warnText"] + " " + message);
}
