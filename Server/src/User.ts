export class User {

    constructor(private id: number, private uName: string, private uPassword: string, private isTeacher: boolean) { };

    public get getUserID() {
        return this.id;
    }
    public get getUserName() {
        return this.uName;
    }
    public get getUserPassword() {
        return this.uPassword;
    }
    public get getIsTeacher() {
      return this.isTeacher;
    }
}
