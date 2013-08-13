var gpio = require("pi-gpio"),
	pins = [11, 12, 13, 15],
	pinIndex = 0,
	timer;

setPinsIO();
setPinsSignal();
setInterval(setPinsSignal, 500);

function getSignal(){
	var res = [0, 0, 0, 0];
	if(pinIndex >= pins.length) pinIndex = 0;
	res[pinIndex] = 1;
	pinIndex++;
	// console.log(res);
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
