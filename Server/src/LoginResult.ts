/**
 * This class defines three booleans which show
 * the result of the log in
 *
 * @author Fernando Francisco Pfennig
 */
export class LoginResult {

    /**
     * This constructor defines a LoginResult with two strings and a boolean
     * @param  {string}  isUserNameOk [is true if the user exists in the user database ]
     * @param  {string}  isPasswordOk [is set to true if the combination of the user with the password exists in the user database]
     * @param  {boolean} isTeacher    [shows the status of the user who wants to log in]
     */
    constructor(private isUserNameOk: string, private isPasswordOk: string, private isTeacher: boolean) {
    }
    // Returns isUserNameOk
    public get getUserNameIsOk() {
        return this.isUserNameOk;
    }
    // Return isPasswordOk
    public get getPasswordIsOk() {
        return this.isPasswordOk;
    }
    // Returns isTeacher
    public get getIsTeacher() {
        return this.isTeacher;
    }
}
