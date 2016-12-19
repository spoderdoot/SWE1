export class User {

    constructor(private userID: number, private uName: string, private uPassword: string) { };

    public get getUserID() {
        return this.userID;
    }
    public get getUserName() {
        return this.uName;
    }
    public get getUserPassword() {
        return this.uPassword;
    }
}
