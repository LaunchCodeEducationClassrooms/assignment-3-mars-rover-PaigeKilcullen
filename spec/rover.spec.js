const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!
  // Test 7 
  it('constructor sets position and default values for mode and generatorWatts', function() {
    let rover = new Rover(10)
    let roverArray = [rover.position, rover.mode, rover.generatorWatts];
    let defaultArray = [10, 'NORMAL', 110];
    expect(roverArray).toEqual(defaultArray);
  });
  //test 8 
  it('response returned by receiveMessage contains name of message', function() {
    let commands = new Command("command")
    let message = new Message('This is a message!', commands);
    let rover = new Rover(10);
    expect(rover.receiveMessage(message).message).toEqual('This is a message!');
  });
  //test 9
  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(10);
    let response = rover.receiveMessage(message);
    //expect(rover.receiveMessage(message).commands.length).toEqual(commands.length);
    //results is now the direct response to the commands array
     expect(response.results.length).toEqual(2);
  });
  //test 10 
  it('responds correctly to status check command', function() {
    let commands = new Command('STATUS_CHECK');
    let message = new Message('Status Check Message', commands);
    let rover = new Rover(10);
    let response = rover.receiveMessage(message);
    //let roverStatus = rover.receiveMessage(message).results;
    //let roverArray = [rover.position, rover.mode, rover.generatorWatts];
    //expect(roverArray).toEqual(roverStatus);
    expect(response.results.roverStatus).toBeTrue;
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
    expect(rover.position).toEqual(10);
  });
  //test 11
  it('responds correctly to mode change command', function() {
    /*
    The test should check the completed property and rover mode for accuracy.
    The rover has two modes that can be passed a values to a mode change command, 'LOW_POWER' and 'NORMAL'.*/
    let commands = [new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Mode change', commands);
    let rover = new Rover(10);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.position).toEqual(10);
    expect(response.results.roverStatus).toBeTrue;
  });
  //test 12 
  it('responds with false completed value when attempting to move in LOW_POWER mode', function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', '10'), new Command('STATUS_CHECK')];
    let message = new Message('LOW_POWER check', commands);
    let rover = new Rover(10);
    let response = rover.receiveMessage(message);
    expect(response.results[2].value).toBeFalse;
    expect(rover.position).toEqual(rover.position);
  });
  //test 13 
  it('responds with position for move command', function() {
    let commands = [new Command('MOVE', 25)];
    let message = new Message('Move Command Test', commands);
    let rover = new Rover(message.commands.value);
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(25)
  });
});
