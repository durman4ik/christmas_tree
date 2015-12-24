window.addEventListener('load', onLoad, false);

function onLoad() {
	var mousedown    = false,
		hover        = false,
		dragged      = false,
		drag         = false,
		images       = new Array(),
		image        = null,
		tree         = new Image(),
		tree_img     = 'file:///home/yury/brackets/canvas_game/images/tree.png';
	
	function init() {
		if (!support_canvas) return;
		
		canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
		tree.src = tree_img;
		
		resizeWindow();
		
		setInterval(loop, 50);
	}
	
	function loop() {
		ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
		ctx.drawImage(tree, 891, 33);
		
		if (!check_image() || images.length == 0) {
			disable_inputs();
		} else {
			enable_inputs();
		}
		
		for(var i = 0; i< images.length; i++) {
			ctx.drawImage(images[i].image, images[i].x, images[i].y);
		}
	}
	
	function find_image(x, y) {
		for(var i = 0; i < images.length; i++) {
			if ( x >= (images[i].x) && x <= (images[i].x + images[i].image.width) && y >= (images[i].y) && y <= (images[i].y + images[i].image.height)) {
				return images[i];
			}
		}
		return null;
	}
	
	function draw_image(img, x, y) {
		image = new Cimage();
		image.image = new Image();
		image.image.src = img;
		image.x = x-image.image.width/2;
		image.y = y-image.image.height/2;
		images.push(image);
	}
	
	function Cimage() {
		this.image;
		this.x;
		this.y;
	}
	
	function enable_inputs() {
		$('#info').show();
	}
	
	function disable_inputs() {
		$('#info').hide();
	}
	
	function resizeWindow(evt) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	
	function support_canvas() {
		return Modernizr.canvas;
	}
	
	function check_image() {
		if (typeof image != 'undefined' && image != null) {
			return true;
		} else {
			return false;
		}
	}
		
	

	document.addEventListener('mousedown', onMouseDown);
	document.addEventListener('mouseup', onMouseUp);
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('resize', resizeWindow);
	document.addEventListener('drop', onDrop);
	canvas.addEventListener('dragover', function(evt){ evt.preventDefault();});
	
	$(document).on('mouseover', '.info', onMouseOver);
	$(document).on('mouseleave', '.info', onMouseLeave);
	$(document).on('click', '#remove_image', onRemoveImage);
	
	$(document).on('ondragstart', 'li', function(evt) { drag = true });
	
	function onMouseDown(evt) {
		if (!hover) {
			console.info('x: ' + evt.pageX + '; y: ' + evt.pageY);
			mousedown = true;
			image = find_image(evt.pageX, evt.pageY);
			if (image != null) {
				dragged = true;
				enable_inputs();
			} else {
				dragged = false;
				disable_inputs();
			}
		}
	}
	
	function onMouseUp(evt) {
		mousedown = false;
		dragged = false;
	}
	
	function onMouseMove(evt) {
		if (dragged) {
			image.x = evt.pageX - image.image.width/2;
			image.y = evt.pageY - image.image.height/2;
		}
	}
	
	function onMouseOver() {
		hover = true;
	}
	
	function onMouseLeave() {
		hover = false;
	}
	
	function onRemoveImage(evt) {
		if (check_image()) {
			var index = images.indexOf(image);
			if (index > -1) {
				images.splice(index, 1);
				image = null;
			}
		}
	}
	
	function onDrop(evt) {
		evt.preventDefault();
		draw_image(evt.dataTransfer.getData('URL'), evt.pageX, evt.pageY);
	}
		
    init();
}