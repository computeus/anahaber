$(document).ready(function () {
    data = [[60000, 60000, 40000, 30000, 20000, 10000], [60000, 60000, 40000, 30000, 20000, 10000], [60000, 60000, 40000, 30000, 20000, 10000], [60000, 60000, 40000, 30000, 20000, 10000]];
    labels = [["Paris", "London", "New York", "Moscow", "Berlin", "Tokyo"], ["Paris", "London", "New York", "Moscow", "Berlin", "Tokyo"], ["Paris", "London", "New York", "Moscow", "Berlin", "Tokyo"], ["Paris", "London", "New York", "Moscow", "Berlin", "Tokyo"]];

    Treemap.draw("container-first", $("#container").width(), $(window).height() - 100, data, labels);

//    $('#container-first').isotope({
//        itemSelector: '.element',
//        resizable: false,
//        masonry: { columnWidth: $('#container-first').width() / 4 }
//    });
//
    $(window).smartresize(function(){
//        $('#container-first').isotope({
//            masonry: { columnWidth: $('#container-first').width() / 4 }
//        });
        $("#container-first").html('');
        Treemap.draw("container-first", $("#container").width(), $(window).height() - 100, data, labels);
    });
});