function counterBalance(e){

	// e = Math.floor(Math.random() * 8)
	// d = 68; f = 70; j = 74; k = 75

	if (e == 0) {

		var out = {
			68: 'tri_key',
			70: 'circle_key',
			74: 'blue_key',
			75: 'red_key',
			'top_left': 'shape',
			'top_right': 'color'
		};

		return out;

	} else if (e == 1) {

		var out = {
			70: 'tri_key',
			68: 'circle_key',
			74: 'blue_key',
			75: 'red_key',
			'top_left': 'shape',
			'top_right': 'color',
		};

		return out;

	} else if (e == 2) {
	
		var out = {
			68: 'tri_key',
			70: 'circle_key',
			75: 'blue_key',
			74: 'red_key',
			'top_left': 'shape',
			'top_right': 'color',
		};

		return out;

} else if (e == 3) {

		var out = {
			70: 'tri_key',
			68: 'circle_key',
			75: 'blue_key',
			74: 'red_key',
			'top_left': 'shape',
			'top_right': 'color',
		};

		return out;

} else if (e == 4) {

		var out = {
			74: 'tri_key',
			75: 'circle_key',
			68: 'blue_key',
			70: 'red_key',
			'top_left': 'color',
			'top_right': 'shape',
		};
	
		return out;

} else if (e == 5) {

		var out = {
			75: 'tri_key',
			74: 'circle_key',
			68: 'blue_key',
			70: 'red_key',
			'top_left': 'color',
			'top_right': 'shape',
		};
	
		return out;

} else if (e == 6) {

		var out = {
			74: 'tri_key',
			75: 'circle_key',
			70: 'blue_key',
			68: 'red_key',
			'top_left': 'color',
			'top_right': 'shape',
		};
	
		return out;

} else if (e == 7) {

		var out = {
			75: 'tri_key',
			74: 'circle_key',
			70: 'blue_key',
			68: 'red_key',
			'top_left': 'color',
			'top_right': 'shape',
		};
	
		return out;
	
}
}