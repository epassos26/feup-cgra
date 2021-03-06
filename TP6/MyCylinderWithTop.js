/**
 * MyCylinderWithTop
 * @constructor
 */
 function MyCylinderWithTop(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

	this.cylinder = new MyCylinder(this.scene,this.slices,this.stacks);
	this.top1 = new MyCircle (this.scene, this.slices);
	this.top2 = new MyCircle (this.scene, this.slices);

 	this.initBuffers();
 };

 MyCylinderWithTop.prototype = Object.create(CGFobject.prototype);
 MyCylinderWithTop.prototype.constructor = MyCylinderWithTop;

 MyCylinderWithTop.prototype.draw = function() {
 	

	this.cylinder.display();

	this.scene.pushMatrix();
		this.scene.rotate(Math.PI,1,0,0);
		this.top1.display();
	this.scene.popMatrix();
	
	
	this.scene.pushMatrix();
		this.scene.translate(0,0,this.stacks);
		this.top2.display();
	this.scene.popMatrix();
	
 };

