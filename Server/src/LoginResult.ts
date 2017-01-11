export class LoginResult {

    constructor(private isUserNameOk:string, private isPasswordOk:string, private isTeacher:boolean){
    }

    public get getUserNameIsOk() {
      return this.isUserNameOk;
    }
    public get getPasswordIsOk() {
      return this.isPasswordOk;
    }
    public get getIsTeacher() {
      return this.isTeacher;
    }
}
