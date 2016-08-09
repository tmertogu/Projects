function DeviceItem(name, brand, number){
    this.name = name;
    this.brand = brand;
    this.number = number;
}
var myItem = new DeviceItem("tim", "apple", 88);


var printText = function () {
    console.log(document.getElementById('searchText').value);
}

$(document).ready(function () {
    var timeoutID = null;
    function findDev() {
        var queryText = document.getElementById('searchText').value;
        console.log('searching for: '+queryText);

        var baseUrl = "https://www.ifixit.com/api/2.0";
        var sType = "?doctypes=device";
        var finalUrl = baseUrl + "/suggest/" + queryText + sType;
        console.log(finalUrl);

        $.ajax({
            type: "GET",
            url: finalUrl,
            data: "json",
            success: function (json_obj) {

                console.log(json_obj);

                var output="<ul>";
                for (var i in json_obj.results)
                {
                    console.log(json_obj.results[i].title);
                    output+="<li id='"+i+"'>" + json_obj.results[i].title + ",  "
                                   + json_obj.results[i].summary + "</li>";
                }
                output+="</ul>";

                $('span').html(output);

            },
            dataType: "json"
        });
        
        // $.getJSON(finalUrl,function(json){
        //     var items = [];
        //
        //     $.each(json, function(key, value) {
        //         items.push("<li id='placeholder" + key + "'>" + value + "</li>" );
        //     });
        //
        //     $( "<ul/>", {
        //         "class": "my-new-list",
        //         html: items.join( "" )
        //     }).appendTo( "body" );
        //
        //     console.log(json);
        //     console.log(json.results)
        //
        //
        //     var obj = $.parseJSON(json);
        //     console.log(obj);
        //     //console.log(obj[0].display_title);
        // });

    }

    $('#searchText').keyup(function(){
        clearTimeout(timeoutID);
        var $searchText = $(this);
        timeoutID = setTimeout(function () { findDev($searchText.val()); }, 500);
    });

});



