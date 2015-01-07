/**
 * This is to translate chat message
 * @param params
 * @param url
 * @param chatImgId
 */
function translate(params, url, chatImgId) {
    $.ajax({
        type: "POST",
        url: "http://api.popc.org/pop_c/popc-api/index.php?do=" + url,
        dataType: "json",
        data: jQuery.parseJSON(params),
        success: function (data) {
            var img = "data:image/jpg;base64," + data['result'];
            var imgElTag = "#"+chatImgId;
            $(imgElTag).attr("src", img)
        }
    });
}

/**
 * This is to send a request to get communities from Pop-c API
 * @param params
 * @param url
 */
function getCommunities(params, url) {
    $.ajax({
        type: "POST",
        url: "http://api.popc.org/pop_c/popc-api/index.php?do=" + url,
        dataType: "json",
        data: jQuery.parseJSON(params),
        success: function (data) {
            var dropDown = $("#comList");
            for (var x in data['result']) {
                var option = "<option value='"+data['result'][x]['id']+"'>"+data['result'][x]['name']+"</option>";
                dropDown.append(option);
            }
        }
    });
}

/**
 * This is find dictionaries by community Id
 * @param params
 * @param url
 */
function getDictionaries(params, url) {
    $.ajax({
        type: "POST",
        url: "http://api.popc.org/pop_c/popc-api/index.php?do=" + url,
        dataType: "json",
        data: jQuery.parseJSON(params),
        success: function (data) {
            var dropDown = $("#dictList");
            dropDown.html("");
            for (var x in data['result']) {
                var option = "<option value='"+data['result'][x]['id']+"'>"+data['result'][x]['name']+"</option>";
                dropDown.append(option);
            }
        }
    });
}