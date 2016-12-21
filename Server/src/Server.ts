/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/body-parser/body-parser.d.ts" />
/// <reference path="Question.ts" />
/// <reference path="DataSource.ts"/>
/// <reference path="OpenDataSource.ts"/>
/// <reference path="OpenQuestion.ts"/>
/// <reference path="MultipleDataSource.ts"/>
/// <reference path="MultipleQuestion.ts"/>
/// <reference path="UserDataSource.ts"/>
/// <reference path="User.ts"/>
/// <reference path="TeacherDataSource.ts"/>
/// <reference path="Teacher.ts"/>
/// <reference path="QuestionDAO.ts" />
/// <reference path="UserDAO.ts" />

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DataSource } from './DataSource';
import { Question } from './Question';
import { OpenDataSource } from './OpenDataSource';
import { OpenQuestion } from './OpenQuestion';
import { MultipleDataSource } from './MultipleDataSource';
import { MultipleQuestion } from './MultipleQuestion';
import { UserDataSource } from './UserDataSource';
import { User } from './User';
import { TeacherDataSource } from './TeacherDataSource';
import { Teacher } from './Teacher';
import { QuestionDAO } from './QuestionDAO';
import { UserDAO } from './UserDAO';

// create server app
const app = express();
const port: number = process.env.PORT || 8080;
const router = express.Router();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// config server app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use('/ila', router);

// start listening
app.listen(port);
console.log('http://127.0.0.1:' + port + '/ila');

// initialize databases
DataSource.getInstance().initDatabase();
// initialize database for open questions
OpenDataSource.getInstance().initOpenDataBase();
// initialize database for multiple choice questions
MultipleDataSource.getInstance().initMultipleDataBase();
// initialize database for users
UserDataSource.getInstance().initUserDataBase();
// initialize database for teachers
TeacherDataSource.getInstance().initTeacherDatabase();

/** REST API **/

// test function
router.get('/', function(req, res) {
    res.json({ "message": 'ILA server is running ...' });
});

// list all available questions -> callback version
router.get('/listQuestions', function(req, res) {
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getAllQuestions(callback);
});

// list all available questions alternative -> callback version
router.get('/listOpQuestions', function(req, res) {
  var callback = function(rows) {
    var response = JSON.stringify(rows);
    console.log("callback executed" + rows);
    res.json(JSON.parse(response));
  }
  QuestionDAO.getOpenQuestions(callback);
});

// get question by id -> callback version
router.get('/question/:id', function(req, res) {
    var id = req.params.id;
    var callback = function(question) {
        var response = JSON.stringify(question);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getQuestionById(id, callback);
});

// create a new question -> implemented using a Promise in QuestionDAO
router.put('/question/create', function(req, res) {
    var jsonQuestion = JSON.parse(JSON.stringify(req.body));
    var question = new Question(jsonQuestion['id'], jsonQuestion['question'], jsonQuestion['answerA'], jsonQuestion['answerB'],
        jsonQuestion['answerC'], jsonQuestion['answerD'], jsonQuestion['correctAnswer']);
    QuestionDAO.createQuestion(question).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    });
});

router.get('/user/listUsers', function(req,res) {
  var id = req.params.id;
  var callback = function(rows) {
    var response = JSON.stringify(rows);
    console.log("callback executed" + rows);
    res.json(JSON.parse(response));
  }
  UserDAO.getUsers(callback);
});
