// To do [checkboxen voor onderwerpen]
var answers = [""];
let currentStatement = 0;

var partiesStartNull = {};
var countBonusPoints = [""];
var checkboxes = [""];

for(i = 0; i < parties.length; i++){
    partiesStartNull[parties[i].name] = 0;
}

const startBtn = document.getElementById("startBtn");
const none = document.getElementById("next");
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
const bigPartiesNames = document.getElementById("bigPartiesNames");
const bestPartie = document.getElementById("bestPartie");
const skipButton = document.getElementById("skipButtonClass");
const allSubjects = document.getElementById("allSubjects");

const agreedButton = document.getElementById("pro2");
const disagreedButton = document.getElementById("contra2");
const noneButton = document.getElementById("nextBtn");
const skippedButton = document.getElementById("skipButton");

startBtn.onclick = clickStartButton;
none.onclick = clickNoneButton;
agreed.onclick = clickAgreedButton;
disagreed.onclick = clickDisagreedButton;
skipButton.onclick = clickSkipButton;
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
    show(none);
    show(prevBtn);
    show(skipButton);

    agreedButton.classList.add("green", "blue");
    noneButton.classList.add("grey", "blue");
    disagreedButton.classList.add("red", "blue");
}

//Function die ervoor zorgt dat je naar de volgende vraag gaat. Als je vraag 30 hebt geantwoord, worden de best passende partijen laten zien en hoeveel vragen je hetzelfde hebt geantwoord.
function nextStatement(){
    if(currentStatement == 30){
        hide(none);
        hide(skipButton);
        hide(prevBtn);
        hide(agreed);
        hide(disagreed);
        document.getElementById("title").innerHTML = "Partijen"
        document.getElementById("title").style.marginTop = "-120px";
        document.getElementById("statement").innerHTML = "Welke partijen wil je meer gewicht geven?"
        document.getElementById("statement").style.marginTop = "110px";
        chooseExtraPoints();
        ResultsButton();
    }

    else{
        currentStatement++
        title.innerHTML = subjects[currentStatement].title;
        statement.innerHTML = subjects[currentStatement].statement;
    }
}

//Function die alle scores berekend.
function calculateScores(){
    checkboxesChecked();
    bonusPoints();
    var i = 0;
        subjects.forEach(subject => {
            subject.parties.forEach(partie => {
                if(answers[i] == partie.position){
                    partiesStartNull[partie.name]++;
                } 
            });
            i++;
        });

    document.getElementById("statement").innerHTML = "Bekijk hier de partijen die het beste bij jouw passen:"
    show(bigParties);
    show(secularParties);
    showResults();
    destroyChooseExtraPoints();
}

//Function die de resultaten sorteerd.
function sortResults(){
    var sort = document.getElementById("bestPartie"),
    sort2 = document.querySelectorAll("#bestPartie p");
    var sort2Arr = [].slice.call(sort2).sort(function(a, b){
        return b.dataset.number - a.dataset.number;
        });
        
    sort2Arr.forEach(function (p){
        sort.appendChild(p);
    });
}

//Function om alle resultaten in een div op het scherm te laten zien.
function showResults(){
    for (var key in partiesStartNull) {
        var elem = document.createElement("p");
        elem.innerHTML = key + ": " + partiesStartNull[key];
        elem.id = "party" + i;
        elem.setAttribute("data-number", partiesStartNull[key]);
        document.getElementById("bestPartie").appendChild(elem);
        i++;
    }
    sortResults();
}

//Function die ervoor zorgt dat de knop die je geantwoord hebt blauw word en de rest de standaard kleur blijft.
function colorButton(){
    if(answers[currentStatement] == "pro"){
        agreedButton.classList.remove("green");
        disagreedButton.classList.add("red");
        noneButton.classList.add("grey");
        skippedButton.classList.add("white");
    }

    else if(answers[currentStatement] == "contra"){
        disagreedButton.classList.remove("red");
        agreedButton.classList.add("green");
        noneButton.classList.add("grey");
        skippedButton.classList.add("white");
    }

    else if(answers[currentStatement] == " "){
        skippedButton.classList.add("blue");
        agreedButton.classList.add("green");
        noneButton.classList.add("grey");
        disagreedButton.classList.add("red");
    }

    else if(answers[currentStatement] == "none"){
        noneButton.classList.remove("grey");
        agreedButton.classList.add("green");
        disagreedButton.classList.add("red");
        skippedButton.classList.add("white");
    }

    else if(answers[currentStatement] == undefined){
        agreedButton.classList.add("green");
        disagreedButton.classList.add("red");
        noneButton.classList.add("grey");
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

//Function die ervoor zorgt dat je een vraag verder gaat en niks in de array zet bij de juiste vraag.
function clickSkipButton(){
    colorButton();
    answers[currentStatement] = " ";
    nextStatement();
}

//Function die ervoor zorgt dat je een vraag verder gaat en de waarde None in de array zet bij de juiste vraag.
function clickNoneButton(){
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
    destroyChooseExtraPoints;
    }
}

//Function die ervoor zorgt dat alle partijen waar de size groter dan 10 is laat zien.
function showBigParties(){
    secularPartiesNames.classList.remove("d-flex");
    secularPartiesNames.style.display = "none";
    bigPartiesNames.style.display = "flex";
    document.getElementById("bestPartie").style.display = "none"
    statement.innerHTML = "Bekijk hier de grote partijen:";
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
                secularParties.onclick = showSecularParties;
                }
            }
        }
        i++;
    });
}

//Functie die alle partijen laat zien die secular zijn.
function showSecularParties(){
    secularPartiesNames.classList.add("d-flex");
    bigPartiesNames.style.display = "none";
    document.getElementById("bestPartie").style.display = "none"
    statement.innerHTML = "Bekijk hier de seculiere partijen:";
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
    statement.innerHTML = "Bekijk hier de partijen die het beste bij jouw passen:";
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
    statement.innerHTML = "Bekijk hier de partijen die het beste bij jouw passen:";
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

//Function die een extra punt geeft bij de behorende checkbox.
function bonusPoints(){
    var i = 0;
    subjects.forEach( subject => {
        countBonusPoints.forEach( extraPoint => {
            if( subject.title == extraPoint.id ){
                subject.parties.forEach( partie => {
                    if(answers[i] == partie.position){
                        partiesStartNull[partie.name]++;
                    } 
                });
            }
        });
        i++;
    });
}

//Function die de checkboxen aanmaakt.
function chooseExtraPoints(){
    subjects.forEach(subject => {
        var checkbox = document.createElement('input'); 
        checkbox.type = "checkbox"; 
        checkbox.name = "name"; 
        checkbox.value = "value"; 
        checkbox.className = "checkBoxes";
        checkbox.id = subject.title ; 

        var label = document.createElement('label');
        label.htmlFor = subject.title; 
        label.id = "label";
        label.innerHTML = subject.title;

        allSubjects.appendChild(checkbox); 
        allSubjects.appendChild(label);
    });

}

//Function die de result button maakt.
function ResultsButton(){
    var btn = document.createElement('button');
    btn.id = "resultsButton";
    btn.innerHTML = "results";
    btn.onclick = calculateScores;

    allSubjects.appendChild(btn);
}

//Function die kijkt welke checkboxen geselecteerd zijn.
function checkboxesChecked(){
    checkboxes = document.querySelectorAll('input[type=checkbox]');
    for (var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked == true){
            countBonusPoints.push(checkboxes[i]);
            console.log(countBonusPoints);
        }
    }
}

//Function die de checkboxen verwijderd.
function destroyChooseExtraPoints(){
    while (allSubjects.firstChild) {
        allSubjects.removeChild(allSubjects.lastChild);
      }
}