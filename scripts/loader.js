var configScript = document.createElement("script");
configScript.src = "config.js";
configScript.addEventListener('load', configLoaded);

document.head.appendChild(configScript);

function configLoaded() {
    document.title = pageTitle;
    document.documentElement.lang = pageLang;

    var indexStyle = document.createElement("link");
    indexStyle.rel = "stylesheet";
    indexStyle.href = "styles/index.css";

    var languageData = document.createElement("script");
    languageData.src = "translations/lang_" + pageLang + ".js";
    languageData.addEventListener('load', languageLoaded);

    document.head.appendChild(indexStyle);
    document.head.appendChild(languageData);
}

function languageLoaded() {
    var startButton = document.getElementById("start");
    startButton.innerText = lang["loader.startButton"];

    var coreScript = document.createElement("script");
    coreScript.src = "scripts/core.js";

    document.body.appendChild(coreScript);

    if(enableAnticheat) {
        var anticheatScript = document.createElement("script");
        anticheatScript.src = "scripts/anticheat.js";
        anticheatScript.addEventListener('error', function(event) {
            alert(lang["loader.anticheatLoadError"]);
            var startButton = document.querySelector("#start");
            startButton.removeEventListener('click', start);
            start = function() {
                alert(lang["loader.gameDisabled"]);
            };
            startButton.addEventListener('click', start);
        });
        
        document.body.appendChild(anticheatScript);
    }
}

window.addEventListener('load', function() {
    document.body.style.display = "";
});