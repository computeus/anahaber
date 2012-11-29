$(document).ready(function () {
    data = new Array();
    labels = new Array();

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


    Treemap.draw("container-first", $("#container").width(), $(window).height() - 100, data, labels, {'label':{'font-size':'16px'}});

    $(window).smartresize(function () {
        $("#container-first").html('');
        Treemap.draw("container-first", $("#container").width(), $(window).height() - 100, data, labels);
    });


});