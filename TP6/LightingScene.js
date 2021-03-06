var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();


	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.leftWall = new MyQuad(this,-.5,1.3,-.5,1.3);
	this.floor = new MyQuad(this,0,10,0,12);
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
    this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.materialC = new CGFappearance(this);
	this.materialC.setDiffuse(0,0.498,1,1);	
	this.materialC.setShininess(120);

	this.materialD = new CGFappearance(this);
	this.materialD.setDiffuse(0.753,0.753,0.753,1);
	this.materialD.setShininess(120);

	this.chairAppearance = new CGFappearance(this);
	this.chairAppearance.loadTexture("../resources/images/table.png");


	//floor texture
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.floorAppearance.setTextureWrap('REPEAT','REPEAT');


	//window appearance
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

	
	//Columns
	this.prism=new MyPrism(this,8,20);
	this.cylinder = new MyCylinder(this,8,20);

	//clock
	this.clock = new MyClock(this,12,1);

	//weight
	this.box = new MyBox(this);

	this.enableTextures(true);


	//boards
	//slidesAppearance
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.loadTexture("../resources/images/slides.jpg");
	this.slidesAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
	this.slidesAppearance.setShininess(30);
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE')

	//boardAppearance
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.boardAppearance.setSpecular(0.9,0.9,0.9,1);
	this.boardAppearance.setShininess(120);
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE')

	//marbleAppearance
	this.marbleAppearance = new CGFappearance(this);
	this.marbleAppearance.loadTexture("../resources/images/marble2.png");
	this.marbleAppearance.setSpecular(0.9,0.9,0.9,1);
	this.marbleAppearance.setShininess(120);
	this.marbleAppearance.setDiffuse(0.6,0.6,0.6,1);

	//update time
	this.updateRate = 20;
	this.setUpdatePeriod(this.updateRate);

	//paper plane
	this.paperPlane = new MyPaperPlane(this);

	this.planeAppearance = new CGFappearance(this);
	this.planeAppearance.setDiffuse(0.95,0.95,0.95,1);
	this.planeAppearance.setSpecular(0.05,0.05,0.05,1);
	this.planeAppearance.setShininess(20);

	//TP6

	this.LeftBoardLight = true;
	this.RightBoardLight = true;
	this.LeftCenterLight = true;
	this.RightCenterLight = true;
	this.ClockActive = true;
	this.speed = 3;

	this.drone = new MyDrone(this,0.6);

	//temporary for modelling
	this.propeller = new MyPropeller(this);
	this.leg = new MyDroneLeg(this);

	this.chair = new MyChair(this);
	this.hook = new MyHook(this);
	this.destination = new MyBoxDestination(this);

	//array to hold the appearances
	//as some appearances have a special corresponding pattern for the center hemisphere
	//the array will hold both appearances at the 2n and 2n+1 positions, n being their position in the drop down menu in the gui
	//e.g. the feup pattern for the arms and base is at index 2*2=4 and the hemisphere pattern at index 2*2+1=5
	this.droneAppearances = [];

	//Drone Appearances
	this.geometric="../resources/images/geometric.jpg";
	this.hemi_geometric="../resources/images/Hemisphere_geometric.png";
	this.camo="../resources/images/camo.jpg";
	this.grey="../resources/images/grey.jpg";
	this.face="../resources/images/feup2.png";

	//Drone geometric pattern
	this.GeometricPattern = new CGFappearance(this);
	this.GeometricPatternHemi = new CGFappearance(this);
	this.GeometricPattern.loadTexture(this.geometric);
	this.GeometricPatternHemi.loadTexture(this.hemi_geometric);
	this.droneAppearances.push(this.GeometricPattern,this.GeometricPatternHemi);

	//Drone camo pattern
	this.camoPattern = new CGFappearance(this);
	this.camoPattern.loadTexture(this.camo);
	this.droneAppearances.push(this.camoPattern,this.camoPattern); //no special pattern for the center here

	//FEUP pattern
	this.feupPattern = new CGFappearance(this);
	this.feupPattern.loadTexture(this.grey)
	this.feupHemiPattern = new CGFappearance(this);
	this.feupHemiPattern.loadTexture(this.face);
	this.droneAppearances.push(this.feupPattern,this.feupHemiPattern);

	//Box pattern
	this.boxPattern = new CGFappearance(this);
	this.boxPattern.loadTexture("../resources/images/box.png");

	//Boxdestination pattern
	this.boxDestinationPattern = new CGFappearance(this);
	this.boxDestinationPattern.loadTexture("../resources/images/boxD.png");

	
	//Variable that loads the current Drone texture
	//0-Geometric
	//1-Camo
	//2-Feup
	this.currDroneAppearance = 1;

	var StateBoxHook = {
			FOUND:0,
  			NOTFOUND: 1,};

  	var StateBoxHookDestination = {
			FOUND:0,
  			NOTFOUND: 1,};

  	var myStateBoxHook = StateBoxHook.NOTFOUND;
	var myStateBoxHookDestation = StateBoxHookDestination.NOTFOUND;

	this.activeAppearance = this.droneAppearances[2*this.currDroneAppearance];
	this.activeHemiAppearance = this.droneAppearances[1 + 2*this.currDroneAppearance];

	//propeller speed scale
	this.speed = 1;


};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	this.setGlobalAmbientLight(0,0,0, 1.0);
	// Positions for four lights
	// 0 - LeftBoardLight
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	//1 - RightBoardLight
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)


	//2 - RightCenterLight
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)
	this.lights[2].setSpecular(1.0,1.0,1.0,1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);


	//3 - LeftCenterLight
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1,1,0,1);

	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,0,1);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].enable();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup


	// ---- BEGIN Primitive drawing section


	//destination
	this.pushMatrix();
		this.boxDestinationPattern.apply();
		this.destination.draw();
	this.popMatrix();

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		//this.materialC.apply();
		this.windowAppearance.apply();
		this.leftWall.display();
	this.popMatrix();
	this.materialDefault.apply();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialC.apply();
		this.wall.display();
	this.popMatrix();

	this.materialDefault.apply();


	//Chair
	this.pushMatrix();
		this.translate(5,0,10);
		this.scale(0.7,0.8,0.8);
		this.chairAppearance.apply();
		this.chair.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();


/*
	//Prism acting as column
	this.pushMatrix();
		this.scale(1,0.4,1);
		this.translate(5,0,2);
		this.rotate(-90*degToRad,1,0,0);
		this.marbleAppearance.apply();
		this.prism.display();
	this.popMatrix();
	

/*	//Cylinder acting as column

	this.pushMatrix();
		this.scale(1,0.4,1);
		this.translate(11,0,12);
		this.rotate(-90*degToRad,1,0,0);
		this.marbleAppearance.apply();
		//this.floorAppearance.apply();
		this.cylinder.display();
	this.popMatrix();

*/

	//Clock
	this.pushMatrix();
		this.translate(7.2,7.2,0);
		this.scale(.5,.5,0.1);
		this.clock.display();
	this.popMatrix();

	//Paper plane
	this.pushMatrix();
		
		this.translate(this.paperPlane.x, this.paperPlane.y, this.paperPlane.z);
		if(!this.paperPlane.isFalling){	
			this.rotate(3*Math.PI/2,0,1,0);
			this.rotate(Math.PI/2,1,0,0);
		}

		else if (this.paperPlane.isFalling){
			this.rotate(Math.PI,0,0,1);
			this.rotate(-Math.PI/2,0,1,0);
		}

		else if (this.paperPlane.isOnTheGround){
			this.rotate(3*Math.PI/2,0,1,0);
			this.rotate(Math.PI/2,1,0,0);
		}

		this.planeAppearance.apply();
		this.paperPlane.display();
		this.popMatrix();

		//Drone
		this.pushMatrix();

			this.translate(this.drone.x,this.drone.y,this.drone.z);
			this.rotate(this.drone.r_y,0,1,0);
			this.rotate(this.drone.r_x,1,0,0);
			this.rotate(this.drone.r_z,0,0,1);
			this.drone.draw();

		this.popMatrix();

	this.popMatrix();

		
	//Weight
	this.pushMatrix();
		this.boxPattern.apply();
		this.box.draw();
	this.popMatrix();

	// ---- END Primitive drawing section
};

/**
 * update function used to animate the scene
 */
LightingScene.prototype.update = function(currTime){

	if(this.ClockActive)
		this.clock.update(currTime);

	if(this.LeftBoardLight)
		this.lights[0].enable();
	
	if(!this.LeftBoardLight)
		this.lights[0].disable();
	
	if(this.RightBoardLight)
		this.lights[1].enable();
	
	if(!this.RightBoardLight)
		this.lights[1].disable();

	if(!this.LeftCenterLight)
		this.lights[3].disable();
	
	if(this.LeftCenterLight)
		this.lights[3].enable();

	if(!this.RightCenterLight)
		this.lights[2].disable();

	if(this.RightCenterLight)
		this.lights[2].enable();
		

	this.paperPlane.update();

	//Drone
	this.activeAppearance = this.droneAppearances[2*this.currDroneAppearance];
	this.activeHemiAppearance = this.droneAppearances[1 + 2*this.currDroneAppearance];
	this.drone.update(this.speed);

	//Coordenate y of the End of the hook
	this.EndHook = this.drone.getHookHeight();
	
	//Drone is at the same position of the box
	
	if( this.box.x > (this.drone.x-0.5)  && this.box.x < (this.drone.x+0.5)
		&&this.box.z > (this.drone.z-0.5)  && this.box.z < (this.drone.z+0.5) 
	  && this.EndHook < this.box.y+0.5 && this.EndHook > this.box.y-0.5){
			{
				if(this.myStateBoxHook!="FOUND"){
					this.boxPattern.loadTexture("../resources/images/boxHook.png");
				}
				this.myStateBoxHook="FOUND";
			}
	}

	//Drone with box found the destination position

	if(this.box.x>this.destination.x-0.5 && this.box.x<this.destination.x+0.5){
		if(this.box.z>this.destination.z-0.5 && this.box.z < this.destination.z+0.5)
			if(this.box.y>this.destination.y-0.7 && this.box.y <this.destination.y+0.7)
				if(this.myStateBox!="NOTFOUND"){
				if(this.myStateBoxHookDestination !="FOUND"){
					this.boxPattern.loadTexture("../resources/images/box.png");
				}
				this.myStateBoxHookDestination="FOUND";
			}	
	}
		

	if(this.myStateBoxHook=="FOUND" && this.myStateBoxHookDestination !="FOUND"){
		this.box.x=this.drone.x;
		this.box.z=this.drone.z;
		this.box.setAngle(this.drone.r_y);
		this.box.y=this.EndHook;
	}
};


LightingScene.prototype.doSomething = function(){
	console.log("Doing Something...");
};

