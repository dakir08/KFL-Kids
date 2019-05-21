const questionArray = {
    0: ["Highest scoring goalie?"],
    1: ["jerrie or jerry?"],
    2: ["How are you still alive?"],
    3: ["Who is Dumbledore?"],
    4: ["What is Gamora?"],
};
const questions = {
    0: ["Ronnie", "Deal", "Ronnie", "Ronnie"],
    1: ["Nolan", "Deal", "Ronnie", "Ronnie"],
    2: ["Jekyl", "Deal", "Ronnie", "Ronnie"],
    3: ["Hyde", "Deal", "Ronnie", "Ronnie"],
    4: ["Ronan", "Deal", "Ronnie", "Ronnie"],
};
var three;
var two;
var one;
var i = 0;
var itemOne = 0;
var itemTwo = 1;
var itemThree = 2;
var answers = [];
var questionsAnswered = 0;
var answerCounter = 0;
var j = 0;

function getValue(str) {
    var answerMe = str;
    answers.push(answerMe);

    if(answerMe === questions[j][3]){
        console.log("yes");
        answerCounter++;
        j++;
    }else {
        j++;
    }
    console.log(answerCounter);

    console.log("this is the value getting pushed in " + answerMe);
    questionsAnswered++;

    var lengthy = Object.keys(questions).length;
    console.log(lengthy);

    if(questionsAnswered === lengthy){
        checkAnswers();
    }
    else {

        showQuestion();
    }


}

function showQuestion()
{
        document.getElementById("counting").innerHTML = "Quiz Time!";
        document.getElementById("buttonOne").value = questions[i][0];
        document.getElementById("buttonTwo").value = questions[i][itemTwo];
        document.getElementById("buttonThree").value = questions[i][itemThree];
        document.getElementById("questionFor").innerHTML = questionArray[i];
        document.getElementById("score").innerHTML = "B";
        one = document.getElementById("opOne").innerHTML = questions[i][itemOne];
        two = document.getElementById("opTwo").innerHTML = questions[i][itemTwo];
        three = document.getElementById("opThree").innerHTML = questions[i][itemThree];
        i++;
}

function checkAnswers() {

    console.log(answers);

    console.log(questions[1][3]);
    var Scored = questionArray.length;
    Scored = Scored/2;



    var contOne = document.getElementById("cContainer");
    contOne.parentNode.removeChild(contOne);
    var contTwo = document.getElementById("aContainer");
    contTwo.parentNode.removeChild(contTwo);
    document.getElementById("score").innerHTML = "Score";
    var buttonTwoResolve = document.getElementById("buttonTwo");
    if(answerCounter >= Scored){
        document.getElementById("counting").innerHTML = "YEY!";
        document.getElementById("questionFor").innerHTML = "You have passed! congratulations";
    }
    else {
        document.getElementById("counting").innerHTML = "Sorry";
        document.getElementById("questionFor").innerHTML = "You have failed better luck next time";
    }
    buttonTwoResolve.remove();
    document.getElementById("opTwo").innerHTML = answerCounter;
    console.log(answerCounter);

}

window.onload = function ()
    {

        if(questionsAnswered === 5){
            checkAnswers();
        }
        else {
            showQuestion();
        }

    };




