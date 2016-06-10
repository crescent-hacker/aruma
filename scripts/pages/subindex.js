/**
 * Script for subindex page
 */

/**
 * subindex page init
 */
function initSubIndexPage() {
    var cName = $.cookie("menu_name");
    $('title').html(cName);
    $("[data-role='header'] h1").text(cName);
    getSubZone();
};

/**
 * get the secondary menu from server
 */
function getSubZone() {
    var id = $.cookie("menu");
    //show subZone
    var subZone = JSON.parse($.cookie("sub_zone_"+id));
    var subZoneDiv = $(".secondary_menu_zone");
    subZoneDiv.html("");
    $(subZone).each(function(index,content){
        var divContent =
            '<a class="sub_menu_wrapper" href="javascript:void(0)" onclick="goSubZone('+content.ID+')">'+
            '<img class="sub_menu_block" src="'+COMMON_VAR.IMG_PATH+content.home_logo+'" />'+
            '<div class="sub_menu_font text_center">'+content.title+'</div>'+
            '</a>';
        subZoneDiv.append(divContent);
    });
}

/**
 * get subzone data
 */
function goSubZone(id){
    //get Sub SubZone
    $.ajax({
        type: "POST",
        url: COMMON_VAR.ZONE_PATH,
        data: {
            getzones: "JSON",
            zone_index: id
        },
        dataType: "json",
        success: function (data) {
            handleSubZone(data,id);
        },
        error: function (xhr) {
            //通讯错误,使用测试数据(测试父目录和叶子目录两种情况)
            if(id==45)handleSubZone(TEST_JSON.SUB_ZONE_LV_2,id);
            if(id==46)handleSubZone(TEST_JSON.SUB_ZONE_LEAVE,id);
        }
    });
}

/**
 * handle callback
 */
function handleSubZone(data,id) {
    $.cookie("menu",id);
    $.cookie("menu_name",data.title);
    if(data.subzone!="NULL"){
        $.cookie("sub_zone_"+id,JSON.stringify(data.subzone));
        url="subindex.shtml";
        initSubIndexPage();
        return;
    }else{
        $.cookie("art_list_"+id,JSON.stringify(data.artical));
        url="content.shtml";
    }
    COMMON_TOOL.goUrl(url);
}
