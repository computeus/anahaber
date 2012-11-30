data = new Array();
labels = new Array();
jsonArray = new Array();

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
    elem.width(($(window).width() / 4));
}

$(document).ready(function () {
    $.ajax({
        type:"GET",
        async:false,
        url:"/pages/get_news?kind=world",
        dataType:"xml",
        success:function (xml) {
            $(xml).find("item").each(function () {
                data.push(parseInt($(this).find("description").text().replace(/(.*?)(\d+)( haber makalesinin .*)/, "$2")));
                labels.push($(this).find("title").text());
            });
        }
    });

    for(i = 0; i < data.length; i++) {
       jsonArray.push({"label":labels[i],"value":data[i]});
    }

    var json_text = JSON.stringify(jsonArray);
    var dataJson = JSON.parse(json_text);

    draw_tree($('#popular'), dataJson);

    $('#health').html(json_text);
//    draw_tree($('#world'), dataJson);
//    draw_tree($('#tech'), dataJson);
//    draw_tree($('#health'), dataJson);
    Treemap.draw("world", $("#world").width(), $(window).height() - 100, data, labels, {'label':{'font-size':'16px'}});

    $(window).smartresize(function () {
        $("#container-first").html('');
        Treemap.draw("world", $("#world").width(), $(window).height() - 100, data, labels);
    });

    $(window).smartresize(function () {
        draw_tree($('#popular'), dataJson);
//        draw_tree($('#world'), dataJson);
//        draw_tree($('#tech'), dataJson);
//        draw_tree($('#health'), dataJson);
    });
});