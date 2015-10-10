function init() {
	var canvas = document.getElementById('game_canvas');
	var ctx = canvas.getContext('2d');

	var img = new Image();

	img.onload = function() {
		ctx.drawImage(img, 0, 0);
	};
	img.src = 'duckhunt-background.gif';

	var duck1 = new Image();
	duck1.onload = function() {
		ctx.drawImage(duck1, 0, 115, 34, 34, 50, 50, 34, 34);
	};
	duck1.src = 'duckhunt_various_sheet.png';

	var duck2 = new Image();
	duck2.onload = function() {
		ctx.drawImage(duck2, 206, 115, 42, 34, 175, 25, 34, 34);
	}
	duck2.src = 'duckhunt_various_sheet.png';
};
