/**
 * MyDroneLegSide2
 * @constructor
 */
 function MyDroneLegSide2(scene,angle, int_rad) {
 	CGFobject.call(this,scene);

 	this.const_ang = angle * Math.PI/180;
 	this.int_rad = int_rad;
	
 	this.initBuffers();
 };

 MyDroneLegSide2.prototype = Object.create(CGFobject.prototype);
 MyDroneLegSide2.prototype.constructor = MyDroneLegSide2;

 MyDroneLegSide2.prototype.initBuffers = function() {


 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];
	
	var ang1=(2*Math.PI)/12;
	var ang2=(Math.PI)/12;
	var n_verts = 0;


	for(var j = 0; j < 12; j++){

		this.vertices.push(Math.sin(this.const_ang), 
							Math.cos(j*ang2),
							Math.cos(this.const_ang)*Math.sin(j*ang2)
							);

		n_verts++;

		this.vertices.push(Math.sin(this.const_ang), 
							this.int_rad * Math.cos(j*ang2),
							this.int_rad * Math.cos(this.const_ang)*Math.sin(j*ang2)
							);

		n_verts++;

		this.vertices.push(Math.sin(this.const_ang), 
							Math.cos((j+1)*ang2),
							Math.cos(this.const_ang)*Math.sin((j+1)*ang2)
							);

		n_verts++;

		this.vertices.push(Math.sin(this.const_ang), 
							this.int_rad * Math.cos((j+1)*ang2),
							this.int_rad * Math.cos(this.const_ang)*Math.sin((j+1)*ang2)
							);

		n_verts++;

		this.indices.push(n_verts - 1, n_verts-3,n_verts-4);
		this.indices.push(n_verts - 2, n_verts-1,n_verts-4);
		this.normals.push(	1,0,0,
							1,0,0,
							1,0,0,
							1,0,0);
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };


 MyDroneLegSide2.prototype.draw = function() {
	this.display();
 };
