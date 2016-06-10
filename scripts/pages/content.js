/**
 * Script for content page
 */

/**
 * init content page
 */
function initContentPage() {
    var cName = $.cookie("menu_name");
    $('title').html(cName);
    $("[data-role='header'] h1").text(cName);

    var menu_id = $.cookie('menu');
    var art_list = $.cookie('art_list_' + menu_id);
    if (!art_list) {
        $("#contentList").html("本专区暂时没有文章");
    } else {
        getContentList(JSON.parse(art_list));
    }
    //when get to the bottom,load next page
    //$(".content_list_zone").on("scrollstop", function () {
    //    var isLoadNextPage = $(".bottom_loading").isOnScreen();
    //    if (isLoadNextPage) {
    //        //TODO,1.load next page by ajax
    //        //TODO,2.add rows to list
    //        //TODO,3.append loading div to bottom again
    //    }
    //});
};

function getContentList(data) {
    var contentList = $("#contentList");
    var content_str = "";
    $.each(data, function (index, content) {
        content_str += "" +
            "<a data-prefetch='false' href='javascript:void(0)' onclick='goArticle(" + content.ID + ")'><li class='content_list_row'>" +
            "<img src='" + COMMON_VAR.IMG_PATH + content.artical_logo + "'>" +
            "<h2>" + content.title + "</h2>" +
            //"<p>" + content.subtitle + "</p>" +
            "</li></a>";
    });
    //content_str += "<li class='bottom_loading'><img src='images/icons/ajax-loader.gif'><span>加载中...</span></li>"
    contentList.html(content_str);

    if(data.length==0){
        contentList.html("本专区暂时没有文章");
    }
}

/**
 * go to article.shtml and loaded by article id
 * @param subMenuId
 */
function goArticle(articleId) {
    $.cookie("articleId", articleId);
    COMMON_TOOL.goUrl(COMMON_TOOL.getAbsPath("article.shtml"));
}