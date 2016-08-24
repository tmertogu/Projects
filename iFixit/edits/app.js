document.addEventListener("offline", function() {
    alert("No internet connection");
}, false);

var addItem = function (itemID) {
    var listItem = document.getElementById(itemID);
    myGearBag.showHide(listItem.name, "TRUE");
    myGearBag.listAll();
};

var rmItem = function (itemID) {
    var listItem = document.getElementById(itemID);
    myGearBag.showHide(listItem.name, "FALSE");
    myGearBag.listAll();
};

var removeAll = function () {
    myGearBag.removeAll();
    myGearBag.listAll();
};

var createHTML = function (name, summary, img) {
    var html = "<li class='iDevice' >"
              + "<button id='"+name+"' onclick='addItem(this.id)' name='"+name+"'>"
                + "<div class='row'>"
                  +"<div class='medium-4 columns'>"
                    + "<img id='i' src='"+img+"'>"
                  + "</div>"
                  + "<div class='medium-8 columns'>"
                    + "<div class='row'>"
                      + "<div class='medium-8 columns'>"
                        + "<h4 id='i'>" + name + "</h4>"
                      + "</div>"
                      + "<div class='medium-4 columns'>"
                        + "<div id='addRM'>&#x2714;</div>"
                      + "</div>"
                    + "</div>"
                    + "<div class='row'>"
                      + "<div class='medium-12 columns'>"
                        + " <p>" + summary + "</p>"
                        + "<p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
                           + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
                           + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"
                           + "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>"
                      + "</div>"
                    + "</div>"
                  + "</div>"
                + "</div>"
              +"</button></li>";
    return html;
};

var createBagHTML = function (name, img) {
  var html = "<li class='myDevice' >"
            + "<button id='"+name+"' onclick='rmItem(this.id)' name='"+name+"'>"
              + "<div class='row'>"
                + "<div class='medium-12 columns'>"
                  + "<div class='medium-8 columns'>"
                    + "<h5>" + name + "</h5>"
                  + "</div>"
                  + "<div class='medium-4 columns end'>"
                    + "<div id='addRM'>&#x2716;</div>"
                  + "</div>"
                + "</div>"
              + "</div>"
              + "<div class='row'>"
                +"<div class='medium-12 columns'>"
                  + "<img src='"+img+"'>"
                + "</div>"
              + "</div>"
            +"</button></li>";
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
                    output += createHTML(myDev.name, myDev.summary, myDev.img);
                    myGearBag.add(myDev.name, myDev.summary, myDev.img);
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
