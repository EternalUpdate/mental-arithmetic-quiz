import { Question, Operation, QuestionType } from "./arithmetic.js";

// handle question
let question = new Question(QuestionType.Arithmetic, Operation.Addition, 2, 2, 2);
let submitInstructionSection = document.getElementById("submitInstruction");
let resultSection = document.getElementById("result");
let answeredCorrectly = false;
const input = document.getElementById("input") as HTMLInputElement | null;

updateQuestion();

// handle input
input?.addEventListener('keydown', (event) => {
    // pressed Enter
    if (event.key === "Enter") {
        if (!answeredCorrectly) {
            if (resultSection != null) {
                // correct answer
                if (parseInt(input.value) == question.answer) {
                    resultSection.innerHTML = "Correct!";
                    answeredCorrectly = true;
                    resultSection.style.color = "var(--blue-green)";

                    if (submitInstructionSection != null) {
                        submitInstructionSection.innerHTML = "Press any key to continue";
                    }
                } else {
                    // wrong answer
                    resultSection.innerHTML = `Wrong! The right answer is ${question.answer}`;
                    resultSection.style.color = "var(--red)";
                }
            }      
        } else {
            // pressed Enter again after a correct answer
            updateQuestion();
        }
    } else {
        // pressed another key
        if (answeredCorrectly) {
            updateQuestion();
        }
    }
})


function updateQuestion() {
    console.log("update");
    answeredCorrectly = false;
    question.generateQuestion();
    console.log(`text: ${question.text} answer: ${question.answer}`)
    let questionElement = document.getElementById("question");

    if (questionElement !== null) {
        questionElement.innerHTML = question.text;
    }

    if (submitInstructionSection != null) {
        submitInstructionSection.innerHTML = "Press 'Enter' to submit";
    }

    if (input != null) {
        input.value = "";
    }

    if (resultSection != null) {
        resultSection.innerHTML = "";
    }
}