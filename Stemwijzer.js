var answers = [""];
let currentStatement = 0;

var partiesStartNull = 
    { "VVD": 0, "CDA": 0, "PVV": 0, "D66": 0, "GroenLinks": 0, "SP": 0, 
    "PvdA": 0, "ChristenUnie": 0, "Partij voor de Dieren": 0, "SGP": 0,
    "DENK": 0, "Forum voor Democratie": 0, "Lokaal in de Kamer": 0,
    "OndernemersPartij": 0, "VNL": 0, "Nieuwe Wegen": 0, "De Burger Beweging": 0,
    "Piratenpartij": 0, "Artikel 1": 0, "Libertarische Partij": 0, "50Plus": 0,
    "Vrijzinnige Partij": 0, "Niet Stemmers": 0 };
//var partyNames = [subjects[parties].name = 0];

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
const bestPartie = document.getElementById("bestPartie");

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
        document.getElementById("statement").style.marginTop = "110px";
        show(bigParties);
        show(secularParties);

        var i = 0;
            subjects.forEach(subject => {
                subject.parties.forEach(partie => {
                    if(answers[i] == partie.position){
                        partiesStartNull[partie.name]++;
                    }
                });
            i++;
            }); 

        for (var key in partiesStartNull) {
            var elem = document.createElement("p");
            elem.innerHTML = key + ": " + partiesStartNull[key];
            elem.id = "party" + i;
            elem.setAttribute("data-num", partiesStartNull[key]);
            document.getElementById("bestPartie").appendChild(elem);
            i++;
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
    if(answers[currentStatement] == "pro"){
        document.getElementById("pro2").style.backgroundColor = "blue";
        document.getElementById("contra2").style.backgroundColor = "red";
        document.getElementById("nextBtn").style.backgroundColor = "grey";
    }

    else if(answers[currentStatement] == "contra"){
        document.getElementById("contra2").style.backgroundColor = "blue";
        document.getElementById("pro2").style.backgroundColor = "green";
        document.getElementById("nextBtn").style.backgroundColor = "grey";
    }

    else if(answers[currentStatement] == "none"){
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
    answers[currentStatement] = "pro"
    nextStatement();
}

//Function die ervoor zorgt dat je een vraag verder gaat en de waarde Contra in de array zet bij de juiste vraag.
function clickDisagreedButton(){
    colorButton();
    answers[currentStatement] = "contra"
    nextStatement();
}

//Function die ervoor zorgt dat je een vraag verder gaat en de waarde None in de array zet bij de juiste vraag.
function clickSkipButton(){
    colorButton();
    answers[currentStatement] = "none"
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
    document.getElementById("bestPartie").style.display = "none"
    var i = 0;
    parties.forEach(party => {
        if(party.size >= 10){
            for(var key in partiesStartNull){
                if(party.name == key){
                var para = document.createElement("P");
                para.innerHTML = key + ":" + partiesStartNull[key];
                para.id = "bigNames" + i;
                para.setAttribute("data-numbers", partiesStartNull[key]);
                document.getElementById("bigPartiesNames").appendChild(para);
                bigParties.onclick = removeBigNames;
                }
            }
        }
        i++;
    });
}

//Functie die alle partijen laat zien die secular zijn.
function showSecularParties(){
    document.getElementById("bestPartie").style.display = "none"
    var i = 0;
    parties.forEach(party => {
        if(party.secular == true){
            for(var key in partiesStartNull){
                if(party.name == key){
                var para2 = document.createElement("P");
                para2.innerHTML = key + ":" + partiesStartNull[key];
                para2.id = "names" + i;
                para2.setAttribute("data-numbers", partiesStartNull[key]);
                document.getElementById("secularPartiesNames").appendChild(para2);
                secularParties.onclick = removeSecularNames;
                }
            }
        }
        i++;
    });
}

//Function die alle namen van de grote partijen verwijderd als je weer op de "Alleen grote partijen" button klikt.
function removeBigNames(){
    document.getElementById("bestPartie").style.display = "flex"
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
    document.getElementById("bestPartie").style.display = "flex"
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

