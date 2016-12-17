export class Subject {

  constructor(private subjectID: number, private subject: string){}

  public get getSubjectID(){
    return this.subjectID;
  }

  public get getSubject(){
    return this.subject;
  }
}
