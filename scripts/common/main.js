/**
 * Settings for global
 */

//$(document).on("pageinit",function(){
//    //show loading when a link is clicked
//    $('a').click(
//        function(){
//            $.mobile.loading('show', {
//                text: '加载中...', //加载器中显示的文字
//                textVisible: true, //是否显示文字
//                theme: 'b',        //加载器主题样式a-e
//                textonly: false,   //是否只显示文字
//                html: ""           //要显示的html内容，如图片等
//            });
//        }
//    );
//});

/**
 * register page init functions
 */
$(document).on('pagecreate',function(){
    //console.log("pagecreate!!!!")
});
$(document).on('pageinit',function(){
    //var pageId = $('body').pagecontainer('getActivePage').prop('id');
    //console.log("pageinit!!!!id="+pageId);
});
$(document).on('pagecontainershow', function(e, ui) {
    var pageId = $('body').pagecontainer('getActivePage').prop('id');
    switch(pageId){
        case 'index_page':
            initIndexPage();
            break;
        case 'mydata_page':
            initMyDataPage();
            break;
        case 'subindex_page':
            initSubIndexPage();
            break;
        case 'content_page':
            initContentPage();
            break;
        case 'favorite_page':
            initFavoritePage();
            break;
        case 'message_page':
            initMessagePage();
            break;
        case 'article_page':
            initArticlePage();
            break;
    }
});

//$(window).scroll(function() {
//    console.log("拉拉拉拉");
//    //当内容滚动到底部时加载新的内容
//    if ($(this).scrollTop() + $(window).height() + 20 >= $(document).height() && $(this).scrollTop() > 20) {
//        //当前要加载的页码
//        console.log("最底部拉");
//    }
//});

//$(document).on("pagecontainershow",function(){
//        $(document).on("scrollstop", function () {
//            alert("停止滚动！");
//        });
//});

$.fn.isOnScreen = function(){
    var win = $(window);
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left ||
    viewport.left > bounds.right ||
    viewport.bottom < bounds.top ||
    viewport.top > bounds.bottom));

};


