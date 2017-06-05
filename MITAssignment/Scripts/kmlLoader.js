function loadKML() {
    var requ = new XMLHttpRequest();
    requ.open('GET', 'https://localhost:44378/testKML.kml');
    requ.onreadystatechange = function () {
        var xmlstring;
        var parser;
        var xmlDoc;
        if (requ.readyState == 4) {
            xmlstring = requ.responseText;

            if (window.DOMParser) {
                parser = new DOMParser();
                xmlDoc = parser.parseFromString(xmlstring, "text/xml");
            }

            var docText = xmlDoc.getElementsByTagName("coordinates")[0].textContent;
            var docAr = docText.split("\n");
            var firstlat;
            var firstlon;
            var lastlat;
            var lastlon;
            var tempAr;
            var altAr = new Array();
            for (var i = 1; i < docAr.length - 1; i++) {
                if (i == 1) {
                    tempAr = docAr[i].split(",");
                    firstlat = tempAr[0];
                    firstlon = tempAr[1];
                }

                if (i == docAr.length - 2) {
                    tempAr = docAr[i].split(",");
                    lastlat = tempAr[0];
                    lastlon = tempAr[1];
                }

                altAr[i] = docAr[i].split(",")[2];
            }

            var highAlt = 0;
            var lowAlt = Number.MAX_VALUE;
            for (i = 0; i < altAr.length; i++) {
                if (highAlt < altAr[i]) {
                    highAlt = altAr[i];
                }

                if (lowAlt > altAr[i]) {
                    lowAlt = altAr[i];
                }
            }

            var divC = document.getElementById("GPXcontent");
            var ulEl = document.createElement("ul");
            var flatli = document.createElement("li");
            var flonli = document.createElement("li");
            var llatli = document.createElement("li");
            var llonli = document.createElement("li");
            var high = document.createElement("li");
            var low = document.createElement("li");

            flatli.appendChild(document.createTextNode("First Latitude - " + firstlat));
            flonli.appendChild(document.createTextNode("First Longitude - " + firstlon));
            llatli.appendChild(document.createTextNode("Last Latitude - " + lastlat));
            llonli.appendChild(document.createTextNode("Last Longitude - " + lastlon));
            high.appendChild(document.createTextNode("Highest Altitude - " + highAlt));
            low.appendChild(document.createTextNode("Lowest Altitude - " + lowAlt));

            ulEl.appendChild(flatli);
            ulEl.appendChild(flonli);
            ulEl.appendChild(llatli);
            ulEl.appendChild(llonli);
            ulEl.appendChild(high);
            ulEl.appendChild(low);

            divC.appendChild(ulEl);
        }


    }
    requ.send();
}