const Message = require('./message.js');
const Command = require('./command.js');

//not accessing command length? go to spec to look over

class Rover {
   // Write code here!
  constructor(position, mode = 'NORMAL', generatorWatts = 110){
  this.position = position;
  this.mode = mode; 
  this.generatorWatts = generatorWatts;
  //this.results 
	}

	  //const receiveMessage = function(message) {
    receiveMessage(message){
    //let commands;
		let response = {
			message: message.name,
			results: [],
      //commands: message.commands,
		};
    /*if (commands == undefined) {
       return message.name
    } else {*/
		for (let i=0; i< (message.commands).length; i++) {
			if (message.commands[i].commandType === 'STATUS_CHECK') {
				response.results.push({
					completed: true,
					roverStatus: {
						mode: this.mode,
						generatorWatts: this.generatorWatts,
						position: this.position
					}
				});
			} else if (message.commands[i].commandType === 'MODE_CHANGE') {
				this.mode = message.commands[i].value;
				response.results.push({
					completed: true
				});
			} else if (message.commands[i].commandType === 'MOVE') {
				if (this.mode === 'LOW_POWER') {
					response.results.push({
						completed: false
					});
				} else {
					this.position = message.commands[i].value;
					response.results.push({
						completed: true
					});
				}
			} else {
				response.results.push({
					completed: true
				});
			}
		}
    /*console.log(`\nthis is the message name value ${message.name}, this is the command value ${message.commands} this is message as a whole ${message}\n`)*/
		return response;
	}
    }
    //}
    

module.exports = Rover;