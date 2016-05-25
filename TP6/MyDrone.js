/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyDrone(scene) {
	CGFobject.call(this,scene);

	//Front and Back Movement
	var StateMovEnum = {
			WITHOUT_MOV:0,
  			FRONT: 1,
  			FRONT_FINAL: 2,
  			BACK: 3,
  			BACK_FINAL:4,};
  	
  	var myStateMoving = StateMovEnum.WITHOUT_MOV;

	this.x = 7;
	this.y = 3;
	this.z = 4;
	this.velocity=0;
	this.maxVelocity=0.2;
	this.acceleration=0.01;

	//Right and Left Movement, Rotacion

	var StateRotEnum = {
			WITHOUT_MOV:0,
  			RIGHT: 1,
  			RIGHT_FINAL: 2,
  			LEFT: 3,
  			LEFT_FINAL:4,};
  	var myStateRotacion = StateRotEnum.WITHOUT_MOV;

	this.r_x=0;
	this.r_y=0;
	this.r_z=0;
	this.r_velocity=0;
	
	//Up and Down Movement

	
	var StateHeightEnum = {
			WITHOUT_MOV:0,
  			UP: 1,
  			UP_FINAL: 2,
  			DOWN: 3,
  			DOWN_FINAL:4
  			};
  	
  	var myStateHeigth = StateHeightEnum.WITHOUT_MOV;

	this.heightVelocity=0;

	//Inclination Movement
	
	var StateInclinationEnum = {
			WITHOUT_INCLI:0,
  			FRONT_INCLI: 1,
  			FRONT_FINAL_INCLI: 2,
  			BACK_INCLI: 3,
  			BACK_FINAL_INCLI:4
  			};

	
	this.myStateInclination = StateInclinationEnum.WITHOUT_INCLI;
	this.xInclination=0;
	this.zInclination=0;
	this.maxInclination=0.5;
	this.incStep=0.05;

	this.angle = 0; //degrees

	this.center=new MyHemisphere(this.scene,12,1);
	this.base = new MyCylinder(this.scene,12,7);
	this.arm1 = new MyCylinder(this.scene,12,7);
	this.arm2 = new MyCylinder(this.scene,12,7);
	this.arm3 = new MyCylinder(this.scene,12,7);
	this.arm4 = new MyCylinder(this.scene,12,7);
	this.hand1 = new MyCylinderWithTop(this.scene,12,12);
	this.hand2 = new MyCylinderWithTop(this.scene,12,12);
	this.hand3 = new MyCylinderWithTop(this.scene,12,12);
	this.hand4 = new MyCylinderWithTop(this.scene,12,12);
	this.frontProp = new MyPropeller(this.scene,-1);
	this.backProp = new MyPropeller(this.scene,-1);
	this.rightProp = new MyPropeller(this.scene,1);
	this.leftProp = new MyPropeller(this.scene,1);
	this.bottom = new MyCircle(this.scene,12);
	this.leg1 = new MyDroneLeg(this.scene);
	this.leg2 = new MyDroneLeg(this.scene);
	this.base1 = new MyUnitCubeQuad(this.scene);
	this.base2 = new MyUnitCubeQuad(this.scene);


	this.geometric="../resources/images/geometric.jpg";
	this.hemi_geometric="../resources/images/Hemisphere_geometric.png";
	this.camo="../resources/images/camo.jpg";
	this.GeometricPatternBase="../resources/images/metallic.jpg";
	this.camoPatternBase="../resources/images/metallic.jpg";

	//Drone geometric pattern
	this.GeometricPattern = new CGFappearance(this.scene);
	this.GeometricPatternHemi = new CGFappearance(this.scene);
	this.GeometricPattern.loadTexture(this.geometric);
	this.GeometricPatternHemi.loadTexture(this.hemi_geometric);
	
	//Drone camo pattern
	this.camoPattern = new CGFappearance(this.scene);
	this.camoPattern.loadTexture(this.camo);

/*
	//Drone geometric pattern (base)
	this.GeometricPatternBase = new CGFappearance(this.scene);
	this.GeometricPatternBase.loadTexture(this.geometric);
	
	//Drone camo pattern (base)
	this.camoPatternBase = new CGFappearance(this.scene);
	this.camoPatternBase.loadTexture(this.camo);
*/
	

	this.initBuffers();
};


MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor=MyDrone;


MyDrone.prototype.draw = function() {

	var activePattern;
	
	if(this.scene.Texture==0){
	 	activePattern = this.GeometricPattern;
	 	activeHemiPattern = this.GeometricPatternHemi;
	}

	 else if(this.scene.Texture==1)
	 	activePattern = this.camoPattern;
	
	//propeller 1
	this.scene.pushMatrix();
		this.scene.translate(0,0.4,2.8);
		this.scene.rotate(this.frontProp.angle,0,1,0);
		this.frontProp.draw();
	this.scene.popMatrix();

	//propeller 2
	this.scene.pushMatrix();
		this.scene.translate(0,0.4,-2.8);
		this.scene.rotate(this.backProp.angle,0,1,0);
		this.backProp.draw();
	this.scene.popMatrix();

	//propeller 3
	this.scene.pushMatrix();
		this.scene.translate(-2.8,0.4,0);
		this.scene.rotate(this.rightProp.angle,0,1,0);
		this.rightProp.draw();
	this.scene.popMatrix();

	//propeller 4
	this.scene.pushMatrix();
		this.scene.translate(2.8,0.4,0);
		this.scene.rotate(this.leftProp.angle,0,1,0);
		this.leftProp.draw();
	this.scene.popMatrix();

	
	




  	
	//first arm
	this.scene.pushMatrix();

	activePattern.apply();
//	activeHemiPattern.apply();

	this.scene.pushMatrix();
		this.scene.scale(0.25,0.2,0.4);
		this.arm1.display();
	this.scene.popMatrix();

	//end of the first arm
	this.scene.pushMatrix();
		this.scene.translate(0,0.4,2.8);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(0.27,0.27,0.05);
		this.hand1.draw();
	this.scene.popMatrix();

	//second arm
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(0.25,0.2,0.4);
		this.arm2.display();
	this.scene.popMatrix();

	//end of the second arm
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.translate(0,0.4,2.8);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(0.2,0.27,0.05);
		this.scene.scale(0.27,0.27,0.05);
		this.hand2.draw();
	this.scene.popMatrix();

	//third arm
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI,1,0,0);
		this.scene.scale(0.25,0.2,0.4);
		this.arm3.display();
	this.scene.popMatrix();

	//end of the third arm
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.translate(0,0.4,2.8);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(0.27,0.27,0.05);
		this.hand3.draw();
	this.scene.popMatrix();

	//fourth arm
	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.scale(0.25,0.2,0.4);
		this.arm4.display();
	this.scene.popMatrix();

	//end of the fourth arm
	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.translate(0,0.4,2.8);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(0.27,0.27,0.05);
		this.hand4.draw();
	this.scene.popMatrix();

	//bottom of drone
	this.scene.pushMatrix();
		this.scene.translate(0,-0.25,0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.bottom.display();
	this.scene.popMatrix();

	/*this.scene.pushMatrix();
	this.scene.rotate(Math.PI/2,0,1,0);*/
			
	//leg1
	this.scene.pushMatrix();
		this.scene.translate(0,-1.25,0.7);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.leg1.draw();
	this.scene.popMatrix();

	//leg2
	this.scene.pushMatrix();
		this.scene.translate(0,-1.25,-0.7);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.leg2.draw();
	this.scene.popMatrix();

	//base1
	this.scene.pushMatrix();
		this.scene.translate(0.95,-1.25,0);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.scale(2,0.15,0.15);
		this.base1.display();
	this.scene.popMatrix();

	//base2
	this.scene.pushMatrix();
		this.scene.translate(-0.95,-1.25,0);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.scale(2,0.15,0.15);
		this.base2.display();
	//this.scene.popMatrix();
	this.scene.popMatrix();



	this.scene.pushMatrix();
		activePattern.apply();
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(1,1,0.05);
		this.base.display();
	this.scene.popMatrix();
	

	this.scene.popMatrix();

	this.scene.pushMatrix();
		activeHemiPattern.apply();
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,0,1,1);
		this.center.draw();
	this.scene.popMatrix();
	
	
	
	

	

};

var propellerSpeed = {
  		SLOW: 0,
  		NORMAL: 1,
  		FAST: 2,
  	}


MyDrone.prototype.moveLeft = function(){
	this.myStateRotacion="LEFT";

	if(this.myStateMoving != "BACK")
		this.frontProp.setSpeed(propellerSpeed.SLOW);

	if(this.myStateMoving != "FRONT")
		this.backProp.setSpeed(propellerSpeed.SLOW);

	this.leftProp.setSpeed(propellerSpeed.FAST);
	this.rightProp.setSpeed(propellerSpeed.FAST);
}

MyDrone.prototype.stopMoveLeft = function(){
	this.myStateRotacion="LEFT_FINAL";

	if(this.myStateMoving != "BACK")
		this.frontProp.setSpeed(propellerSpeed.NORMAL);

	if(this.myStateMoving != "FRONT")
		this.backProp.setSpeed(propellerSpeed.NORMAL);

	this.leftProp.setSpeed(propellerSpeed.NORMAL);
	this.rightProp.setSpeed(propellerSpeed.NORMAL);
}

MyDrone.prototype.moveRight = function(){
	this.myStateRotacion="RIGHT";

	if(this.myStateMoving != "BACK")
		this.frontProp.setSpeed(propellerSpeed.SLOW);

	if(this.myStateMoving != "FRONT")
		this.backProp.setSpeed(propellerSpeed.SLOW);

	this.leftProp.setSpeed(propellerSpeed.FAST);
	this.rightProp.setSpeed(propellerSpeed.FAST);
}

MyDrone.prototype.stopMoveRight = function(){
	this.myStateRotacion="RIGHT_FINAL";

	if(this.myStateMoving != "BACK")
		this.frontProp.setSpeed(propellerSpeed.NORMAL);

	if(this.myStateMoving != "FRONT")
		this.backProp.setSpeed(propellerSpeed.NORMAL);

	this.leftProp.setSpeed(propellerSpeed.NORMAL);
	this.rightProp.setSpeed(propellerSpeed.NORMAL);
}

MyDrone.prototype.moveFront = function(){
	this.myStateMoving="FRONT";
	this.myStateInclination="FRONT_INCLI";

	this.frontProp.setSpeed(propellerSpeed.SLOW);
	this.backProp.setSpeed(propellerSpeed.FAST);

	if(this.myStateRotacion !="RIGHT" && this.myStateRotacion != "LEFT"){
	this.leftProp.setSpeed(propellerSpeed.NORMAL);
	this.rightProp.setSpeed(propellerSpeed.NORMAL);
	}

}

MyDrone.prototype.stopMoveFront = function(){
	this.myStateMoving="FRONT_FINAL";
	this.myStateInclination = "FRONT_FINAL_INCLI"

	this.frontProp.setSpeed(propellerSpeed.NORMAL);
	this.backProp.setSpeed(propellerSpeed.NORMAL);

	if(this.myStateRotacion !="RIGHT" && this.myStateRotacion != "LEFT"){
		this.leftProp.setSpeed(propellerSpeed.NORMAL);
		this.rightProp.setSpeed(propellerSpeed.NORMAL);
	}
}

MyDrone.prototype.goBack = function(){
	this.myStateMoving="BACK";
	this.myStateInclination="BACK_INCLI";

	this.frontProp.setSpeed(propellerSpeed.FAST);
	this.backProp.setSpeed(propellerSpeed.SLOW);

	if(this.myStateRotacion !="RIGHT" && this.myStateRotacion != "LEFT"){
		this.leftProp.setSpeed(propellerSpeed.NORMAL);
		this.rightProp.setSpeed(propellerSpeed.NORMAL);
	}
}
MyDrone.prototype.stopMoveBack = function(){
	this.myStateMoving="BACK_FINAL";
	this.myStateInclination = "BACK_FINAL_INCLI";

	this.frontProp.setSpeed(propellerSpeed.NORMAL);
	this.backProp.setSpeed(propellerSpeed.NORMAL);

	if(this.myStateRotacion !="RIGHT" && this.myStateRotacion != "LEFT"){
		this.leftProp.setSpeed(propellerSpeed.NORMAL);
		this.rightProp.setSpeed(propellerSpeed.NORMAL);
	}
}

MyDrone.prototype.goUp = function(){
	this.myStateHeigth="UP";
	
	this.frontProp.setSpeed(propellerSpeed.FAST);
	this.backProp.setSpeed(propellerSpeed.FAST);
	this.leftProp.setSpeed(propellerSpeed.FAST);
	this.rightProp.setSpeed(propellerSpeed.FAST);
}

MyDrone.prototype.stopMoveUp = function(){
	this.myStateHeigth="UP_FINAL";
	
	if(this.myStateMoving != "BACK")
		this.frontProp.setSpeed(propellerSpeed.NORMAL);

	if(this.myStateMoving != "FRONT")
		this.backProp.setSpeed(propellerSpeed.NORMAL);

	if(this.myStateRotacion !="RIGHT" && this.myStateRotacion != "LEFT"){
		this.leftProp.setSpeed(propellerSpeed.NORMAL);
		this.rightProp.setSpeed(propellerSpeed.NORMAL);
	}
}

MyDrone.prototype.goDown = function(){
	this.myStateHeigth="DOWN";

	if(this.myStateMoving != "BACK")
		this.frontProp.setSpeed(propellerSpeed.SLOW);

	if(this.myStateMoving != "FRONT")
		this.backProp.setSpeed(propellerSpeed.SLOW);

	if(this.myStateRotacion !="RIGHT" && this.myStateRotacion != "LEFT"){
		this.leftProp.setSpeed(propellerSpeed.SLOW);
		this.rightProp.setSpeed(propellerSpeed.SLOW);
	}
}

MyDrone.prototype.stopMoveDown = function(){
	this.myStateHeigth="DOWN_FINAL";

	if(this.myStateMoving != "BACK")
		this.frontProp.setSpeed(propellerSpeed.NORMAL);

	if(this.myStateMoving != "FRONT")
		this.backProp.setSpeed(propellerSpeed.NORMAL);

	if(this.myStateRotacion !="RIGHT" && this.myStateRotacion != "LEFT"){
		this.leftProp.setSpeed(propellerSpeed.NORMAL);
		this.rightProp.setSpeed(propellerSpeed.NORMAL);
	}
}

MyDrone.prototype.update = function(){

	this.frontProp.update();
	this.backProp.update();
	this.leftProp.update();
	this.rightProp.update();

	switch(this.myStateMoving){
		case "FRONT":

		if(this.velocity<this.maxVelocity)
			this.velocity+=this.acceleration;
		else this.velocity=this.maxVelocity;
		break;

		case "FRONT_FINAL":

		if(this.velocity>0)
			this.velocity-=this.acceleration;
		else this.velocity=0;
		break;

		case "BACK":
		if(this.velocity>-this.maxVelocity)
			this.velocity-=this.acceleration;
		else this.velocity=-this.maxVelocity;
		break;

		case "BACK_FINAL":
		if(this.velocity<0)
			this.velocity+=this.acceleration;
		else this.velocity=0;
		break;
	}

	switch(this.myStateInclination){
		case "FRONT_INCLI":

		if(this.xInclination<this.maxInclination)
			this.xInclination+=this.incStep;
		else this.xInclination=this.maxInclination;
		break;

		case "FRONT_FINAL_INCLI":

		if(this.xInclination>0)
			this.xInclination-=this.incStep;
		else this.xInclination=0;
		break;

		case "BACK_INCLI":
		if(this.xInclination>-this.maxInclination)
			this.xInclination-=this.incStep;
		else this.xInclination=-this.maxInclination;
		break;

		case "BACK_FINAL_INCLI":
		if(this.xInclination<0)
			this.xInclination+=this.incStep;
		else this.xInclination=0;
		break;
	}


	switch(this.myStateRotacion){
		case "RIGHT":
		if(this.r_velocity<this.maxVelocity)
			this.r_velocity+=this.acceleration;
		else this.r_velocity=this.maxVelocity;
		break;

		case "RIGHT_FINAL":

		if(this.r_velocity>0)
			this.r_velocity-=this.acceleration;
		else this.r_velocity=0;
		break;

		case "LEFT":
		if(this.r_velocity>-this.maxVelocity)
			this.r_velocity-=this.acceleration;
		else this.r_velocity=-this.maxVelocity;
		break;

		case "LEFT_FINAL":
		if(this.r_velocity<0)
			this.r_velocity+=this.acceleration;
		else this.r_velocity=0;
		break;
	}

	switch(this.myStateHeigth){
		case "UP":
		if(this.heightVelocity<this.maxVelocity)
			this.heightVelocity+=this.acceleration;
		else this.heightVelocity=this.maxVelocity;
		break;

		case "UP_FINAL":

		if(this.heightVelocity>0)
			this.heightVelocity-=this.acceleration;
		else this.heightVelocity=0;
		break;

		case "DOWN":
		if(this.heightVelocity>-this.maxVelocity)
			this.heightVelocity-=this.acceleration;
		else this.heightVelocity=-this.maxVelocity;
		break;

		case "DOWN_FINAL":
		if(this.heightVelocity<0)
			this.heightVelocity+=this.acceleration;
		else this.heightVelocity=0;
		break;
	}

	
	this.y+=1*this.heightVelocity;
	this.r_y+=this.r_velocity;
	this.r_x=this.xInclination;
	this.z+=Math.cos(this.r_y)*this.velocity;
	this.x+=Math.sin(this.r_y)*this.velocity;
}
