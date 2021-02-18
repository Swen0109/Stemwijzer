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
const list = document.getElementById("list");
const bigParties = document.getElementById("bigParties");
const secularParties = document.getElementById("secularParties");
const secularPartiesNames = document.getElementById("secularPartiesNames");

startBtn.onclick = clickStartButton;
skip.onclick = clickSkipButton;
agreed.onclick = clickAgreedButton;
disagreed.onclick = clickDisagreedButton;
prevBtn.onclick = clickPrevButton;
bigParties.onclick = showBigParties;
secularParties.onclick = showSecularParties;



//Functie om de display none van een element te halen.
function show(element){
    element.classList.remove("d-none");
}

//Functie om een element display none te geven.
function hide(element){
    element.classList.add("d-none");
    secularParties.classList.add("d-none");
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

//Function die ervoor zorgt dat je naar de volgende vraag gaat. Als je vraag 30 hebt geantwoord, worden de best passende partijen laten zien.
function nextStatement(){
    if(currentStatement == 30){
        hide(skip);
        hide(prevBtn);
        hide(agreed);
        hide(disagreed);
        document.getElementById("title").innerHTML = "Partijen"
        document.getElementById("statement").innerHTML = "Bekijk hier de partijen die het beste bij jouw passen:"
        show(bigParties);
        show(secularParties);
    }

    else{
        currentStatement++
        title.innerHTML = subjects[currentStatement].title;
        statement.innerHTML = subjects[currentStatement].statement;
    }
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
    answers[currentStatement] = "Pro"
    nextStatement();
}

//Function die ervoor zorgt dat je een vraag verder gaat en de waarde Contra in de array zet bij de juiste vraag.
function clickDisagreedButton(){
    answers[currentStatement] = "Contra"
    nextStatement();
}

//Function die ervoor zorgt dat je een vraag verder gaat en de waarde None in de array zet bij de juiste vraag.
function clickSkipButton(){
    answers[currentStatement] = "None"
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

function showBigParties(){//Moet nog gefixed worden.
    var i = 0;
    console.log(parties.size);
    parties.forEach(party => {
        if(parties.size >= 10){
            var para = document.createElement("P");
            para.innerHTML = party.name;
            document.getElementById("bigPartiesNames").appendChild(para);
        }
        i++;
    });
}

//Functie die alle partijen laat zien die secular zijn.
function showSecularParties(){
    var i = 0;
    parties.forEach(party => {
        if(party.secular == true){
            var para2 = document.createElement("P");
            para2.innerHTML = party.name;
            para2.id = "names" + i;
            document.getElementById("secularPartiesNames").appendChild(para2);
            secularParties.onclick = removeNames;
        }
        i++;
    });
}

//Functie die alle namen van het beeld verwijderd als je weer op de button klikt van seculare partijen.
function removeNames(){
    var i = 0;
    parties.forEach(party => {
        console.log(document.getElementById("names" + i));
        if(party.secular == true){
            var p = document.getElementById("names" + i);
            p.parentNode.removeChild(p);   
        }
    i++; 
    });
    secularParties.onclick = showSecularParties;
} 
