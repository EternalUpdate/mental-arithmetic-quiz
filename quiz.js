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
let quizContainer = document.getElementsByClassName("quiz-container")[0];
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
const settingsSaveButton = document.getElementById("settings-save-button");
// handle settings – animations
settingsButton?.addEventListener("click", () => {
    settingsAnimate();
});
// handle settings – logic
settingsSaveButton?.addEventListener("click", () => {
    // TODO: question type function
    changeQuestionType();
    changeOperationType();
    changeNumberOfTerms();
    changeMinNumberOfDigits();
    changeMaxNumberOfDigits();
    updateQuestion();
    settingsAnimate();
    console.log(`op: ${question.operation} nbTerms: ${question.numberOfTerms} minNbDigits: ${question.minNbDigits} maxNbDigits: ${question.maxNbDigits}`);
});
/**
 * Changes the question's type to the type selected in the settings dropdown.
 * @returns the new question type as a string or an empty string if it fails
 */
function changeQuestionType() {
    const questionTypesDropdown = document.getElementsByName("operationTypes")[0];
    if (questionTypesDropdown != null) {
        switch (questionTypesDropdown.value) {
            case ("arithmetic"):
                question.type = QuestionType.Arithmetic;
                break;
            case ("end number"):
                question.type = QuestionType.EndNumber;
                break;
        }
        return questionTypesDropdown?.value;
    }
    return "";
}
/**
 * Changes the question's operation type to the type selected in the settings dropdown.
 * @returns the new operation type as a string or an empty string if it fails
 */
function changeOperationType() {
    const operationTypesDropdown = document.getElementsByName("operationTypes")[0];
    if (operationTypesDropdown != null) {
        switch (operationTypesDropdown.value) {
            case ("addition"):
                question.operation = Operation.Addition;
                break;
            case ("subtraction"):
                question.operation = Operation.Subtraction;
                break;
            case ("multiplication"):
                question.operation = Operation.Multiplication;
                break;
            case ("division"):
                question.operation = Operation.Division;
                break;
        }
        return operationTypesDropdown?.value;
    }
    return "";
}
/**
 * Changes the question's number of terms to the number specified in the settings input.
 * @returns the question's new number of terms or -1 if it fails
 */
function changeNumberOfTerms() {
    const numberOfTermsInput = document.getElementsByName("number of terms")[0];
    if (numberOfTermsInput != null) {
        const newNumber = parseInt(numberOfTermsInput.value);
        if (!isNaN(newNumber)) {
            question.numberOfTerms = newNumber;
            return newNumber;
        }
    }
    return -1;
}
/**
 * Changes the question's minimum mumber of digits to the number specified in the settings input.
 * @returns the question's new minimum number of digits or -1 if it fails
 */
function changeMinNumberOfDigits() {
    const minNumDigitsInput = document.getElementsByName("minimum number of digits")[0];
    if (minNumDigitsInput != null) {
        const newNumber = parseInt(minNumDigitsInput.value);
        if (!isNaN(newNumber)) {
            question.minNbDigits = newNumber;
            return newNumber;
        }
    }
    return -1;
}
/**
 * Changes the question's maximum mumber of digits to the number specified in the settings input.
 * @returns the question's new maximum number of digits or -1 if it fails
 */
function changeMaxNumberOfDigits() {
    const maxNumDigitsInput = document.getElementsByName("maximum number of digits")[0];
    if (maxNumDigitsInput != null) {
        const newNumber = parseInt(maxNumDigitsInput.value);
        if (!isNaN(newNumber)) {
            question.maxNbDigits = newNumber;
            return newNumber;
        }
    }
    return -1;
}
/**
 * Updates the question text.
 */
function updateQuestion() {
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
/**
 * Animates the fading in and out of the settings component.
 */
function settingsAnimate() {
    const settingsButton = document.getElementById("settings");
    const settingsSaveButton = document.getElementById("settings-save-button");
    const allSettingsContainer = document.getElementsByClassName("all-settings")[0];
    if (settingsButton != null) {
        settingsButton.classList.toggle("active");
        if (settingsButton.classList.contains("active")) {
            fadeOut(quizContainer);
            fadeIn(allSettingsContainer);
            if (settingsSaveButton != null) {
                fadeIn(settingsSaveButton);
            }
        }
        else {
            fadeOut(allSettingsContainer);
            fadeIn(quizContainer);
            if (settingsSaveButton != null) {
                fadeOut(settingsSaveButton);
            }
        }
    }
    if (quizContainer != null) {
        quizContainer.classList.toggle("hidden");
    }
    if (allSettingsContainer != null) {
        allSettingsContainer.classList.toggle("hidden");
    }
    if (settingsSaveButton != null) {
        settingsSaveButton.classList.toggle("hidden");
    }
}
// TEST
let testQ = new Question(QuestionType.Arithmetic, Operation.Division, 2, 2, 3);
console.log(testQ.generateArithmeticDivisionNumbers());
