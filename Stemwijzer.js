var answers = [""];
let currentStatement = 0;

const startBtn = document.getElementById("startBtn");
const skip = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const title = document.getElementById("title");
const statement = document.getElementById("statement");
const card = document.getElementById("kaartje");
const container = document.getElementById("container");
const agreed = document.getElementById("pro");
const disagreed = document.getElementById("contra");

startBtn.onclick = clickStartButton;
skip.onclick = clickSkipButton;
agreed.onclick = clickAgreedButton;
disagreed.onclick = clickDisagreedButton;
prevBtn.onclick = clickPrevButton;


//Functie om de display none van een element te halen.
function show(element){
    element.classList.remove("d-none");
}

//Functie om een element display none te geven.
function hide(element){
    element.classList.add("d-none");
}


function clickStartButton(){
    hide(startBtn);
    hide(card);
    document.body.style.background = "none";
    show(container);
    title.innerHTML = subjects[currentStatement].title;
    statement.innerHTML = subjects[currentStatement].statement;
    show(agreed);
    show(disagreed);
    show(skip);
    show(prevBtn);
}

//Function die ervoor zorgt dat je naar de volgende vraag gaat.
function nextStatement(){
    currentStatement++
    title.innerHTML = subjects[currentStatement].title;
    statement.innerHTML = subjects[currentStatement].statement;
}

//Function die ervoor zorgt dat de knop die je geantwoord hebt blauw word en de rest de standaard kleur blijft.
function colorButton(){
    if(answers[currentStatement] == "Pro"){
        document.getElementById("pro2").style.backgroundColor = "blue";
        document.getElementById("contra2").style.backgroundColor = "red";
        document.getElementById("nextBtn").style.backgroundColor = "grey";
    }

    else if(answers[currentStatement] == "Contra"){
        document.getElementById("contra2").style.backgroundColor = "blue";
        document.getElementById("pro2").style.backgroundColor = "green";
        document.getElementById("nextBtn").style.backgroundColor = "grey";
    }

    else if(answers[currentStatement] == "None"){
        document.getElementById("nextBtn").style.backgroundColor = "blue";
        document.getElementById("contra2").style.backgroundColor = "red";
        document.getElementById("pro2").style.backgroundColor = "green";
    }
}

//Function die ervoor zorgt dat je een vraag verder gaat en de waarde Pro in de array zet bij de juiste vraag.
function clickAgreedButton(){
    answers.push("Pro");
    nextStatement();
}

//Function die ervoor zorgt dat je een vraag verder gaat en de waarde Contra in de array zet bij de juiste vraag.
function clickDisagreedButton(){
    answers.push("Contra");
    nextStatement();
}

//Function die ervoor zorgt dat je een vraag verder gaat en de waarde None in de array zet bij de juiste vraag.
function clickSkipButton(){
    answers.push("None");
    nextStatement();
}

//Console.log om alle antwoorden terug te vinden in de console.
console.log(answers);

//Function die ervoor zorgt dat je een vraag terug gaat en de blauwe knop van het laatst gegeven antwoord weergeeft.
function clickPrevButton(){
    colorButton();

    if(currentStatement > 0){
    currentStatement--
    title.innerHTML = subjects[currentStatement].title;
    statement.innerHTML = subjects[currentStatement].statement;
    }
}