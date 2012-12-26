
$(document).ready(function() {

    checkWindowSize();
    var windowWidth;



    function checkWindowSize() {
        $(window).resize(function() {
            windowWidth = $(window).width();
            //$('body').prepend('<div>' + windowWidth + '</div>');

            if(windowWidth < 479) {
                $("#regionMidwest div.bracketColumn3").hide();
                $("#regionMidwest div.bracketColumn4").hide();
                $("#regionMidwest div.bracketColumn5").hide();


            } else {
                $("#regionMidwest div.bracketColumn3").show();
                $("#regionMidwest div.bracketColumn4").show();
                $("#regionMidwest div.bracketColumn5").show();

            }

        });
    }



    $("#arrow_left").bind("click", function() {

    });







});

