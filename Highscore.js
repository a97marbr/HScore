/*

----========############========----
						Highscore.js 
----========############========----

Copyright:

Henrik Gustavsson 
henrik.gustavsson@his.se

Marcus Brohede
marcus.brohede@his.se

-------------------------------------------------------------------------------------------
The MIT License (MIT)
-------------------------------------------------------------------------------------------

Copyright (c) 2015 Marcus Brohede

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/


function fetchHighscore(){
	var xmlhttp = new XMLHttpRequest();
	var url = "highscoreservice.php";
	/*
	var range = document.getElementsByName("range");
	var selectedRange;
				
	for(var i = 0; i < range.length; i++) {
	   if(range[i].checked == true) {
	       selectedRange = range[i].value;
	   }
	}
	var json = new Array(document.getElementById('user').value, document.getElementById('pwd').value, selectedRange);
*/
var str = '{"player":"Marcus","score":1500}';
	var params = "params="+ (JSON.stringify(str));

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			console.log(myArr);

			var highscore = myArr.data;
		}
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", params.length);
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.send(params);
}

function submitScore(pname, pscore){
	var xmlhttp = new XMLHttpRequest();
	var url = "highscoreservice.php";
	/*
	var range = document.getElementsByName("range");
	var selectedRange;
				
	for(var i = 0; i < range.length; i++) {
	   if(range[i].checked == true) {
	       selectedRange = range[i].value;
	   }
	}
	var json = new Array(document.getElementById('user').value, document.getElementById('pwd').value, selectedRange);
*/
var str = '{"player":"'+pname+'","score":'+pscore+'}';
	var params = "params="+ str;

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			//console.log(myArr);
			var highscore = myArr.data;
			console.log(highscore);

				//Render highscore
				var str = "<table>";
				str += "<caption>Today's Highscore</caption>";
				str += "<thead><tr><th>Player</th><th>Score</th></thead><tbody>";

				for (var key in highscore) {
					//console.log(key);
					str += "<tr>";
					str += "<td>" + highscore[key].player + "</td>";
					str += "<td>" + highscore[key].score  + "</td>";
					str += "</tr>";
				}

				str += "</table>";
				document.getElementById("highscore").innerHTML = str;

		}
	};
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", params.length);
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.send(params);
}