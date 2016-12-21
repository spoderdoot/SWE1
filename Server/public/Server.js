"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const DataSource_1 = require("./DataSource");
const Question_1 = require("./Question");
const OpenDataSource_1 = require("./OpenDataSource");
const MultipleDataSource_1 = require("./MultipleDataSource");
const UserDataSource_1 = require("./UserDataSource");
const TeacherDataSource_1 = require("./TeacherDataSource");
const QuestionDAO_1 = require("./QuestionDAO");
const UserDAO_1 = require("./UserDAO");
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
DataSource_1.DataSource.getInstance().initDatabase();
OpenDataSource_1.OpenDataSource.getInstance().initOpenDataBase();
MultipleDataSource_1.MultipleDataSource.getInstance().initMultipleDataBase();
UserDataSource_1.UserDataSource.getInstance().initUserDataBase();
TeacherDataSource_1.TeacherDataSource.getInstance().initTeacherDatabase();
router.get('/', function (req, res) {
    res.json({ "message": 'ILA server is running ...' });
});
router.get('/listQuestions', function (req, res) {
    var callback = function (rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    };
    QuestionDAO_1.QuestionDAO.getAllQuestions(callback);
});
router.get('/listOpQuestions', function (req, res) {
    var callback = function (rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    };
    QuestionDAO_1.QuestionDAO.getOpenQuestions(callback);
});
router.get('/question/:id', function (req, res) {
    var id = req.params.id;
    var callback = function (question) {
        var response = JSON.stringify(question);
        res.json(JSON.parse(response));
    };
    QuestionDAO_1.QuestionDAO.getQuestionById(id, callback);
});
router.put('/question/create', function (req, res) {
    var jsonQuestion = JSON.parse(JSON.stringify(req.body));
    var question = new Question_1.Question(jsonQuestion['id'], jsonQuestion['question'], jsonQuestion['answerA'], jsonQuestion['answerB'], jsonQuestion['answerC'], jsonQuestion['answerD'], jsonQuestion['correctAnswer']);
    QuestionDAO_1.QuestionDAO.createQuestion(question).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    });
});
router.get('/user/listUsers', function (req, res) {
    var id = req.params.id;
    var callback = function (rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    };
    UserDAO_1.UserDAO.getUsers(callback);
});
