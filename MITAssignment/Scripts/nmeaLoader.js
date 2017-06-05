function loadNMEA() {
    var freq = new XMLHttpRequest();
    freq.open('GET', 'https://localhost:44378/testNMEA.txt');
    freq.onreadystatechange = function () {
        if (freq.readyState == 4) {

            var documentInArray = freq.responseText.split("\n");
            var allSent = new Array();
            var indSent = new Array();
            var ftime;
            var ltime;
            var stats = "";

            for (var i = 0; i < documentInArray.length; i++) {
                allSent[i] = documentInArray[i].split(",")[0];
            }


            for (var j = 0; j < allSent.length; j++) {
                if (indSent.length == 0) {
                    indSent[indSent.length] = allSent[j];
                }
                else
                    if (indSent.indexOf(allSent[j]) == -1) {
                        indSent[indSent.length] = allSent[j];
                    }
            }

            var countAr = new Array();
            countAr.length = indSent.length;

            for (j = 0; j < countAr.length; j++) {
                countAr[j] = 0;
            }

            for (j = 0; j < allSent.length; j++) {
                countAr[indSent.indexOf(allSent[j])]++;
            }





            var gpggaAr = new Array();

            for (j = 0; j < documentInArray.length; j++) {
                if (documentInArray[j].split(",")[0] == "$GPGGA") {
                    gpggaAr[gpggaAr.length] = documentInArray[j].split(",")[1];
                }
            }

            for (j = 0; j < gpggaAr.length; j++) {
                if (j == 0) {
                    ftime = gpggaAr[j];
                }

                if (j == (gpggaAr.length - 1)) {
                    ltime = gpggaAr[j];
                }
            }

            var wpAr = new Array();
            for (j = 0; j < documentInArray.length; j++) {
                if (documentInArray[j].split(",")[0] == "$GPGGA") {
                    wpAr[wpAr.length] = documentInArray[j];
                }
            }

            var rt = document.getElementById('GPXcontent');
            var tbl = document.createElement("table");
            var tblb = document.createElement("tbody");
            var hlat = document.createElement("th");
            var hlon = document.createElement("th");
            var hcount = document.createElement("th");

            tbl.setAttribute("id", "markersTable");
            hlat.appendChild(document.createTextNode("Title"));
            hlon.appendChild(document.createTextNode("Value"));
            hcount.appendChild(document.createTextNode("Count"));

            tblb.appendChild(hlat);
            tblb.appendChild(hlon);
            tblb.appendChild(hcount);

            for (j = 0; j < countAr.length - 1; j++) {
                stats += indSent[j] + ": " + ((countAr[j] / allSent.length) * 100) + "%\n";
            }

            var row;
            var celltitle;
            var cellval;

            for (var i = 0; i < countAr.length - 1; i++) {
                row = document.createElement("tr");
                celltitle = document.createElement("td");
                cellval = document.createElement("td");
                cellcount = document.createElement("td");

                celltitle.appendChild(document.createTextNode("" + indSent[i]));
                cellval.appendChild(document.createTextNode(((countAr[i] / allSent.length) * 100) + "%"));
                cellcount.appendChild(document.createTextNode("" + countAr[i]));

                documentInArray[i].split(",")[0]
                row.appendChild(celltitle);
                row.appendChild(cellval);
                row.appendChild(cellcount);
                tblb.appendChild(row);
            }

            row = document.createElement("tr");
            celltitle = document.createElement("td");
            cellval = document.createElement("td");

            celltitle.appendChild(document.createTextNode("Track Length : "));
            cellval.appendChild(document.createTextNode(calcTrackDist(wpAr, map) + " Km"));

            row.appendChild(celltitle);
            row.appendChild(cellval);

            tblb.appendChild(row);

            //time - first position
            row2 = document.createElement("tr");
            celltitle2 = document.createElement("td");
            cellval2 = document.createElement("td");

            celltitle2.appendChild(document.createTextNode("Time for first position: "));
            cellval2.appendChild(document.createTextNode(ftime));

            row2.appendChild(celltitle2);
            row2.appendChild(cellval2);

            tblb.appendChild(row2);
            //

            //time - last position
            row3 = document.createElement("tr");
            celltitle3 = document.createElement("td");
            cellval3 = document.createElement("td");

            celltitle3.appendChild(document.createTextNode("Time for last position: "));
            cellval3.appendChild(document.createTextNode(ltime));

            row3.appendChild(celltitle3);
            row3.appendChild(cellval3);

            tblb.appendChild(row3);

            tbl.appendChild(tblb);
            rt.appendChild(tbl);
        }
    }

    freq.send();
}

function LonToDeg(lon) {
    lon = lon / 100;
    var tempWholeLon = lon.toString().substring(0, 2);
    var tempPointLon = lon.toString().substring(2);
    tempPointLon = parseFloat(tempPointLon) / 60;

    var result = parseFloat(tempWholeLon) + (tempPointLon * 100);

    return result;
}

function LatToDeg(lat) {
    lat = lat / 100;
    var tempWholeLat = lat.toString().substring(0, 2);
    var tempPointLat = lat.toString().substring(2);
    tempPointLat = parseFloat(tempPointLat) / 60;

    var result = parseFloat(tempWholeLat) + (tempPointLat * 100);

    return result;
}

function calcDist(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var lat1 = lat1 * (Math.PI / 180);
    var lat2 = lat2 * (Math.PI / 180);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}
var checkpoint = 0.25;
function calcTrackDist(wpA, m) {
    var latAr = new Array();
    var lonAr = new Array();
    var dist = parseFloat(0);
    for (var i = 0; i < wpA.length; i++) {
        latAr[i] = parseFloat(wpA[i].split(",")[2]);
        lonAr[i] = parseFloat(wpA[i].split(",")[4]);
    }

    var result = 0;
    marker = new OpenLayers.Layer.Markers("Markers of Path");
    map.addLayer(marker);
    var lat2;
    var lon2;
    var icon;
    for (i = 0; i < wpA.length - 1; i++) {


        //first position
        var pos1Lat = parseFloat(wpA[i].split(",")[2]);
        var pos1Lon = parseFloat(wpA[i].split(",")[4]);

        //second position
        var pos2Lat = parseFloat(wpA[i + 1].split(",")[2]);
        var pos2Lon = parseFloat(wpA[i + 1].split(",")[4]);

        var lat1 = LatToDeg(pos1Lat);
        var lon1 = LonToDeg(pos1Lon);

        lat2 = LatToDeg(pos2Lat);
        lon2 = LonToDeg(pos2Lon);

        if (!isNaN(lat1) && !isNaN(lat2) && !isNaN(lon1) && !isNaN(lon2)) {
            result = result + calcDist(lat1, lon1, lat2, lon2);

            if (result >= checkpoint) {
                size = new OpenLayers.Size(21, 25);
                offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
                icon = new OpenLayers.Icon('js/img/marker.png', size, offset);

                marker.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lon1, lat1), icon));
                checkpoint += 0.25;
            }
        }

        if (i == 0) {
            marker.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lon1, lat1), icon));
        }
    }

    var popUp = AutoSizeFramedCloud;
    var popUpContent = "Total Distance : " + result + "km";
    var ll = new OpenLayers.LonLat(lon2, lat2);

    return result;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}