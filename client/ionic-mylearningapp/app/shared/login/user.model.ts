//model class for user of our application
export class User {
  constructor(
    public id : number,
    public username : string,
    public password : string,
    //depending on if user is a teacher or not, he will have different avalaible functions
    public isTeacher : boolean
  ) {}
}
