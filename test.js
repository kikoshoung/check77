var gpio = require("pi-gpio"),
	pins = [11, 12, 13, 14],
	pinIndex = 0,
	timer;

// setInterval(setPin, 500);
setPin();

function setPin(){
	var currentPin = pins[pinIndex];
	gpio.open(currentPin, "output", function(err) {       
	    gpio.write(currentPin, 1, function() {            
	        gpio.close(currentPin);
	        timer = setTimeout(function(){
	        	pinIndex++;
	        	if(pinIndex > 3) pinIndex = 0;
	        	setPin();
	        }, 500);        
	    });
	});

}
