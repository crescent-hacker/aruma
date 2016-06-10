/**
 * Script for content page
 */

/**
 * init favorite page
 */
function initFavoritePage() {
    getFavoriteList();
};

function getFavoriteList() {
    $.ajax({
        type: "POST",
        url: COMMON_VAR.FAVOR_PATH,
        data: {
            get_json:0
        },
        dataType: "json",
        success: function (data) {
            handleFavorite(data.favourite)
        },
        error: function (xhr) {
            //通讯错误,同源策略问题，使用测试数据
            handleFavorite(TEST_JSON.SUB_ZONE_LEAVE.artical);
        }
    });
}

function handleFavorite(data){
    var favoriteList = $("#favoriteList");
    var favorite_str = "";
    $.each(data, function (index, content) {
        favorite_str += "" +
            "<a data-prefetch='false' href='javascript:void(0)' onclick='goArticle("+content.ID+")'><li class='content_list_row'>" +
            "<img src='" + COMMON_VAR.IMG_PATH+content.artical_logo + "'>" +
            "<h2>" + content.title + "</h2>" +
            //"<p>" + content.subtitle + "</p>" +
            "</li></a>";
    });
    favoriteList.html(favorite_str);
}

function goArticle(articleId){
    $.cookie("articleId",articleId);
    COMMON_TOOL.goUrl(COMMON_TOOL.getAbsPath("article.shtml"));
}
