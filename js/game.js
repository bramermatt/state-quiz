document.addEventListener('DOMContentLoaded', () => {
    quizOptions.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) {
            const quizType = e.target.id.replace('-quiz', '');
            startQuiz(quizType);
        }
    });
});

const quizOptions = document.getElementById('quiz-options');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const counterElement = document.getElementById('counter');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popup-text');

let currentQuestionIndex, correctAnswers;

quizOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const quizType = e.target.id.replace('-quiz', '');
        startQuiz(quizType);
    }
});

function startQuiz(quizType) {
    console.log(`Starting ${quizType} quiz`);
    quizOptions.classList.add('hide');
    questionContainer.classList.remove('hide');
    nextButton.classList.remove('hide');
    currentQuestionIndex = 0;
    correctAnswers = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        correctAnswers++;
        updateCounter();
    }
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showPopup('Quiz Completed!');
        quizOptions.classList.remove('hide');
        questionContainer.classList.add('hide');
        nextButton.classList.add('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showPopup(message) {
    popupText.innerText = message;
    popup.classList.add('show');
    setTimeout(() => {
        popup.classList.remove('show');
    }, 1000);
}

function updateCounter() {
    counterElement.innerText = `Correct Answers: ${correctAnswers}`;
}

const questions = [
    {
        question: 'What is the capital of California?',
        answers: [
            { text: 'Sacramento', correct: true },
            { text: 'Los Angeles', correct: false },
            { text: 'San Francisco', correct: false },
            { text: 'San Diego', correct: false }
        ]
    },
    // Add more questions here
];