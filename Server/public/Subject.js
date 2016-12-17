"use strict";
class Subject {
    constructor(subjectID, subject) {
        this.subjectID = subjectID;
        this.subject = subject;
    }
    get getSubjectID() {
        return this.subjectID;
    }
    get getSubject() {
        return this.subject;
    }
}
exports.Subject = Subject;
