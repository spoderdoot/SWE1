export class Teacher {

    constructor(private teacherID: number, private tName: string, private tPassword) { };

    public get getTeacherID() {
        return this.teacherID;
    }
    public get getTeacherName() {
        return this.tName;
    }
    public get getTeacherPassword() {
        return this.tPassword;
    }
}
