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
        document.getElementById("title").style.marginTop = "-120px";
        document.getElementById("statement").innerHTML = "Bekijk hier de partijen die het beste bij jouw passen:"
        show(bigParties);
        show(secularParties);
        
        if(answers[currentStatement] == subjects[parties].position){
            console.log("hoi");
        }
    
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

    else if(answers[currentStatement] == undefined){
        document.getElementById("nextBtn").style.backgroundColor = "grey";
        document.getElementById("contra2").style.backgroundColor = "red";
        document.getElementById("pro2").style.backgroundColor = "green";
    }
}

//Function die ervoor zorgt dat je een vraag verder gaat en de waarde Pro in de array zet bij de juiste vraag.
function clickAgreedButton(){
    colorButton();
    answers[currentStatement] = "Pro"
    nextStatement();
}

//Function die ervoor zorgt dat je een vraag verder gaat en de waarde Contra in de array zet bij de juiste vraag.
function clickDisagreedButton(){
    colorButton();
    answers[currentStatement] = "Contra"
    nextStatement();
}

//Function die ervoor zorgt dat je een vraag verder gaat en de waarde None in de array zet bij de juiste vraag.
function clickSkipButton(){
    colorButton();
    answers[currentStatement] = "None"
    nextStatement();
}

//Console.log om alle antwoorden terug te vinden in de console.
console.log(answers);

//Function die ervoor zorgt dat je een vraag terug gaat en de blauwe knop van het laatst gegeven antwoord weergeeft.
function clickPrevButton(){
    if(currentStatement > 0){
    currentStatement--
    colorButton();
    title.innerHTML = subjects[currentStatement].title;
    statement.innerHTML = subjects[currentStatement].statement;
    }
}

//Function die ervoor zorgt dat alle partijen waar de size groter dan 10 is laat zien.
function showBigParties(){
    var i = 0;
    parties.forEach(party => {
        if(party.size >= 10){
            var para = document.createElement("P");
            para.innerHTML = party.name;
            para.id = "bigNames" + i;
            document.getElementById("bigPartiesNames").appendChild(para);
            bigParties.onclick = removeBigNames;
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
            secularParties.onclick = removeSecularNames;
        }
        i++;
    });
}

//Function die alle namen van de grote partijen verwijderd als je weer op de "Alleen grote partijen" button klikt.
function removeBigNames(){
    var i = 0;
    parties.forEach(party => {
        if(party.size >= 10){
            var p = document.getElementById("bigNames" + i);
            p.parentNode.removeChild(p);   
        }
    i++; 
    });

    bigParties.onclick = showBigParties;
}


//Functie die alle namen van het beeld verwijderd als je weer op de "Alleen seculare partijen" button klikt.
function removeSecularNames(){
    var i = 0;
    parties.forEach(party => {
        if(party.secular == true){
            var p = document.getElementById("names" + i);
            p.parentNode.removeChild(p);   
        }
    i++; 
    });

    secularParties.onclick = showSecularParties;
} 

