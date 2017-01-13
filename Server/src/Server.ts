/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/body-parser/body-parser.d.ts" />
/// <reference path="UserDataSource.ts"/>
/// <reference path="User.ts"/>
/// <reference path="Question.ts"/>
/// <reference path="QuestionDataSource.ts"/>
/// <reference path="QuizRules.ts" />
/// <reference path="QuestionDAO.ts" />
/// <reference path="UserDAO.ts" />
/// <reference path="Category.ts" />

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { UserDataSource } from './UserDataSource';
import { User } from './User';
import { QuestionDataSource } from './QuestionDataSource';
import { Question } from './Question';
import { QuizRules } from './QuizRules';
import { QuestionDAO } from './QuestionDAO';
import { UserDAO } from './UserDAO';
import { Category } from './Category';

// Create server app
const app = express();
const port: number = process.env.PORT || 8080;
const router = express.Router();

// CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// Config server app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use('/ila', router);

// Start listening
app.listen(port);
console.log('http://127.0.0.1:' + port + '/ila');

/** REST API **/

// Gets all available questions
router.get('/listAllQuestions', function(req, res) {
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getAllQuestions(callback);
});
// Gets all open questions
router.get('/listAllOpenQuestions', function(req, res) {
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getAllOpenQuestions(callback);
});
// Gets all multiple choice questions
router.get('/listAllMultipleChoiceQuestions', function(req, res) {
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getAllMultipleChoiceQuestions(callback);
});
// Gets a specific amount of questions from a specific category for a new quiz
router.put('/listQuizQuestions', function(req: any, res) {
    console.log("listQuizQuestions: ");
    var jsonQuiz = JSON.parse(JSON.stringify(req.body));
    console.log(jsonQuiz);
    var quiz = new QuizRules(jsonQuiz['category'], jsonQuiz['numberOfQuestions']);
    console.log("Quiz: " + quiz);
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getQuizQuestions(quiz, callback);
});
// Get question by ids
router.get('/question/getQuestionByID', function(req, res) {
    var jsonID = JSON.parse(JSON.stringify(req.body));
    var arrayID = new Array(jsonID['id']);
    console.log(arrayID);
    var id = arrayID[0];
    console.log(id);
    var callback = function(question) {
        var response = JSON.stringify(question);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getQuestionByID(id, callback);
});
// Get questions by category
router.get('/question/listCategory', function(req, res) {
    var jsonCategory = JSON.parse(JSON.stringify(req.body));
    var category = new Category(jsonCategory['category']);
    console.log(category);
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed " + rows);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getQuestionByCategory(category, callback);
});
// Create a new open question
router.put('/openquestion/create', function(req, res) {
    var jsonQuestion = JSON.parse(JSON.stringify(req.body));
    var question = new Question(jsonQuestion['id'], jsonQuestion['category'], jsonQuestion['isMcq'], jsonQuestion['question'],
        jsonQuestion['answerA'], jsonQuestion['answerB'], jsonQuestion['answerC'], jsonQuestion['answerD'], jsonQuestion['correctAnswer']);
    console.log(question);
    QuestionDAO.createOpenQuestion(question).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    })
});
// Create a new multiple choice question
router.put('/multiplechoicequestion/create', function(req, res) {
    var jsonQuestion = JSON.parse(JSON.stringify(req.body));
    var question = new Question(jsonQuestion['id'], jsonQuestion['category'], jsonQuestion['isMcq'], jsonQuestion['question'],
        jsonQuestion['answerA'], jsonQuestion['answerB'], jsonQuestion['answerC'], jsonQuestion['answerD'], jsonQuestion['correctAnswer']);
    console.log(question);
    QuestionDAO.createMultipleChoiceQuestion(question).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    })
})
// Change an already existing mcq
router.put('/multiplechoicequestion/edit', function(req, res) {
    var jsonQuestion = JSON.parse(JSON.stringify(req.body));
    var question = new Question(jsonQuestion['id'], jsonQuestion['category'], jsonQuestion['isMcq'], jsonQuestion['question'],
        jsonQuestion['answerA'], jsonQuestion['answerB'], jsonQuestion['answerC'], jsonQuestion['answerD'], jsonQuestion['correctAnswer']);
    console.log(question);
    QuestionDAO.updateQuestion(question).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    })
})

// Change an already existing open question
router.put('/openquestion/edit', function(req, res) {
    var jsonQuestion = JSON.parse(JSON.stringify(req.body));
    var question = new Question(jsonQuestion['id'], jsonQuestion['category'], jsonQuestion['isMcq'], jsonQuestion['question'],
        jsonQuestion['answerA'], jsonQuestion['answerB'], jsonQuestion['answerC'], jsonQuestion['answerD'], jsonQuestion['correctAnswer']);
    console.log(question);
    QuestionDAO.updateQuestion(question).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    })
})
// Create a new user
router.put('/user/create', function(req, res) {
    console.log("Register User: ");
    var jsonUser = JSON.parse(JSON.stringify(req.body));
    var user = new User(jsonUser['id'], jsonUser['username'], jsonUser['password'], jsonUser['isTeacher']);
    console.log(user);
    UserDAO.createUser(user).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    })
})
// Lists all users from the database
router.get('/user/listUsers', function(req, res) {
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    }
    UserDAO.getUsers(callback);
});
// Enables the login of a user
router.post('/user/login/', function(req, res) {
    var jsonUser = JSON.parse(JSON.stringify(req.body));
    var user = new User(jsonUser['id'], jsonUser['username'], jsonUser['password'], jsonUser['isTeacher']);
    console.log(user);
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed " + rows);
        res.json(JSON.parse(response));
    }
    UserDAO.loginUser(user, callback);
})
