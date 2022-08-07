export enum Operation {
  Addition = "+",
  Subtraction = "-",
  Multiplication = "*",
  Division = "/"
}

export enum QuestionType {
  Arithmetic = "arithmetic",
  EndNumber = "end number"
}

export class Question {
  type: QuestionType;
  operation: Operation;
  minNbDigits: number;
  maxNbDigits: number;
  numberOfTerms: number;
  numbers: number[];
  text: string = "";
  answer: number = 0;

  constructor(questionType: QuestionType, operation: Operation, minNbDigits: number, maxNbDigits: number, numberOfTerms: number) {
    this.type = questionType;
    this.operation = operation;
    this.minNbDigits = minNbDigits; // minimum number of digits, ex. 2 -> 10
    this.maxNbDigits = maxNbDigits; // maximum number of digits, ex. 2 -> 99
    this.numberOfTerms = numberOfTerms;
    this.numbers = [];
    this.generateQuestion();
    this.getAnswer();
  }

  /**
   * Generates a random number within the bounds of the given min and max, inclusively
   * @param {number} min minimum bound
   * @param {number} max maximum bound
   * @returns a random number within the bounds of the given min and max, inclusively
   */
  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a number to be used in a question within the min and max number of digits specified.
   * @returns a number to be used in a question within the min and max number of digits specified
   */
  private generateQuestionNumber(): number {
    const MAX = 10 ** this.maxNbDigits - 1; // ex. 2 -> 100 -> 99
    const MIN = 10 ** (this.minNbDigits - 1); // ex. 2 -> 1 -> 10

    return this.getRandomNumber(MIN, MAX);
  }

  /**
   * Generates an array of numbers to be used in questions up to the specified number of desired terms.
   * @param {number} n number of desired terms
   * @returns an array of question numbers
   */
  private generateArrayOfQuestionNumbers(n: number = this.numberOfTerms): number[] {
    let arr = [];

    for (let i = 0; i < n; i++) {
      arr.push(this.generateQuestionNumber());
    }

    return arr;
  }

  /**
   * Generates the question and sets all of the attributes of the Question object.
   * @returns the question text
   */
  public generateQuestion(): string {
    switch (this.type) {
      case QuestionType.Arithmetic:
        return this.generateArithmeticQuestion();
      case QuestionType.EndNumber:
        return this.generateEndDigitQuestion();
    }

    // update answer attribute
    this.getAnswer();
  }

  private generateArithmeticQuestion(): string {
    let questionText = "";
    this.numbers = this.generateArrayOfQuestionNumbers();

    for (let i = 0; i < this.numberOfTerms; i++) {
      if (i != this.numberOfTerms - 1) {
        questionText += `${this.numbers[i]} ${this.operation} `;
      } else {
        questionText += `${this.numbers[i]}`;
      }
    }

    this.text = questionText;

    return this.text;
  }

  private generateEndDigitQuestion(): string {
    const D1 = this.generateQuestionNumber();
    const D2 = this.generateQuestionNumber();
    let firstDigit: number, secondDigit: number;
    this.numbers = [];

    if (D1 > D2) {
      firstDigit = D2;
      secondDigit = D1;
    } else {
      firstDigit = D1;
      secondDigit = D2;
    }

    this.numbers.push(firstDigit);
    this.numbers.push(secondDigit);
    this.text = `${firstDigit} ${this.operation} ${secondDigit}`

    return this.text;
  }

  private getEndNumber(): number {
    return 0;
  }

  private getAnswer(): number {
    switch (this.type) {
      case (QuestionType.Arithmetic):
        return this.getArithmeticQuestionAnswer();
      case (QuestionType.EndNumber):
        return 0;
    }

    return 0;
  }

  private getArithmeticQuestionAnswer(): number {
    const ANSWER = eval(this.text);
    this.answer = ANSWER;

    return this.answer;
  }
}
