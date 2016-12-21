export class User {

    constructor(private id: number, private uName: string, private uPassword: string) { };

    public get getUserID() {
        return this.id;
    }
    public get getUserName() {
        return this.uName;
    }
    public get getUserPassword() {
        return this.uPassword;
    }
}
