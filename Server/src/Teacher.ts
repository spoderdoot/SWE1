export class Teacher {

    constructor(private id: number, private tName: string, private tPassword) { };

    public get getTeacherID() {
        return this.id;
    }
    public get getTeacherName() {
        return this.tName;
    }
    public get getTeacherPassword() {
        return this.tPassword;
    }
}
