

class Constant_Store_Procedure {
    
    static Verify_Login( email, password ) {
        return `CALL SP_VERIFY_LOGIN("${email}", "${password}");`;
    }

    static Get_Info_User( email ) {
        return `CALL SP_GET_INFO_USER("${email}");`;
    }

    static Create_User( json ) {
        return `CALL SP_CREATE_USER("${json}");`;
    }

    static Exist_Email( email ) {
        return `CALL SP_EXIST_EMAIL("${email}");`;
    }

    static Create_User_Google( json ) {
        return `CALL SP_CREATE_USER_GOOGLE("${json}");`;
    }

    static Check_Login_Google( email, google_Token ) {
        return `CALL SP_CHECK_LOGIN_GOOGLE("${email}", "${google_Token}");`;
    }

}

module.exports = Constant_Store_Procedure;