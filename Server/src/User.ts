/**
 * This class defines the user who can log in
 *
 * @author Fernando Francisco Pfennig
 */
export class User {

    /**
     * This constructor defines the user
     * @param  {string} privateid        a unique id for a user
     * @param  {string} privateusername  a unique username
     * @param  {string} privatepassword  the password of the user
     * @param  {string} privateisTeacher set true if the user is a teacher
     */
    constructor(private id: string, private username: string, private password: string, private isTeacher: string) { }

    // Returns the id of a user
    public get getUserID() {
        return this.id;
    }
    // Returns the username of a user
    public get getUserName() {
        return this.username;
    }
    // Returns the password of a user
    public get getUserPassword() {
        return this.password;
    }
    // Returns the status of the user
    public get getIsTeacher() {
        return this.isTeacher;
    }
}
