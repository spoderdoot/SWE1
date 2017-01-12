"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const User_1 = require("./User");
const Question_1 = require("./Question");
const QuizRules_1 = require("./QuizRules");
const QuestionDAO_1 = require("./QuestionDAO");
const UserDAO_1 = require("./UserDAO");
const Category_1 = require("./Category");
const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use('/ila', router);
app.listen(port);
console.log('http://127.0.0.1:' + port + '/ila');
router.get('/listAllQuestions', function (req, res) {
    var callback = function (rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    };
    QuestionDAO_1.QuestionDAO.getAllQuestions(callback);
});
router.get('/listAllOpenQuestions', function (req, res) {
    var callback = function (rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    };
    QuestionDAO_1.QuestionDAO.getAllOpenQuestions(callback);
});
router.get('/listAllMultipleChoiceQuestions', function (req, res) {
    var callback = function (rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    };
    QuestionDAO_1.QuestionDAO.getAllMultipleChoiceQuestions(callback);
});
router.put('/listQuizQuestions', function (req, res) {
    console.log("listQuizQuestions: ");
    var jsonQuiz = JSON.parse(JSON.stringify(req.body));
    console.log(jsonQuiz);
    var quiz = new QuizRules_1.QuizRules(jsonQuiz['category'], jsonQuiz['numberOfQuestions']);
    console.log("Quiz: " + quiz);
    var callback = function (rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    };
    QuestionDAO_1.QuestionDAO.getQuizQuestions(quiz, callback);
});
router.get('/question/getQuestionByID', function (req, res) {
    var jsonID = JSON.parse(JSON.stringify(req.body));
    console.log(jsonID);
    var arrayID = new Array(jsonID['id']);
    var id = arrayID[0];
    var callback = function (question) {
        var response = JSON.stringify(question);
        res.json(JSON.parse(response));
    };
    QuestionDAO_1.QuestionDAO.getQuestionByID(id, callback);
});
router.get('/question/listCategory', function (req, res) {
    var jsonCategory = JSON.parse(JSON.stringify(req.body));
    console.log(jsonCategory);
    var category = new Category_1.Category(jsonCategory['category']);
    var callback = function (rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed " + rows);
        res.json(JSON.parse(response));
    };
    QuestionDAO_1.QuestionDAO.getQuestionByCategory(category, callback);
});
router.put('/openquestion/create', function (req, res) {
    var jsonQuestion = JSON.parse(JSON.stringify(req.body));
    var question = new Question_1.Question(jsonQuestion['id'], jsonQuestion['category'], jsonQuestion['isMcq'], jsonQuestion['question'], jsonQuestion['answerA'], jsonQuestion['answerB'], jsonQuestion['answerC'], jsonQuestion['answerD'], jsonQuestion['correctAnswer']);
    QuestionDAO_1.QuestionDAO.createOpenQuestion(question).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    });
});
router.put('/multiplechoicequestion/create', function (req, res) {
    var jsonQuestion = JSON.parse(JSON.stringify(req.body));
    var question = new Question_1.Question(jsonQuestion['id'], jsonQuestion['category'], jsonQuestion['isMcq'], jsonQuestion['question'], jsonQuestion['answerA'], jsonQuestion['answerB'], jsonQuestion['answerC'], jsonQuestion['answerD'], jsonQuestion['correctAnswer']);
    QuestionDAO_1.QuestionDAO.createMultipleChoiceQuestion(question).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    });
});
router.put('/multiplechoicequestion/edit', function (req, res) {
    var jsonQuestion = JSON.parse(JSON.stringify(req.body));
    var question = new Question_1.Question(jsonQuestion['id'], jsonQuestion['category'], jsonQuestion['isMcq'], jsonQuestion['question'], jsonQuestion['answerA'], jsonQuestion['answerB'], jsonQuestion['answerC'], jsonQuestion['answerD'], jsonQuestion['correctAnswer']);
    QuestionDAO_1.QuestionDAO.updateQuestion(question).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    });
});
router.put('/openquestion/edit', function (req, res) {
    var jsonQuestion = JSON.parse(JSON.stringify(req.body));
    var question = new Question_1.Question(jsonQuestion['id'], jsonQuestion['category'], jsonQuestion['isMcq'], jsonQuestion['question'], jsonQuestion['answerA'], jsonQuestion['answerB'], jsonQuestion['answerC'], jsonQuestion['answerD'], jsonQuestion['correctAnswer']);
    QuestionDAO_1.QuestionDAO.updateQuestion(question).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    });
});
router.put('/user/create', function (req, res) {
    console.log("Register User: ");
    var jsonUser = JSON.parse(JSON.stringify(req.body));
    console.log(jsonUser);
    var user = new User_1.User(jsonUser['id'], jsonUser['username'], jsonUser['password'], jsonUser['isTeacher']);
    console.log(user);
    UserDAO_1.UserDAO.createUser(user).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    });
});
router.get('/user/listUsers', function (req, res) {
    var callback = function (rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    };
    UserDAO_1.UserDAO.getUsers(callback);
});
router.post('/user/login/', function (req, res) {
    var jsonUser = JSON.parse(JSON.stringify(req.body));
    console.log(jsonUser);
    var user = new User_1.User(jsonUser['id'], jsonUser['username'], jsonUser['password'], jsonUser['isTeacher']);
    console.log(user);
    var callback = function (rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed " + rows);
        res.json(JSON.parse(response));
    };
    UserDAO_1.UserDAO.loginUser(user, callback);
});
