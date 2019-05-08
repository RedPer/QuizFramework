var anwsered = 0;

var correctAnwsers = [];
var incorrectAnwsers = [];

var quizInner;
var questionParagraph;

function start() {
    //Send gamestart event
    window.dispatchEvent(new Event("gamestart"));
    
    //Remove start button
    quizStartRow = document.querySelector("#quizStart");
    quizStartRow.remove();


    container = document.querySelector("#container");
    //Add every question to the page
    var i;
    for(i = 0; i < questions.length; i++) {
        let row = document.createElement("div");
        row.className = "row";

        let wrapperCol1 = document.createElement("div");
        wrapperCol1.className = "col";

        let wrapperCol2 = document.createElement("div");
        wrapperCol2.className = "col";

        let containerCol = document.createElement("div");
        containerCol.className = "col-8";

        let questionCard = document.createElement("div");
        questionCard.className = "card mt-2 mb-2 text-center";

        let questionHeader = document.createElement("h1");
        questionHeader.innerText = questions[i];
        
        questionCard.appendChild(questionHeader);
        
        let anwserButtonWrapper;
        
        let j;
        for(j = 0; j < anwsers[i].length; j++) {
            if(j % 2 == 0) {
                anwserButtonWrapper = document.createElement("div");
                anwserButtonWrapper.className = "row mb-2";
                questionCard.appendChild(anwserButtonWrapper);
                
                let buttonColWrapper = document.createElement("div");
                buttonColWrapper.className = "col";
                anwserButtonWrapper.appendChild(buttonColWrapper);
            }
            
            let buttonCol = document.createElement("div");
            buttonCol.className = "col-5"
            
            let anwserBut = document.createElement("button");
            anwserBut.className = "btn btn-primary btn-block";
            anwserBut.innerText = anwsers[i][j];
            anwserBut.name = i;
            anwserBut.value = j;
            anwserBut.addEventListener("click", function() {
                
                anwserBut.className = "btn btn-success btn-block";
                for(but of questionCard.querySelectorAll("button")) {
                    but.disabled = true;
                }
                
                if(correct[anwserBut.name] == anwserBut.value) {
                    correctAnwsers.push({question: anwserBut.name, anwser: anwserBut.value});
                } else {
                    incorrectAnwsers.push({question: anwserBut.name, anwser: anwserBut.value});
                }
                
                anwsered++;
                if(anwsered == questions.length) {
                    showResults();
                }
            });
            buttonCol.appendChild(anwserBut);
            
            anwserButtonWrapper.appendChild(buttonCol)
            
            if(j % 2 == 1) {
                let buttonColWrapper = document.createElement("div");
                buttonColWrapper.className = "col";
                anwserButtonWrapper.appendChild(buttonColWrapper);
            } else if(anwsers[i].length % 2 != 0 && j + 1 == anwsers[i].length) {
                let buttonColWrapper = document.createElement("div");
                buttonColWrapper.className = "col";
                anwserButtonWrapper.appendChild(buttonColWrapper);
            }
        }

        containerCol.appendChild(questionCard);
        row.appendChild(wrapperCol1);
        row.appendChild(containerCol);
        row.appendChild(wrapperCol2);

        container.appendChild(row);
    }
}

function showResults() {
    //Send gameend event
    window.dispatchEvent(new Event("gameend"));

    //Scroll to the top of the page
    window.scrollTo(0, 0);

    var container = document.querySelector("#container");
    var questionRows = container.querySelectorAll(".row");
    questionRows.forEach(function(qr) {
        qr.remove();
    });
    
    var score = correctAnwsers.length / questions.length * 100;
    var correctA = correctAnwsers.length;
    var incorrectA = incorrectAnwsers.length;
    
    var scoreDisplay = document.createElement("h1");
    scoreDisplay.className = "text-center";
    scoreDisplay.innerText = lang["core.results.score"].replace("{0}", score);
    
    var correctDisplay = document.createElement("p");
    correctDisplay.className = "text-center";
    correctDisplay.innerText = lang["core.results.correct"].replace("{0}", correctA);
    
    var incorrectDisplay = document.createElement("p");
    incorrectDisplay.className = "text-center";
    incorrectDisplay.innerText = lang["core.results.incorrect"].replace("{0}", incorrectA);
    
    container.appendChild(scoreDisplay);
    container.appendChild(correctDisplay);
    container.appendChild(incorrectDisplay);
    
    for(cAnwser of correctAnwsers) {
        var questionHeader = document.createElement("h2");
        questionHeader.className = "text-center";
        questionHeader.innerText = questions[cAnwser.question];
        
        var anwser = document.createElement("p");
        anwser.className = "text-center text-success";
        anwser.innerText = anwsers[cAnwser.question][cAnwser.anwser];
        
        container.appendChild(questionHeader);
        container.appendChild(anwser);
    }
    
    for(icAnwser of incorrectAnwsers) {
        var questionHeader = document.createElement("h2");
        questionHeader.className = "text-center";
        questionHeader.innerText = questions[icAnwser.question];
        
        var anwser = document.createElement("p");
        anwser.className = "text-center text-danger";
        anwser.innerText = anwsers[icAnwser.question][icAnwser.anwser];
        
        var cAnwseri = document.createElement("p");
        cAnwseri.className = "text-center text-success";
        cAnwseri.innerText = anwsers[icAnwser.question][correct[icAnwser.question]];
        
        container.appendChild(questionHeader);
        container.appendChild(anwser);
        container.appendChild(cAnwseri);
    }
}

var startButton = document.querySelector("#start");
startButton.addEventListener("click", start);
