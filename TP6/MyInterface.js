/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'doSomething');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Lights");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'LeftBoardLight');
	group.add(this.scene, 'RightBoardLight');
	group.add(this.scene, 'LeftCenterLight');
	group.add(this.scene, 'RightCenterLight');
	group.add(this.scene, 'ClockActive');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', 0.1, 2.0);

	//drop down menu to select the Drone texture
	this.gui.add(this.scene, 'currDroneAppearance',{Geometric:0,Camo:1,Feup:2});
	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */

MyInterface.prototype.processKeyDown = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	// only works for capital 'A', as it is
			//this.scene.drone.moveLeft();
			this.scene.drone.moveRight();
			console.log("Key 'A' pressed");
			break;
		case (97):	//a
			//this.scene.drone.moveLeft();
			this.scene.drone.moveRight();
			console.log("Key 'A' pressed");
			break;
		case (68)://D
			//this.scene.drone.moveRight();
			this.scene.drone.moveLeft();
			console.log("Key D pressed");
			break;
		case(100)://d
			//this.scene.drone.moveRight();
			this.scene.drone.moveLeft();
			console.log("Key D pressed");
			break;
		case(119)://w
			this.scene.drone.moveFront();
			console.log("Key W pressed");
			break;
		case(87)://W
			this.scene.drone.moveFront();
			console.log("Key W pressed");
			break;
		case(83)://S
			this.scene.drone.goBack();
			console.log("Key S pressed");
			break;
		case(115): //s
			this.scene.drone.goBack();
			console.log("Key S pressed");
			break;
		case(105): //i
			this.scene.drone.goUp();
			console.log("Key S pressed");
			break;
		case(73): //I
			this.scene.drone.goUp();
			console.log("Key S pressed");
			break;
		case(74): //J
			this.scene.drone.goDown();
			console.log("Key S pressed");
			break;
		case(106): //j
			this.scene.drone.goDown();
			console.log("Key S pressed");
			break;
		case(80): //P
			this.scene.drone.pullHook();
			console.log("Key P pressed");
			break;
		case(112): //p
			this.scene.drone.pullHook();
			console.log("Key p pressed");
			break;
		case(76): //L
			this.scene.drone.releaseHook();
			console.log("Key L pressed");
			break;
		case(108): //l
			this.scene.drone.releaseHook();
			console.log("Key l pressed");
			break;

	};
};

MyInterface.prototype.processKeyUp = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	// only works for capital 'A', as it is
			//this.scene.drone.stopMoveLeft();
			this.scene.drone.stopMoveRight();
			console.log("Key 'A' pressed");
			break;
		case (97):	//a
			//this.scene.drone.stopMoveLeft();
			this.scene.drone.stopMoveRight();
			console.log("Key 'A' pressed");
			break;
		case (68)://D
			//this.scene.drone.stopMoveRight();
			this.scene.drone.stopMoveLeft();
			console.log("Key D pressed");
			break;
		case(100)://d
			//this.scene.drone.stopMoveRight();
			this.scene.drone.stopMoveLeft();
			console.log("Key D pressed");
			break;
		case(119)://w
			this.scene.drone.stopMoveFront();
			console.log("Key W pressed");
			break;
		case(87)://W
			this.scene.drone.stopMoveFront();
			console.log("Key W pressed");
			break;
		case(83)://S
			this.scene.drone.stopMoveBack();
			console.log("Key S pressed");
			break;
		case(115): //s
			this.scene.drone.stopMoveBack();
			console.log("Key S pressed");
			break;
		case(105): //i
			this.scene.drone.stopMoveUp();
			console.log("Key S pressed");
			break;
		case(73): //I
			this.scene.drone.stopMoveUp();
			console.log("Key S pressed");
			break;
		case(74): //J
			this.scene.drone.stopMoveDown();
			console.log("Key S pressed");
			break;
		case(106): //j
			this.scene.drone.stopMoveDown();
			console.log("Key S pressed");
			break;

	};
};
