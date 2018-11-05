function generateStim(stim_color, stim_shape){

	[stim_color, stim_shape] = [Math.floor(Math.random() * 2), Math.floor(Math.random() * 2)];

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
			error = 1;
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
			error = 1;
		}
	}
	

	return [totalPoints, error]
}

function updatePoints(task_attempt, leftpoints, rightpoints, key_code){
	var response_location = '';
	// if they did the task on the left, then

	if (task_attempt == key_code.top_left) {
		// check what side of the screen shape task is mapped to, if left
		rightpoints = Math.min(rightpoints += Math.floor(Math.random()*2), 3)
		leftpoints = Math.max(leftpoints += Math.floor(Math.random()*2) - 1, 1)
			
	// otherwise, if the task they did is on the right, do the opposite
	} else {
			leftpoints = Math.min(leftpoints += Math.floor(Math.random()*2), 3)
			rightpoints = Math.max(rightpoints += Math.floor(Math.random()*2) - 1, 1)	
	}
	return [leftpoints, rightpoints];
}

function giveLocation(task_attempt, key_code) {
	if (task_attempt == key_code.top_left) {
		return 'left'
	} else return 'right'
}


function send_args(dest, development){
	// function for sending the mturk data via url to main script
	if (development) {return dest + '/?';
	} else {
		var tmpUrl = window.location.href;
		// match only mturk params
		regexS = '\\?(.*.com)';
		var regex = new RegExp(regexS);
		
		try {
			var match = regex.exec(tmpUrl)[1]
			return dest + '/?' + match + '&';
		} 
		catch (err) {
			return dest + '/?';
		}
	}
}

function parse_url(){
	// function for deciphering counterbalance keys from url during main script
	// a better way of implementing this function is here: https://html-online.com/articles/get-url-parameters-javascript/
	// but i think ill stick with the ugly version for now

	var tmpUrl = window.location.href;
	
	// first grab the key code
	key_code_re = '[?&](\\d\\d.*)&cc';
	var regex = new RegExp(key_code_re);
	key_code = $.deparam(regex.exec(tmpUrl)[1]);

	// next grab condition code
	condition_code_re = '[?&](cc.*)&';
	var regex = new RegExp(condition_code_re);
	condition_code = $.deparam(regex.exec(tmpUrl)[1]);
	// convert string (pseudo boolean) to true boolean
	condition_code = (condition_code['cc'] == 'true')

	// next grab time
	time_code_re = '[?&](time.*)';
	var regex = new RegExp(time_code_re);
	time_code = $.deparam(regex.exec(tmpUrl)[1])['time'];
	
	return [key_code, condition_code, time_code];
}

function grabBase(s){
	// takes in the url and returns just the base
	regex = new RegExp('^(.*?[^\/]\/)[\/]');
	return regex.exec(s)[1];
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

function taskAttempt_transition(e, key_code, trial, last_response){
	// takes as input the button that was pushed (as string), trial number, and last_response (if trial == 1, last_response = '')
	// returns list [task_attempt, transition]

	var task_attempt = '';

	// code task attempt
	if (key_code[e] == 'tri_key' | key_code[e] == 'circle_key') {
		task_attempt = 'shape';
	} else if (key_code[e] == 'blue_key' | key_code[e] == 'red_key') {
		task_attempt = 'color';
	}

	var transition = 'StartBlock';

	// code transition
	if (trial != 1) {
		if (task_attempt == last_response) {
			transition = 'Repeat';
		} else transition = 'Switch';
	}
	return [String(task_attempt), String(transition)];
}


// SPECIFIC TO CUED TASK SWITCHING

function randomCue() {
	// outputs a string for the cue that directly faces the client
	if (Math.random() > .5){ return 'Shape'
	} else return 'Color';
}

function randomTiming() {
	// outputs a string for the cue that directly faces the client
	if (Math.random() > .5){ var holder = [1000, 100];
	} else var holder = [100, 1000];
	return holder;
}

function isOver(trial, trial_threshold){
	if (trial == trial_threshold) {
		return true;
	} else return false;
}


function locationAndError(task_attempt, key_press, key_code, stim, cue){
	// takes as input the attempted task, the actual key that was pressed, the key code dict, the stimulus that was presented, and the cue
	// returns an array containing the response location ('left' or 'right') and whether or not the trial was an error (0, 1)
	var error = 0;

	if (task_attempt == 'shape') {
		// if they attempt the shape task

		// if the cue was color, it's an error
		if (cue == 'Color') {
			error = 1;
		// otherwise, if they pressed an incorrect shape key given the shape stimulus, it's an error
		} else if ((key_code[key_press] == 'tri_key' & stim.SH != 'triangle') | (key_code[key_press] == 'circle_key' & stim.SH != 'circle')) {
			error = 1;
		} 

	}	else {
		// if they attempt the color task

		// if the cue was shape, it's an error
		if (cue == 'Shape') {
			error = 1;
		// otherwise, if they pressed an incorrect color key given the stimulus, it's an error
		} else if ((key_code[key_press] == 'blue_key' & stim.CO != 'blue') | (key_code[key_press] == 'red_key' & stim.CO != 'red')){
			error = 1;
		} 
	}

	if (task_attempt == key_code.top_left) {
		response_location = 'left';
	} else {
		response_location = 'right';
	}
	
	return [response_location, error]
}

function registerId(development){
	// posts a blank text file to server as a way of recording IDs who at least started the experiment

	var curId = (IsOnTurk())? GetAssignmentId() : prompt("Doesn't look like you are on Turk, so you are probably testing." + 
			"Enter an ID to save your data with:", "id");

	var dataToServer = {
		'curId': curId,
		'experiment': 'rvtsSwitchExperiments',
		'sessionCode': 'init',
		'current_data': 'Worker ID: ' + GetWorkerId()
	}

	$.post(
		url = development? '../cgi-bin/save_data.py' : '../../cgi-bin/save_data.py',
		data = dataToServer
		)
}


function reverseDict(d){

	var dOut = {}

	for (i = 0; i < Object.keys(d).length; i++) {
		dOut[Object.values(d)[i]] = Object.keys(d)[i]
	}

	return dOut

}