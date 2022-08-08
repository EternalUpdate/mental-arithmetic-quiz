import { Question, Operation, QuestionType } from "./arithmetic.js";
// settings
let settings = {
    questionType: QuestionType.Arithmetic,
    operation: Operation.Addition,
    nbOfTerms: 2,
    minNbDigits: 2,
    maxNbDigts: 2
};
// get shared elements
let submitInstructionSection = document.getElementById("submitInstruction");
let resultSection = document.getElementById("result");
let quizContainer = document.getElementsByClassName("quiz-container");
let answeredCorrectly = false;
const answerInput = document.getElementById("answerInput");
// handle question
let question = new Question(settings.questionType, settings.operation, settings.nbOfTerms, settings.minNbDigits, settings.maxNbDigts);
updateQuestion();
// handle input
answerInput?.addEventListener('keydown', (event) => {
    // pressed Enter
    if (event.key === "Enter") {
        if (!answeredCorrectly) {
            if (resultSection != null) {
                // correct answer
                if (parseInt(answerInput.value) == question.answer) {
                    resultSection.innerHTML = "Correct!";
                    answeredCorrectly = true;
                    resultSection.style.color = "var(--blue-yellow)";
                    fadeIn(resultSection);
                    if (submitInstructionSection != null) {
                        submitInstructionSection.innerHTML = "Press any key to continue";
                    }
                }
                else {
                    // wrong answer
                    resultSection.innerHTML = `Wrong! The right answer is ${question.answer}`;
                    resultSection.style.color = "var(--red)";
                    fadeIn(resultSection);
                }
            }
        }
        else {
            // pressed Enter again after a correct answer
            updateQuestion();
        }
    }
    else {
        // pressed another key
        if (answeredCorrectly) {
            updateQuestion();
        }
    }
});
// handle settings
const settingsButton = document.getElementById("settings");
settingsButton?.addEventListener("click", () => {
    // fade in / out animations
    settingsButton.classList.toggle("active");
    if (quizContainer != null) {
        quizContainer[0].classList.toggle("hidden");
    }
    const allSettingsContainer = document.getElementsByClassName("all-settings");
    if (allSettingsContainer != null) {
        allSettingsContainer[0].classList.toggle("hidden");
    }
    if (settingsButton.classList.contains("active")) {
        fadeOut(quizContainer[0]);
        fadeIn(allSettingsContainer[0]);
    }
    else {
        fadeOut(allSettingsContainer[0]);
        fadeIn(quizContainer[0]);
    }
});
/**
 * Updates the question text.
 */
function updateQuestion() {
    console.log("update");
    answeredCorrectly = false;
    question.generateQuestion();
    console.log(`text: ${question.text} answer: ${question.answer}`);
    let questionElement = document.getElementById("question");
    if (questionElement !== null) {
        questionElement.innerHTML = question.text;
    }
    if (submitInstructionSection != null) {
        submitInstructionSection.innerHTML = "Press 'Enter' to submit";
    }
    if (answerInput != null) {
        answerInput.value = "";
    }
    if (resultSection != null) {
        resultSection.innerHTML = "";
    }
}
/**
 * Fades in a given HTMLElement.
 * @param element the element to fade in
 */
function fadeIn(element) {
    element.animate({ opacity: [0, 1] }, { duration: 500,
        fill: "forwards"
    });
}
/**
 * Fades out a given HTMLElement.
 * @param element the element to fade in
 */
function fadeOut(element) {
    element.animate({ opacity: [1, 0] }, { duration: 500,
        fill: "forwards"
    });
}
