import { Question, Operation, QuestionType } from "./arithmetic.js";

let question = new Question(QuestionType.Arithmetic, Operation.Addition, 2, 2, 2);

function updateQuestion() {
    let questionElement = document.getElementById("question");
    if (questionElement !== null) {
        questionElement.innerHTML = question.text;
    }

    console.log(questionElement);
}

updateQuestion();