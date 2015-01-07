/**
 * This is send a translate request to Pop-c API
 * @param params
 * @param url
 */
function translate(params, url) {
    $.ajax({
        type: "POST",
        url: "http://api.popc.org/pop_c/popc-api/index.php?do=" + url,
        dataType: "json",
        data: jQuery.parseJSON(params),
        success: function (data) {
            img = "data:image/jpg;base64," + data['result'];
            imgTag = "<img src=" + img + ">";
            $("#imageDiv").html(imgTag);
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
        url: "http://localhost/pop_c/popc-api/index.php?do=" + url,
        dataType: "json",
        data: jQuery.parseJSON(params),
        success: function (data) {
            var dropDown = $("#comm");
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
        url: "http://localhost/pop_c/popc-api/index.php?do=" + url,
        dataType: "json",
        data: jQuery.parseJSON(params),
        success: function (data) {
            var dropDown = $("#dict");
            dropDown.html("");
            for (var x in data['result']) {
                var option = "<option value='"+data['result'][x]['id']+"'>"+data['result'][x]['name']+"</option>";
                dropDown.append(option);
            }
        }
    });
}