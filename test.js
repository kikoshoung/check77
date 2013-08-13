var gpio = require("pi-gpio"),
	pins = [11, 12, 7, 15],
	pinIndex = 0,
	timer;
pins.reverse();
setPinsIO();
setPinsSignal();
setInterval(setPinsSignal, 0.05);

function getSignal(){
	var res = [0, 0, 0, 0];
	if(pinIndex >= pins.length) pinIndex = 0;
	res[pinIndex] = 1;
	pinIndex++;
//	console.log(res);
	return res;
}

function setPinsIO(){
	for(var i = 0; i < pins.length; i++){
		gpio.open(pins[i], "output");    
	}
}

function setPinsSignal(){
	var signal = getSignal();
	for(var i = 0; i < pins.length; i++){
		gpio.write(pins[i], signal[i]);    
	}
}

function shutdown(){
	for(var i = 0; i < pins.length; i++){
	    gpio.write(pins[i], 0, function(){});
	}
}
