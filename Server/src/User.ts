export class User {

    constructor(private id: string, private username: string, private uPassword: string, private isTeacher: string) { };

    public get getUserID() {
        return this.id;
    }
    public set setUserID(newID: string) {
        this.id = newID;
    }
    public get getUserName() {
        return this.username;
    }
    public get getUserPassword() {
        return this.uPassword;
    }
    public get getIsTeacher() {
        return this.isTeacher;
    }
}
