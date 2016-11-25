/**
 * Demo application WWM - Software Engineering 1 - WS 2016/17
 * University of Applied Sciences Munich
 * author: SCS
 *
 **/
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/body-parser/body-parser.d.ts" />
/// <reference path="Question.ts" />
/// <reference path="DataSource.ts"/>
/// <reference path="QuestionDAO.ts" />

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Question } from './Question';
import { DataSource } from './DataSource';
import { QuestionDAO } from './QuestionDAO';

// create server app
const app = express();
const port:number = process.env.PORT || 8080;
const router = express.Router();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// config server app
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use('/wwm', router);

// start listening
app.listen(port);
console.log('http://127.0.0.1:' + port + '/wwm');

// initialize database
DataSource.getInstance().initDatabase();

/** REST API **/

// test function
router.get('/', function (req, res) {
    res.json({"message": 'WWM server is running ...'});
});

// list all available questions -> callback version
router.get('/listQuestions', function (req, res) {
    var callback = function(rows) {
      var response = JSON.stringify(rows);
      console.log("callback executed" + rows);
      res.json(JSON.parse(response));
    }
    QuestionDAO.getAllQuestions(callback);
});

// get question by id -> callback version
router.get('/question/:id', function (req, res) {
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
    QuestionDAO.createQuestion(question).then((resolve)  => {
      res.json(JSON.parse(resolve.toString()));
    });
});
