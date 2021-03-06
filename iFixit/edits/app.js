document.addEventListener("offline", function() {
    alert("No internet connection");
}, false);

var addItem = function (itemID) {
    var listItem = document.getElementById(itemID);

    var name = listItem.id;
    //console.log(name);
    var summary = listItem.getElementsByTagName("p")[0].innerText;
    //console.log(summary);
    var img = listItem.getElementsByTagName("img")[0].currentSrc;
    //console.log(img);
    myGearBag.add(name, summary, img);
    myGearBag.listAll();
};

var rmItem = function (itemID) {
    var listItem = document.getElementById(itemID);
    myGearBag.remove(listItem.id);
    myGearBag.listAll();
};

var removeAll = function () {
    myGearBag.removeAll();
    myGearBag.listAll();
};

var createHTML = function (name, summary, img, i) {
  //console.log("i: "+i);
  var html = "<li class='iDevice' id='"+name+"'>"
            + "<div class='row'>"
              +"<div class='large-4 medium-6 small-12 columns'>"
                + "<img src='"+img+"'>"
              + "</div>"
              + "<div class='large-8 medium-6 small-12 columns'>"
                + "<div class='row'>"
                  + "<div class='medium-10 small-10 columns'>"
                    + "<h4>" + name + "</h4>"
                  + "</div>"
                  + "<div class='medium-2 small-2 columns' id='R'>"
                    + "<h4><button onclick='addItem(this.name)' name='"
                      + name +"' summary='SUM'>&#x2714;"
                    + "</button></h4>"
                  + "</div>"
                + "</div>"
                + "<div class='row'>"
                  + "<div class='medium-12 small-12 columns'>"
                    + " <p>" + summary + "</p>"
                  + "</div>"
                + "</div>"
              + "</div>"
            + "</div>"
          +"</li>";
    return html;
};

var createBagHTML = function (name, img) {
  var html = "<li class='myDevice' id='"+name+"'>"
            + "<div class='row'>"
              + "<div class='medium-10 small-11 columns'>"
                + "<h5>" + name + "</h5>"
              + "</div>"
              + "<div class='medium-2 small-1 columns' id='R'>"
                + "<h5><button onclick='rmItem(this.name)' name='"
                  + name +"'>&#x2716;"
                + "</button></h5>"
              + "</div>"
            + "</div>"
            + "<div class='row'>"
              +"<div class='medium-12 small-12 columns'>"
                + "<img src='"+img+"'>"
              + "</div>"
            + "</div>"
          + "</li>";
    return html;
};

$(document).ready(function () {
    var timeoutID = null;
    function findDev() {
        var queryText = document.getElementById('searchText').value;
        console.log('searching for: '+queryText);

        var baseUrl = "https://www.ifixit.com/api/2.0";
        var finalUrl = baseUrl + "/suggest/" + queryText + "?doctypes=device";
        console.log(finalUrl);

        $.ajax({
            type: "GET",
            url: finalUrl,
            data: "json",
            success: function (json_obj) {
                var output="<ul>";
                var myDev = new iDevice();
                for (var i in json_obj.results) {
                    myDev.name = json_obj.results[i].title;
                    myDev.summary = json_obj.results[i].summary;
                    myDev.img = json_obj.results[i].image.standard;
                    output += createHTML(myDev.name, myDev.summary, myDev.img, i);
                }
                output+="</ul>";
                $('bag').html(output);
            },
            dataType: "json",
            error: function(){
                alert("ERR_INTERNET_DISCONNECTED\n"
                +"Please check your network connection and try again.");
            }
        });

    };

    $('#searchText').keyup(function(){
        clearTimeout(timeoutID);
        var $searchText = $(this);
        timeoutID = setTimeout(function () { findDev($searchText.val()); }, 200);
    });
});
