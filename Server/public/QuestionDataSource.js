"use strict";
const sqlite3_1 = require("sqlite3");
class QuestionDataSource {
    constructor() {
        var fs = require("fs");
        var file = 'Questions.db';
        var exists = fs.existsSync(file);
        if (QuestionDataSource.instance) {
            throw new Error("Not available for singletons!");
        }
        QuestionDataSource.instance = this;
        this.db = new sqlite3_1.Database('./Questions.db');
    }
    static getInstance() {
        return QuestionDataSource.instance;
    }
    getQuestionDatabase() {
        return this.db;
    }
    initDataBase() {
        var fs = require("fs");
        var file = 'Questions.db';
        var exists = fs.existsSync(file);
        var sqlite3 = require("sqlite3");
        var questiondb = new sqlite3.Database(file);
        questiondb.serialize(function () {
            if (!exists) {
                questiondb.run("CREATE TABLE Questions (" +
                    "id INTEGER PRIMARY KEY, " +
                    "category TEXT, " +
                    "isMcq TEXT, " +
                    "question TEXT, " +
                    "answerA TEXT, " +
                    "answerB TEXT, " +
                    "answerC TEXT, " +
                    "answerD TEXT, " +
                    "correctAnswer TEXT " +
                    ");");
                questiondb.run("INSERT INTO Questions VALUES (1, 'Mathe', 'true', 'Wie berechnet man die Nullstellen einer Parabel?', 'Mitternachstformel'," +
                    "'Mittagsformel', 'Morgenformel', 'gar nicht', 'Mitternachstformel')");
                questiondb.run("INSERT INTO Questions VALUES (3, 'Mathe', 'false', 'Was ist 3*3', NULL, NULL, NULL, NULL, '9');");
                questiondb.run("INSERT INTO Questions VALUES (2, 'Mathe', 'false', 'Was ist 1+1', NULL, NULL, NULL, NULL, '2');");
                questiondb.run("INSERT INTO Questions VALUES (4, 'Mathe', 'false', 'Was ist Pii (auf zwei Stellen gerundet)?', NULL, NULL, NULL, NULL, '3,14');");
                questiondb.run("INSERT INTO Questions VALUES (5, 'Mathe', 'false', 'Wie hoch ist die Summe aller Winkel in einem Dreieck?', NULL, NULL, NULL, NULL, '180°');");
                questiondb.run("INSERT INTO Questions VALUES (6, 'Mathe', 'false', 'Was ist 14/2?', NULL, NULL, NULL, NULL, '7');");
                questiondb.run("INSERT INTO Questions VALUES (7, 'Mathe', 'false', 'Was ist 5*5?', NULL, NULL, NULL, NULL, '25');");
                questiondb.run("INSERT INTO Questions VALUES (8, 'Mathe', 'false', 'Was ist 7*8', NULL, NULL, NULL, NULL, '56');");
                questiondb.run("INSERT INTO Questions VALUES (9, 'Mathe', 'true', 'Was ist Pii?', 'Eine ganze Zahl', 'Eine irrationale Zahl', 'Eine rationale Zahl', 'Eine natürliche Zahl', 'Eine irrationale Zahl');");
                questiondb.run("INSERT INTO Questions VALUES (10, 'Mathe', 'true', 'Was ist 9*4?','31', '33', '35', '36', '36');");
                questiondb.run("INSERT INTO Questions VALUES (11, 'Mathe', 'true', 'Wie lautet der Satz des Pythagoras?','a²+b²=c²', 'a+b=c', 'a*b=c', 'a²-b²=c²', 'a²+b²=c²');");
                questiondb.run("INSERT INTO Questions VALUES (12, 'Mathe', 'true', 'Was ist (9/3)*9+1?','31', '29', '30', '28', '28');");
                questiondb.run("INSERT INTO Questions VALUES (13, 'Mathe', 'true', 'Was ist (4²/4²)?','1', '0', '2', '0,5', '1');");
                questiondb.run("INSERT INTO Questions VALUES (14, 'Mathe', 'true', 'Was ist (44/2)+8?','31', '33', '30', '32', '30');");
                questiondb.run("INSERT INTO Questions VALUES (15, 'Mathe', 'true', 'Was ist 72/9?','9', '7', '8', '6', '8');");
                questiondb.run("INSERT INTO Questions VALUES (16, 'Englisch', 'false', 'Wie übersetzt man Schule?',NULL, NULL, NULL, NULL, 'school');");
                questiondb.run("INSERT INTO Questions VALUES (17, 'Englisch', 'false', 'Was ist die Hauptstadt von England?',NULL, NULL, NULL, NULL, 'London');");
                questiondb.run("INSERT INTO Questions VALUES (18, 'Englisch', 'false', 'Wie übersetzt man Hose?',NULL, NULL, NULL, NULL, 'trousers');");
                questiondb.run("INSERT INTO Questions VALUES (19, 'Englisch', 'false', 'Wie übersetzt man Schuh?',NULL, NULL, NULL, NULL, 'shoe');");
                questiondb.run("INSERT INTO Questions VALUES (20, 'Englisch', 'false', 'Wie übersetzt man Bild?',NULL, NULL, NULL, NULL, 'picture');");
                questiondb.run("INSERT INTO Questions VALUES (21, 'Englisch', 'false', 'Wie übersetzt man Bibliothek?',NULL, NULL, NULL, NULL, 'library');");
                questiondb.run("INSERT INTO Questions VALUES (22, 'Englisch', 'false', 'Wie übersetzt man Computer?',NULL, NULL, NULL, NULL, 'computer');");
                questiondb.run("INSERT INTO Questions VALUES (23, 'Englisch', 'true', 'Wie wird die Flagge Großbritaniens genannt?','Union Jack', 'British Jack', 'Union Crow', 'Great Jack', 'Union Jack');");
                questiondb.run("INSERT INTO Questions VALUES (24, 'Englisch', 'true', 'Wie schreibt man Klempner auf englisch?','plummer', 'plumer', 'plumber', 'plummber', 'plumber');");
                questiondb.run("INSERT INTO Questions VALUES (25, 'Englisch', 'true', 'Welches land gehört nicht zu Great Britain?','England', 'Nord Irland', 'Wales', 'Schottland', 'Nord Irland');");
                questiondb.run("INSERT INTO Questions VALUES (26, 'Englisch', 'true', 'Wer ist das Staatsoberhaupt des Vereinigten Königreichs?','Queen Elisabeth II', 'King Charles', 'King Harry', 'Queen May', 'Queen Elisabeth II');");
                questiondb.run("INSERT INTO Questions VALUES (27, 'Englisch', 'true', 'Wie übersetzt man Flasche?', 'botle', 'bottle', 'bootle', 'boottle', 'bottle');");
                questiondb.run("INSERT INTO Questions VALUES (28, 'Englisch', 'true', 'Wie übersetzt man Maus?', 'rat', 'mouse', 'mose', 'ratt', 'mouse');");
                questiondb.run("INSERT INTO Questions VALUES (29, 'Englisch', 'true', 'Wie übersetzt man Kugelschreiber?', 'pen', 'pencil', 'biro', 'buro', 'biro');");
                questiondb.run("INSERT INTO Questions VALUES (30, 'Englisch', 'true', 'Wie schreibt man Gehweg auf englisch (british)?', 'pavement', 'sidewalk', 'side walk', 'side-walk', 'pavement');");
            }
        });
    }
}
QuestionDataSource.instance = new QuestionDataSource();
exports.QuestionDataSource = QuestionDataSource;
