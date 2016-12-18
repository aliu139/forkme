function loadJSON(path, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);
}

function waitForLoad(path){
    return new Promise(function (resolve, reject) {
        loadJSON(path, function (response) {
            var arr = response.split("\n");
            console.log(arr);
            resolve(arr);
        });
    });
}