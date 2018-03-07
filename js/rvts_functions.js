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
			if (leftpoints <= 0) {
				leftpoints = 0;
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
				
				if (rightpoints <= 0) {
					rightpoints = 0;
				} else rightpoints += Math.floor(Math.random()*2) - 1;
				
			} else {
				response_location = 'right'
				return response_location
			}
	}

	return [leftpoints, rightpoints];
}

