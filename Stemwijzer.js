var answers = [""];
let currentStatement = 0;
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
        var votedByParties = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            subjects.forEach(subject => {
                subject.parties.forEach(partie => {
                    if(answers[i] == partie.position){
                        if(partie.name == "VVD"){
                            votedByParties[0].vvd++;
                        }
                        else if(partie.name == "CDA"){
                            votedByParties[1]++;
                        }
                        else if(partie.name == "pvv"){
                            votedByParties[2]++;
                        }
                        else if(partie.name == "d66"){
                            votedByParties[3]++;
                        }
                        else if(partie.name == "GroenLinks"){
                            votedByParties[4]++;
                        }
                        else if(partie.name == "SP"){
                            votedByParties[5]++;
                        }
                        else if(partie.name == "PvdA"){
                            votedByParties[6]++;
                        }
                        else if(partie.name == "ChristenUnie"){
                            votedByParties[7]++;
                        }
                        else if(partie.name == "Partij voor de Dieren"){
                            votedByParties[8]++;
                        }
                        else if(partie.name == "SGP"){
                            votedByParties[9]++;
                        }
                        else if(partie.name == "DENK"){
                            votedByParties[10]++;
                        }
                        else if(partie.name == "Forum voor Democratie"){
                            votedByParties[11]++;
                        }
                        else if(partie.name == "Lokaal in de Kamer"){
                            votedByParties[12]++;
                        }
                        else if(partie.name == "OndernemersPartij"){
                            votedByParties[13]++;
                        }
                        else if(partie.name == "VNL"){
                            votedByParties[14]++;
                        }
                        else if(partie.name == "Nieuwe Wegen"){
                            votedByParties[15]++;
                        }
                        else if(partie.name == "De Burger Beweging"){
                            votedByParties[16]++;
                        }
                        else if(partie.name == "Piratenpartij"){
                            votedByParties[17]++;
                        }
                        else if(partie.name == "Artikel 1"){
                            votedByParties[18]++;
                        }
                        else if(partie.name == "Libertarische Partij"){
                            votedByParties[19]++;
                        }
                        else if(partie.name == "50Plus"){
                            votedByParties[20]++;
                        }
                        else if(partie.name == "Vrijzinnige Partij"){
                            votedByParties[21]++;
                        }
                        else if(partie.name == "Niet Stemmers"){
                            votedByParties[22]++;
                        }
                    }
                });
            i++;
            }); 

            var j = 0;
            votedByParties.forEach(voted => {
                var paragraph = document.createElement("P");
                paragraph.innerHTML = parties[j].name + ": " + votedByParties[j] + "<br>";
                paragraph.id = "text";
                document.getElementById("bestPartie").appendChild(paragraph);
                j++;    
            });
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
    document.getElementById("bestPartie").style.display = "none"
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
    document.getElementById("bestPartie").style.display = "block"
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
    document.getElementById("bestPartie").style.display = "block"
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

