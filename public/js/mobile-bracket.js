
$(document).ready(function() {

    //checkWindowSize();
    //var windowWidth;
    
    if($(window).width() < 767) {
                // switch orientation of brackets to left facing
        $("#regionEast").removeClass("bracketRight").addClass("bracketLeft");


    }



    function checkWindowSize() {
        $(window).resize(function() {
            windowWidth = $(window).width();
           

            var regionEast =  $("#regionEast");

            if(windowWidth < 479) {
                $("#regionMidwest div.bracketColumn3").hide();
                $("#regionMidwest div.bracketColumn4").hide();
                $("#regionMidwest div.bracketColumn5").hide();

                // switch orientation of brackets to left facing
                regionEast.removeClass("bracketRight").addClass("bracketLeft");


            } else {
                $("#regionMidwest div.bracketColumn3").show();
                $("#regionMidwest div.bracketColumn4").show();
                $("#regionMidwest div.bracketColumn5").show();

                // switch orientation of brackets to left facing
                regionEast.removeClass("bracketLeft").addClass("bracketRight");

            }

        });
    }



    $("#arrow_left").bind("click", function() {

    });






});

