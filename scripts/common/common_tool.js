/**
 * Build up a common tool
 */
var COMMON_TOOL = (function(){
    /**
     * Read a page's GET URL variables and return them as an associative array.
     */
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    /**
     * Translate menu name into chinese
     */
    function getCName(eName){
        var trans_table = {
            'public_service':'公共服务',
            'car':'车',
            'practical_app':'实用软件',
            'travel':'旅行'
        };
        //translate
        var cName = trans_table[eName];

        return (!cName)?eName:cName;
    }

    /**
     * go to url
     */
    function goUrl(url,isReload){
        if(!isReload){
            $.mobile.changePage( url, { transition: "none" });
        }else{
            $.mobile.changePage( url, {reloadPage: true},{ allowSamePageTranstion: true},{ transition: 'none'});
        }
    }

    /**
     * get absolute path
     */
    function getAbsPath(url){
        return $.mobile.path.makeUrlAbsolute( url, COMMON_VAR.DOMAIN );
    }

    /**
     * return interface
     */
    return {
        getUrlVars:getUrlVars,
        getCName:getCName,
        getAbsPath:getAbsPath,
        goUrl:goUrl
    }
}());