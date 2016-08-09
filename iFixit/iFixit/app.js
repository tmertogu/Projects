var finalUrl = "";
//var queryJSON = "apple";
var queryJSON = document.getElementById('searchText');
var baseUrl = "https://www.ifixit.com/api/2.0";
var sType = "?doctypes=device";
finalUrl = baseUrl + "/suggest/" + queryJSON + sType;
console.log(finalUrl);


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
        console.log('searching for: '+document.getElementById('searchText').value);


    }

    $('#searchText').keyup(function(){
        clearTimeout(timeoutID);
        var $searchText = $(this);
        timeoutID = setTimeout(function () { findDev($searchText.val()); }, 500);

    });

});

$.getJSON(finalUrl,function(json){
    var items = [];
    $.each(json, function(key, value) {
        items.push("<li id='placeholder" + key + "'>" + value + "</li>" );
    });

    $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
    }).appendTo( "body" );

    console.log(json);

});


