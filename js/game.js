document.addEventListener('DOMContentLoaded', () => {
    const quizOptions = document.getElementById('quiz-options');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-button');
    const counterElement = document.getElementById('counter');
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');

    let currentQuestionIndex = 0, correctAnswers = 0;

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    document.getElementById('start-quiz-button').addEventListener('click', () => {
        quizOptions.classList.add('hide');
        document.getElementById('quiz-section').classList.remove('hide');
        startQuiz();
    });

    function startQuiz() {
        console.log('Starting state capital quiz');
        quizOptions.classList.add('hide');
        questionContainer.classList.remove('hide');
        nextButton.classList.remove('hide');
        currentQuestionIndex = 0;
        correctAnswers = 0;
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(questions.state[currentQuestionIndex]);
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
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        setStatusClass(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
        });
        if (correct) {
            correctAnswers++;
            updateCounter();
        }
        if (questions.state.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            showPopup('Quiz Completed!');
            quizOptions.classList.remove('hide');
            questionContainer.classList.add('hide');
            nextButton.classList.add('hide');
        }
    }

    function setStatusClass(element, correct) {
        element.classList.remove('correct', 'wrong');
        element.classList.add(correct ? 'correct' : 'wrong');
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

    const questions = {
        state: [
            {
                question: 'What is the capital of California?',
                answers: [
                    { text: 'Sacramento', correct: true },
                    { text: 'Los Angeles', correct: false },
                    { text: 'San Francisco', correct: false },
                    { text: 'San Diego', correct: false }
                ]
            },
            {
                question: 'What is the capital of Texas?',
                answers: [
                    { text: 'Austin', correct: true },
                    { text: 'Houston', correct: false },
                    { text: 'Dallas', correct: false },
                    { text: 'San Antonio', correct: false }
                ]
            },
            // Add more questions here
        ]
    };
});
