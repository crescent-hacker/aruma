/**
 * Script for content page
 */

/**
 * init message page
 */
function initMessagePage() {
    getMessageList();
}

function getMessageList() {
    $.ajax({
        type: "POST",
        url: COMMON_VAR.MSG_PATH,
        data: {},
        dataType: "json",
        success: function (data) {
            handleMsg(data);
        },
        error: function (xhr) {
            //通讯错误,使用测试数据
            console.log("获取消息通讯错误");
            handleMsg(TEST_JSON.MSG);
        }
    });
}

function handleMsg(data) {
    var messageList = $("#messageList");
    var message_str = "";
    $.each(data, function (index, content) {
        message_str += "" +
            "<a data-prefetch='false' href='javascript:void(0)' onclick=goMessage(" + content.id + ",'"+content.bodytext+"')><li class='message_list_row'>" +
            "<h2>" + content.subject + "</h2>" +
            "<p>" + content.senddate + "&nbsp;&nbsp;&nbsp;&nbsp;" +content.from+"&nbsp;&nbsp;&nbsp;&nbsp;"+(content.readstate?"已读":"未读")+"</p>" +
            "</li></a>";
    });
    messageList.html(message_str);
}

/**
 * go to article.shtml and loaded by article id
 * @param subMenuId
 */
function goMessage(messageId,text) {
    $.ajax({
        type: "POST",
        url: COMMON_VAR.MSG_PATH,
        data: {
            select_set:messageId,
            type:1
        },
        dataType: "json",
        success: function (data) {
            console.log("MESSAGE"+messageId+" read.");
        },
        error: function (xhr) {
            //通讯错误,使用测试数据
            console.log("MESSAGE"+messageId+" read error.");
        }
    });
    $("#popupContent").html(text);
    $("#popupBasic").popup("open");
}

