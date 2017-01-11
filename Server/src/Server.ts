/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/body-parser/body-parser.d.ts" />
/// <reference path="Question.ts" />
/// <reference path="DataSource.ts"/>
/// <reference path="UserDataSource.ts"/>
/// <reference path="User.ts"/>
/// <reference path="Questions.ts"/>
/// <reference path="QuestionDataSource.ts"/>
/// <reference path="QuizRules.ts" />
/// <reference path="QuestionDAO.ts" />
/// <reference path="UserDAO.ts" />
/// <reference path="Category.ts" />

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DataSource } from './DataSource';
import { Question } from './Question';
import { UserDataSource } from './UserDataSource';
import { User } from './User';
import { QuestionDataSource } from './QuestionDataSource';
import { Questions } from './Questions';
import { QuizRules } from './QuizRules';
import { QuestionDAO } from './QuestionDAO';
import { UserDAO } from './UserDAO';
import { Category } from './Category';

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
    QuestionDAO.getQuestions(callback);
});
router.get('/listAllQuestions', function(req, res) {
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getAllQuestions(callback);
});
router.get('/listAllOpenQuestions', function(req, res) {
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getAllOpenQuestions(callback);
});
router.get('/listAllMultipleChoiceQuestions', function(req, res) {
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getAllMultipleChoiceQuestions(callback);
});

router.put('/listQuizQuestions', function(req: any, res) {
    console.log("listQuizQuestions: ");
    var jsonQuiz = JSON.parse(JSON.stringify(req.body));
    console.log(jsonQuiz);
    var quiz = new QuizRules(jsonQuiz['category'], jsonQuiz['numberOfQuestions']);
    console.log(quiz);
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getQuizQuestions(quiz, callback);
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
// get questions by category
router.get('/question/listCategory/', function(req, res) {
    var jsonCategory = JSON.parse(JSON.stringify(req.body));
    console.log(jsonCategory);
    var category = new Category(jsonCategory['category']);
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed " + rows);
        res.json(JSON.parse(response));
    }
    QuestionDAO.getQuestionByCategory(category, callback);
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
// create a new open question
router.put('/openquestion/create', function(req, res) {
    var jsonQuestion = JSON.parse(JSON.stringify(req.body));
    var question = new Questions(jsonQuestion['id'], jsonQuestion['category'], jsonQuestion['isMcq'], jsonQuestion['question'], jsonQuestion['answerA'], jsonQuestion['answerB'],
        jsonQuestion['answerC'], jsonQuestion['answerD'], jsonQuestion['correctAnswer']);
    QuestionDAO.createOpenQuestion(question).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    })
});
// create a new multiple choice question
router.put('/multiplechoicequestion/create', function(req, res) {
    var jsonQuestion = JSON.parse(JSON.stringify(req.body));
    var question = new Questions(jsonQuestion['id'], jsonQuestion['category'], jsonQuestion['isMcq'], jsonQuestion['question'], jsonQuestion['answerA'], jsonQuestion['answerB'],
        jsonQuestion['answerC'], jsonQuestion['answerD'], jsonQuestion['correctAnswer']);
    QuestionDAO.createMultipleChoiceQuestion(question).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    })
})
// create a new user
router.put('/user/create', function(req, res) {
    console.log("Register User: ");
    var jsonUser = JSON.parse(JSON.stringify(req.body));
    console.log(jsonUser);
    var user = new User(jsonUser['id'], jsonUser['username'], jsonUser['password'], jsonUser['isTeacher']);
    console.log(user);
    //  var callback = function(rows) {
    //      var response = JSON.stringify(rows);
    //      console.log("callback executed" + rows);
    //      res.json(JSON.parse(response));
    //  }
    UserDAO.createUser(user).then((resolve) => {
        res.json(JSON.parse(resolve.toString()));
    })
})
router.get('/user/listUsers', function(req, res) {
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed" + rows);
        res.json(JSON.parse(response));
    }
    UserDAO.getUsers(callback);
});
// enables the login of a user
router.post('/user/login/', function(req, res) {
    var jsonUser = JSON.parse(JSON.stringify(req.body));
    console.log(jsonUser);
    var user = new User(jsonUser['id'], jsonUser['username'], jsonUser['password'], jsonUser['isTeacher']);
    console.log(user);
    var callback = function(rows) {
        var response = JSON.stringify(rows);
        console.log("callback executed " + rows);
        res.json(JSON.parse(response));
    }
    UserDAO.loginUser(user, callback);
})
