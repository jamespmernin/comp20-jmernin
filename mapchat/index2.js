function doMapChat() {
			if (navigator.geolocation) {
		    	navigator.geolocation.getCurrentPosition(success);
			}
			else {
				alert("Geolocation is not supported.");
			}
		}

		function success(myPos) {
			var myLat = myPos.coords.latitude;
			var myLng = myPos.coords.longitude;
			sendLoc(myLat, myLng);
		}

		function sendLoc(myLat, myLng) {
			var xhr = new XMLHttpRequest();
			var url = "https://secret-about-box.herokuapp.com/sendLocation";

			var params = "login=KeithRumfelt&lat=" + myLat + "&lng=" + myLng + "&message=Here I am!";

			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		    xhr.send(params);
		    getMap(xhr, url, myLat, myLng);
		}

		function getMap(xhr, url, myLat, myLng) {
			var me = new google.maps.LatLng(myLat, myLng);
			myOptions = {
				zoom: 17,
				center: me,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

			map.panTo(me);
			var image = "icon2.jpg";

			marker = new google.maps.Marker({
				position: me,
				title: "Here I am!",
				icon: image
			});
			marker.setMap(map);

			var infoWindow = new google.maps.InfoWindow();

			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.setContent(marker.title);
				infoWindow.open(map, marker);
			});

			getOthers(xhr, url, myLat, myLng);
		}

		function getOthers(xhr, url, myLat, myLng) {
			xhr.open("GET", url, true);
			var otherLocs = JSON.parse(xhr.responseText);

			for (i = 0; i < otherLocs.length; i++) {
				theirLat = otherLocs[i].lat;
				theirLng = otherLocs[i].lng;

				marker = new google.maps.Marker({
					position: new google.maps.LatLng(theirLat, theirLng),
					title: otherLocs[i].message
				});
				
				marker.setMap(map);

				contentString = "Login: " + otherLocs[i].login + "\nMessage: " + otherLocs[i].message + "\nThis user is " + getDist(myLat, myLng, theirLat, theirLng) + " miles away from you.";

				google.maps.event.addListener(marker, 'click', function(){
					var infoWindow = new google.maps.InfoWindow({
						content: contentString
					});
				});
			}
		}

		function getDist(myLat, myLng, theirLat, theirLng) {
			Number.prototype.toRad = function() {
			   return this * Math.PI / 180;
			};

			var R = 6371; // km 
			var x1 = theirLat-myLat;
			var dLat = x1.toRad();  
			var x2 = theirLng-myLng;
			var dLon = x2.toRad();  
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
			                Math.cos(myLat.toRad()) * Math.cos(theirLat.toRad()) * 
			                Math.sin(dLon/2) * Math.sin(dLon/2);  
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = R * c;

			return d * 0.621371;
		}