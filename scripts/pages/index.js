/**
 * Script for index page
 */

/**
 * init index page
 */
function initIndexPage() {
    var cName = "Aruma";
    $('title').html(cName);
    $("[data-role='header'] h1").text(cName);
    getBlockLink();
}

/**
 * get block link
 */
function getBlockLink() {
    $.ajax({
        type: "POST",
        url: COMMON_VAR.INDEX_PATH,
        data: {
            getmainzone:"JSON"
        },
        dataType: "json",
        success: function (data) {
            if (data.ID) {
                console.log(data);
                setBlockLink(data);
            }
            else {
                //TODO,获取链接信息错误
            }
        },
        error: function (xhr) {
            //通讯错误,同源策略问题，使用测试数据
            setBlockLink(TEST_JSON.INDEX);
        }
    });
}

function setBlockLink(data) {
    var lColumnDiv = $("#left_column");
    var rColumnDiv = $("#right_column");
    var wColumnDiv = $("#whole_column");
    lColumnDiv.html("");
    rColumnDiv.html("");
    wColumnDiv.html("");

    //最后剩余块的排布模式
    var mode = data.length % 4;
    for(var i=0;i<data.length;i++){
        var cell = data[i];
        //4格铺排
        if(mode==0||data.length-i>mode){

            //init
            var shape,arrangement,margin_top="";
            if(i>1) margin_top = "margin_top_0_5_em";
            if(i%4==0){
                shape = "square_block";
                arrangement = "left";
            }
            if(i%4==1){
                shape = "rectangle_block";
                arrangement = "right";
            }
            if(i%4==2) {
                shape = "rectangle_block";
                arrangement = "left";
            }
            if(i%4==3) {
                shape = "square_block";
                arrangement = "right";
            }
            //make content
            var divContent =
                ' <a id="zone_'+cell.ID+'" class="'+shape+' '+cell.top_color+' '+arrangement+' '+margin_top+'" data-prefetch="true" data-transition="none" href="javascript:void(0)">'+
                '<img class="mode_'+(i%4)+'_img" src="'+COMMON_VAR.IMG_PATH+cell.home_logo_mob+'" />'+
                '<span class="mode_'+(i%4)+'_font white_font">'+cell.title+'</span>'+
                '</a>';
            //append content
            if(i%2==0) lColumnDiv.append(divContent);
            if(i%2==1) rColumnDiv.append(divContent);
        }
        //不是4格铺排则按模式1，2，3分别处理
        if(mode==1&&data.length-i<=mode){
            var divContent =
                ' <a id="zone_'+cell.ID+'" class="online_block '+cell.top_color+' left margin_top_0_5_em" data-prefetch="true" data-transition="none" href="javascript:void(0)">'+
                '<img class="mode_5_img" src="'+COMMON_VAR.IMG_PATH+cell.home_logo_mob+'" />'+
                '<span class="mode_5_font white_font">'+cell.title+'</span>'+
                '</a>';
            wColumnDiv.append(divContent);
        }
        if(mode==2&&data.length-i<=mode){
            var divContent =
                ' <a id="zone_'+cell.ID+'" class="online_block '+cell.top_color+' left margin_top_0_5_em" data-prefetch="true" data-transition="none" href="javascript:void(0)">'+
                '<img class="mode_5_img" src="'+COMMON_VAR.IMG_PATH+cell.home_logo_mob+'" />'+
                '<span class="mode_5_font white_font">'+cell.title+'</span>'+
                '</a>';
            wColumnDiv.append(divContent);
        }
        if(mode==3&&data.length-i<=mode){
            var shape,arrangement,margin_top="",s_mode;
            if(i>1) margin_top = "margin_top_0_5_em";
            if(i%4==0){
                shape = "square_block";
                arrangement = "left";
                s_mode="0";
            }
            if(i%4==1){
                shape = "rectangle_block";
                arrangement = "right";
                s_mode="1";
            }
            if(i%4==2) {
                shape = "rectangle_block";
                arrangement = "right";
                s_mode="2";
            }
            var divContent =
                ' <a id="zone_'+cell.ID+'" class="'+shape+' '+cell.top_color+' '+arrangement+' '+margin_top+'" data-prefetch="true" data-transition="none" href="javascript:void(0)">'+
                '<img class="mode_'+s_mode+'_img" src="'+COMMON_VAR.IMG_PATH+cell.home_logo_mob+'" />'+
                '<span class="mode_'+s_mode+'_font white_font">'+cell.title+'</span>'+
                '</a>';
            if(i%4<1) lColumnDiv.append(divContent);
            if(i%4>=1) rColumnDiv.append(divContent);
        }

        //bind event
        $('#zone_'+cell.ID).click(function(){
            var cellId = $(this).attr("id").substr(5);
            //get zone data
            $.ajax({
                type: "POST",
                url: COMMON_VAR.ZONE_PATH,
                data: {
                    getzones:"JSON",
                    zone_index:cellId
                },
                dataType: "json",
                success: function (data) {
                    clickZoneBlock(data,cellId);
                },
                error: function (xhr) {
                    //通讯错误,同源策略问题，使用测试数据
                    if(cellId%2==0) clickZoneBlock(TEST_JSON.NO_SUB_ZONE,cellId);
                    if(cellId%2==1) clickZoneBlock(TEST_JSON.SUB_ZONE_LV_1,cellId);
                }
            });
        });
    }
    //$('#public_service').click()
    //$.cookie('the_cookie', 'the_value', { expires: 7, path: '/' });
}

function clickZoneBlock(data,id){
    $.cookie("menu",id);
    $.cookie("menu_name",data.title);
    if(data.subzone!="NULL"){
        $.cookie("sub_zone_"+id,JSON.stringify(data.subzone));
        url="subindex.shtml";
    }else{
        $.cookie("art_list_"+id,JSON.stringify(data.artical));
        url="content.shtml";
    }
    COMMON_TOOL.goUrl(url);
}


