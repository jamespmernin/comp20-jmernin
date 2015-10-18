var xmlhttp = new XMLHttpRequest();
var url = "data.json";

function parse {

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    var myArr = JSON.parse(xmlhttp.responseText);
	    printOut(myArr);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function printOut(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<p>' + arr[i].content + ' ' + arr[i].username + '</p>';
    }
    document.getElementById("messages").innerHTML = out;
}