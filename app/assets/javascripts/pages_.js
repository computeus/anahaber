function draw_tree(elem, dataJson) {
    set_width(elem);
    set_height(elem);
    elem.treemap(
        dataJson
    , {
        nodeClass: function(node, box){
            if(node.value <= 50){
                return 'minor';
            }
            return 'major';
        }
    });
}

function set_height(elem) {
    elem.height(($(window).height() - 100) / 2);
}

function set_width(elem) {
    elem.width(($(window).width()));
}

function get_news(kind) {
    data = new Array();
    labels = new Array();
    jsonArray = new Array();

    $.ajax({
        type:"GET",
        async:false,
        url:"/pages/get_news?kind=" + kind,
        dataType:"xml",
        success:function (xml) {
            $(xml).find("item").each(function () {
                data.push(parseInt($(this).find("description").text().replace(/(.*?)(\d+)( haber makalesinin .*)/, "$2")));
                labels.push('<a href="' + $(this).find("link").text() + '" target="_blank">' + $(this).find("title").text() + "</a>");
            });
        }
    });

    for(i = 0; i < data.length; i++) {
        jsonArray.push({"label":labels[i],"value":data[i]});
    }

    var json_text = JSON.stringify(jsonArray);
    var dataJson = JSON.parse(json_text);

    draw_tree($('#' + kind), dataJson);

    $(window).smartresize(function () {
        draw_tree($('#' + kind), dataJson);
    });
}

$(document).ready(function () {
    get_news('world');
    get_news('national');
    get_news('economics');
    get_news('science');
});