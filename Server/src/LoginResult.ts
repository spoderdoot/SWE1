export class LoginResult {

    constructor(private userNameIsOk:string, private passwordIsOk:string, private isTeacher:boolean){
    }

    public get getUserNameIsOk() {
      return this.userNameIsOk;
    }
    public get getPasswordIsOk() {
      return this.passwordIsOk;
    }
    public get getIsTeacher() {
      return this.isTeacher;
    }
}
