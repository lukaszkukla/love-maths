// wait for the DOM to finish loading before running the game
// get the button elements and add event listeners to them

document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByTagName('button');

    for(let button of buttons) {
        button.addEventListener('click', function() {
            if(this.getAttribute('data-type') === 'submit') {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        })
    }

    // allows user to submit answer by pressing enter
    document.getElementById('answer-box').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    })

    runGame('addition');
})

/**
 * the main game 'loop', called when the script is first loaded
 * and afte the user's answer has beeen processed
 */
function runGame(gameType) {

    // clears the answer box upon submission
    let answerBox = document.getElementById('answer-box')

    answerBox.value = "";
    answerBox.focus();

    // creates 2 random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25 ) + 1;
    let num2 = Math.floor(Math.random() * 25 ) + 1;

    if (gameType === 'addition') {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'subtraction') {
        displaySubtractionQuestion(num1, num2);
    } else if (gameType === 'multiplication') {
        displayMultiplicationQuestion(num1, num2);
    } else if (gameType === 'division') {
        num1 = num1*num2; // ensures that the 2 numbers are divisble by each other
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`unknown game type: ${gameType}`);
        throw `unknown game type: ${gameType}. aborting!`
    }
}




/**
 * checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert('you got it right');
        incrementScore();
    } else {
        alert(`you answered ${userAnswer}, the correct answer is ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

/**
 * gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the DOM, and returns the correct answer
 */
function calculateCorrectAnswer() {

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if(operator === '+') {
        return [operand1 + operand2, 'addition'];
    } else if(operator === '-') {
        return [operand1 - operand2, 'subtraction'];
    } else if(operator === '*') {
        return [operand1 * operand2, 'multiplication'];
    } else if(operator === '/') {
        return [operand1 / operand2, 'division'];
    } else {
        alert(`unimplemented operator: ${operator}`);
        throw `unimplemented operator: ${operator}. aborting!`;
    }
}

/**
 * gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    let currentScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').innerText = ++currentScore;     
}

/**
 * gets the current value of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    let currentScore = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++currentScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplicationQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '*';
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '/';
}