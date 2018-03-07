/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, document, alert, JSLINT, brackets */
$(document).ready(function() {
    
    $("#searchTerm").keyup(function(event){
    if(event.keyCode == 13){
        $("#search").click();
    }
    });
    
    function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    }

    
    $("#search").click(function() {
        $("#output").empty();
        $(".berryinfo").remove();
        var searchTerm = $("#searchTerm").val();
        //needs to search through the api and pull up the object for the searched term
        //shouldn't pull up anything if it's not the name of a berry
        var searchLower = searchTerm.toLowerCase();
        var searchSplit = searchLower.split(" ");
        if (searchSplit.indexOf("berry") >= 0) {
            var index = searchSplit.indexOf("berry");
            searchSplit.splice(index,1);
        }
        var berryURL = "https://pokeapi.co/api/v2/berry/" + searchSplit;
        //get the data from the api:
        $.getJSON(berryURL, function(result){
            var berryName = result["name"];
            var berryNameCap = capitalizeFirstLetter(berryName);
            var itemURL = result["item"]["url"];

            $.getJSON(itemURL, callbackFuncWithData);
        
            function callbackFuncWithData(data) {
                var spriteURL = data["sprites"]["default"];
                $(".searchbar").after("<div class='berryinfo'><p id='berryname'>" + berryNameCap + " Berry</p><img src='" + spriteURL + "'></div>");
            }

            
        });
    });
    
    $("#usage").click(function() {
        //search bar should stay - other buttons should disappear and be replaced by usage list
    });
    
    $("#flavor").click(function() {
        //search bar should stay - other buttons should disappear and be replaced by flavor list
    });
    
    $("#naturalgift").click(function() {
        //search bar should stay - other buttons should disappear and be replaced by natgift list
        //natgift list should be ordered by type
    });
});