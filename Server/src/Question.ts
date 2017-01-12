/**
 * This class defines questions which are used for the quiz
 *
 * @author Fernando Francisco Pfennig
 */
export class Question {

    /**
     * This constructor defines a new question
     * @param  {number} id            a unique number for a question
     * @param  {string} category      a category which assigns a question to a specific category
     * @param  {string} isMcq         set true if the question is a multiple choice question
     * @param  {string} question      the question itself
     * @param  {string} answerA       the first answer
     * @param  {string} answerB       the second answer
     * @param  {string} answerC       the third answer
     * @param  {string} answerD       the fourth answer
     * @param  {string} correctAnswer the correct answer
     */
    constructor(private id: number, private category: string, private isMcq: string,
        private question: string, private answerA: string, private answerB: string,
        private answerC: string, private answerD: string, private correctAnswer: string) { }

    // Returns the id of a question
    public get getID() {
        return this.id;
    }
    // Returns the category of a question
    public get getCategory() {
        return this.category;
    }
    // Return the type of question, if it is true the question is a multiple choice question
    public get getType() {
      return this.isMcq;
    }
    // Returns the question
    public get getQuestion() {
        return this.question;
    }
    // Returns the first answer
    public get getAnswerA() {
        return this.answerA;
    }
    // Returns the second answer
    public get getAnswerB() {
        return this.answerB;
    }
    // Returns the third answer
    public get getAnswerC() {
        return this.answerC;
    }
    // Returns the fourth answer
    public get getAnswerD() {
        return this.answerD;
    }
    // Returns the correct answer
    public get getCorrectAnswer() {
        return this.correctAnswer;
    }
}
