function generateStim(stim_color, stim_shape){
		if (stim_shape == 0 & stim_color == 0) { 
			$('#red_triangle').show();
			return {'CO': 'red', 'SH': 'triangle'}
		} 

		if (stim_shape == 0 & stim_color == 1) { 
			$('#blue_triangle').show();
			return {'CO': 'blue', 'SH': 'triangle'}
		} 

		if (stim_shape == 1 & stim_color == 0) { 
			$('#red_circle').show();
			return {'CO': 'red', 'SH': 'circle'}
		} 

		if (stim_shape == 1 & stim_color == 1) { 
			$('#blue_circle').show();
			return {'CO': 'blue', 'SH': 'circle'}
		} 
}

function updateTotalPoints(task_attempt, key_press, key_code, stim, totalPoints, leftpoints, rightpoints){

	var error = 0

	if (task_attempt == 'shape') {
		// if they give an accurate shape response
		if((key_code[key_press] == 'tri_key' & stim.SH == 'triangle') | (key_code[key_press] == 'circle_key' & stim.SH == 'circle')) {
			// check to see what side of the screen the shape task is mapped to
			if (key_code.top_left == 'shape') {
				totalPoints += leftpoints;
			} else totalPoints += rightpoints;
			// end check what side of screen shape task is on
			// if their shape response doesn't match the displayed stimulus
		} else {
			error = 1
		}

	} else {
		// if they give an accurate color response
		if((key_code[key_press] == 'blue_key' & stim.CO == 'blue') | (key_code[key_press] == 'red_key' & stim.CO == 'red')) {
			// check to see what side of the screen the color task is mapped to
			if (key_code.top_left == 'color') {
				totalPoints += leftpoints;
			} else totalPoints += rightpoints;
			// end check what side of screen color task is on
			// if their color response doesn't match the displayed stimulus
		} else {
			error = 1
		}
	}
	

	return [totalPoints, error]
}

function updatePoints_giveLocation(task_attempt, leftpoints, rightpoints, key_code, give_location){
	var response_location = ''
	// if they did the task on the left, then
	if (task_attempt == key_code.top_left) {
		// check what side of the screen shape task is mapped to, if left
		if (!give_location){ // if give location option is false, update the points
			// increase the right side if it's not already above three
			if (rightpoints >= 3){
				rightpoints = 3;
			} else {rightpoints += Math.floor(Math.random()*2);}
			// decrease the left side if it's not already at zero
			if (leftpoints <= 1) {
				leftpoints = 1;
			} else {leftpoints += Math.floor(Math.random()*2) - 1;}
		// if give location is true, only update response location and return it 	
		} else {
			response_location = 'left';
			return response_location
		}

	// otherwise, if the task they did is on the right, do the opposite
	} else {
			if (!give_location){
				
				if (leftpoints >= 3){
					leftpoints = 3;
				} else {leftpoints += Math.floor(Math.random()*2);}
				
				if (rightpoints <= 1) {
					rightpoints = 1;
				} else rightpoints += Math.floor(Math.random()*2) - 1;
				
			} else {
				response_location = 'right'
				return response_location
			}
	}

	return [leftpoints, rightpoints];
}


function send_args(){
	// function for sending the mturk data via url to main script
	var tmpUrl = window.location.href;
	regexS = 'rvts\/(.*)';
	var regex = new RegExp(regexS);
	var match = regex.exec(tmpUrl)[1]
	if (match != '') {
		return 'https://davebraun.org/rvts/run/' + match + '&';
	} else {
		return 'https://davebraun.org/rvts/run/?'
	}
}

function grab_keys(){
	// function for deciphering counterbalance keys from url during main script
	var tmpUrl = window.location.href;
	regexS = '[?&](\\d\\d.*)';
	var regex = new RegExp(regexS);
	key_string = regex.exec(tmpUrl)[1];
	return $.deparam(key_string);
}


function detectmob() {
		// detect mobile device
   if(window.innerWidth <= 800 || window.innerHeight <= 600) {
     return true;
   } else {
     return false;
   }
}


function parseDemos(x) {
	var race = [];
	var holder = [];

	for (foo = 0; foo < x.length; foo++) {
		// if we're dealing with race
		if (foo == 1) {
			// and race has values
			if (x[foo].length > 0) {
				// be ready to parse out more than one value
				for (bar = 0; bar < x[1].length; bar++) {
				race.push(x[foo][bar]['value']);
				}
				// convert it to a flat string
				race = race.toString();
			} else {race = 'na'}
			holder.push(race);
		} else {
			if (x[foo].length > 0) {
				holder.push(x[foo].val());
			} else {holder.push('na')}
		} 
	} // end global for

	return holder;
}