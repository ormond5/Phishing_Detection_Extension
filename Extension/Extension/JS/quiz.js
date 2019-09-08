
// Global variables
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var qImg = document.getElementById("qImg");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");

// Array
let questions = [

    {
        question: "What is it called when phishers target corporate employees?",
        imgSrc: "img/html.png",
        choiceA: "Whaling",
        choiceB: "Sphishing",
        choiceC: "Vishing",
        correct: "A"

    }, {
        question: "What country is most targeted by phishing attacks?",
        // imgSrc: "img/css.png",
        choiceA: "England",
        choiceB: "U.S.A",
        choiceC: "China",
        correct: "B"

    }, {
        question: "Phishing attacks can lead to ransomware?",
        // imgSrc: "img/js.png",
        choiceA: "Maybe",
        choiceB: "No",
        choiceC: "Yes",
        correct: "C"

    },{
        question: "What industry sector has the most phishing attacks?",
        // imgSrc: "img/js.png",
        choiceA: "Financial",
        choiceB: "Entertainment",
        choiceC: "Media",
        correct: "A"
    }, {
        question: "What information does phishing try to acquire?",
        // imgSrc: "img/js.png",
        choiceA: "Usernames and passwords",
        choiceB: "Credit card details",
        choiceC: "Both",
        correct: "C"
    }

];
var lastQuestion = questions.length - 1;
//  Present a question
let runningQuestion = 0;

// Present progress

function renderQuestion() {

    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";

    // qImg.innerHTML = "<img src=" + q.imgSrc + ">";

    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

// render progress

function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
        // Adding an id to the div element. So we can move forward and change to green or red
    }
}

function answerIsCorrect(){
   document.getElementById(runningQuestion).style.backgroundColor = "green";
}
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

// Counter
var questionTime = 10; 
var gaugeWidth = 150;
let count = 0;
var gaugeProgress = gaugeWidth/questionTime; //WIll be incremented by rn 15 px;

function counterRender(){
    if (count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = gaugeProgress * count + "px";
        count++;
    }
    else{
        // Exceed question time
        count = 0; 
        answerIsWrong();
        if (runningQuestion < lastQuestion){
            runningQuestion++; //Move to the next question 
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

let TIMER = setInterval(counterRender ,1000);
let score = 0;
function checkAnswer(answer){
    if (questions[runningQuestion].correct == answer){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    if (runningQuestion < lastQuestion){
        count = 0;
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        // console.log('jfkdsfjaskfn'+ score)
        scoreRender();
    //    Disable button clicks
    }
}


function startQuiz(){
    start.style.display = "none";
    counterRender();
    // TIMER = setInterval(counterRender, 1000);
    renderProgress();
    renderQuestion();
    quiz.style.display = "block";
    $('#back').hide();
    $('#apple').hide();
    $('#Report').hide();
    $('#Fire').hide();



}

function scoreRender(){
    console.log(score)
    // clearInterval(TIMER);
    // scoreDiv.style.display = "block";
    let scorepercent = Math.round(100*score/questions.length);
    // let img = (scorepercent>=80)? "img5"... and so on and so on 
    // https://www.youtube.com/watch?v=49pYIMygIcU&t=2392s
    console.log(scorepercent);
    scoreDiv.style.display ="block"
    let scorecomment = (scorepercent >= 90) ? 'You know your stuff!':
    (scorepercent >= 80) ? 'Not bad! But you can do better!':
    (scorepercent >= 70) ? 'Passing.. but we want excellence!':
    (scorepercent >=60 )? 'I think its time for you to hit the books!':
    'Keep trying and learning! I am sure your score will rise!';

    




    scoreDiv.innerHTML = '<p>You Scored a ' + scorepercent+ '%<br>' + scorecomment+ '<br><br>Reload the extension to continue</p>';
    // $('#misc').html(scorecomment)
    $('#question').hide();
    
    choiceA.style.display = "none";
    choiceB.style.display = "none";
    choiceC.style.display = "none";
     

}


document.addEventListener('DOMContentLoaded', function () {
   
    $('#back').click(function(){
        // clearInterval(TIMER);
        window.open('../HTML/popup.html', '_self');
    });
    
    // $('#retry').click(function(){
    //     timeleft = 10;
    //     var timerID2 = setInterval(countdown, 1000);
        
    // })
    $('#A').click(function(){
        checkAnswer('A');
    });
    $('#B').click(function () {
        checkAnswer('B');
    });
    $('#C').click(function () {
        checkAnswer('C');
    })



    $('#start').click(function () {
        startQuiz();
    });





});
