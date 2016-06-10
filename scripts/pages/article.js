/**
 * Script for content page
 */

/**
 * init content page
 */
function initArticlePage() {
    $.ajax({
        type: "POST",
        url: COMMON_VAR.ARTICLE_PATH,
        data: {
            get_json:0,
            artical_index:$.cookie("articleId")
        },
        dataType: "json",
        success: function (data) {
            handleArticle(data)
        },
        error: function (xhr) {
            //通讯错误,同源策略问题，使用测试数据
            handleArticle(TEST_JSON.ARTICLE);
        }
    });
};

function handleArticle(data){
    $(".article_zone h2").html(data.title);
    $(".article_zone p").html(data.artical_text);
    $(".article_img").attr("src",COMMON_VAR.IMG_PATH+data.artical_logo);
}

