/**
 * Script for mydata page
 */

/**
 * init mydata page
 */
function initMyDataPage() {
    getLoginInfo();
};

/**
 * TODO: 1.get login info 2.if not logined, show login and register button
 */
function getLoginInfo() {
    //$.ajax({
    //    type: "POST",
    //    url: webRoot + "/certificate/certificateAction!setCertStatus.action",
    //    data: {
    //        'isValid': isValid,
    //        'ucId': ucId
    //    },
    //    dataType: "json",
    //    success: function (data) {
    //        if (data.success) {
    //            showCertTable();
    //        }
    //        else {
    //            alertNew("提示", "xxxxxxx！", closeMsg);
    //        }
    //    },
    //    error: function (xhr) {
    //        errorAlert(xhr)
    //    }
    //});
    if ($.cookie("isLogin")) {
        $(".register_button").addClass("hidden");
        $(".login_button").addClass("display_none");
        $(".logout_button").removeClass("hidden");
        $(".login_info").removeClass("display_none");
        $(".login_info").html($.cookie("loginInfo"));
    }
}

/**
 * login function
 */
function login() {
    //TODO,1.send a ajax message to server for login.
    //TODO,2.Add login info and logout button
    var uname = $("#userName").val();
    $.ajax({
        type: "POST",
        url: COMMON_VAR.LOGIN_PATH,
        data: {
            username: uname,
            password: $("#pwd").val(),
            verify: $("#captcha").val()
        },
        dataType: "json",
        success: function (data) {
            handleLogin(data, uname)
        },
        error: function (xhr) {
            //通讯错误,同源策略问题，使用测试数据
            handleLogin(TEST_JSON.LOGIN, uname);
        }
    });
}

function handleLogin(data, uname) {
    var retCode = data.return_code;
    if (retCode == 3) {
        $.cookie("isLogin", true);
        $.cookie("loginInfo", uname);
        COMMON_TOOL.goUrl("mydata.shtml");
    }
    if (retCode == 0) {
        $("#popupContent").html("验证码错误！");
        $("#popupBasic").popup("open");
    }
    if (retCode == 1) {
        $("#popupContent").html("用户名/密码错误！");
        $("#popupBasic").popup("open");
    }
    if (retCode == 2) {
        $("#popupContent").html("用户邮件未验证！");
        $("#popupBasic").popup("open");
    }
    if (retCode == 4) {
        $("#popupContent").html("用户被禁止登陆！");
        $("#popupBasic").popup("open");
    }
    if (retCode == 5) {
        $("#popupContent").html("服务器内部错误！");
        $("#popupBasic").popup("open");
    }
}

/**
 * logout function
 */
function logout() {
    //TODO,1.send a ajax message to server for logout. 2.Remove login info and logout button

    //@test
    if ($.cookie("isLogin")) {
        $(".register_button").removeClass("hidden");
        $(".login_button").removeClass("display_none");
        $(".logout_button").addClass("hidden");
        $(".login_info").addClass("display_none");
        $(".login_info").html("");
        $.removeCookie("isLogin");
        $.removeCookie("loginInfo");
    }
}

/**
 * register
 */
function register() {
    $.ajax({
        type: "POST",
        url: COMMON_VAR.REGISTER_PATH,
        data: {
            email: $("#email").val(),
            password: $("#password").val(),
            retypepassword: $("#retypepassword").val(),
            verify: $("#captcha").val()
        },
        dataType: "json",
        success: function (data) {
            handleReg(data)
        },
        error: function (xhr) {
            //通讯错误,同源策略问题，使用测试数据
            handleReg(TEST_JSON.REG);
        }
    });
}

function handleReg(data) {
    if (data.back_code == 0) {
        $("#popupContent").html("验证码错误！");
        $("#popupBasic").popup("open");
    }
    if (data.back_code == 1) {
        $("#popupContent").html("两次输入的密码不相同！");
        $("#popupBasic").popup("open");
    }
    if (data.back_code == 2) {
        $("#popupContent").html("email地址不合法！");
        $("#popupBasic").popup("open");
    }
    if (data.back_code == 3) {
        $("#popupContent").html("E-mail地址已被注册！");
        $("#popupBasic").popup("open");
    }
    if (data.back_code == 4) {
        $("#popupContent").html("验证E-mail已发出，请查看您的邮箱完成E-mail验证！");
        $("#popupBasic").popup("open");
    }
    if (data.back_code == 5) {
        $("#popupContent").html("验证邮件发送失败！");
        $("#popupBasic").popup("open");
    }
    if (data.back_code == 6) {
        $("#popupContent").html("表单填写不完整！");
        $("#popupBasic").popup("open");
    }

}