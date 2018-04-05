function Viewer3D(viewMan)
{
    this.div = null;
    this.view_manager = viewMan;
    
    this.scene = null;
    this.sceneGlobal = null;

    this.camera = null;
    this.cameraTarget = null;
    this.controls = null;
    this.renderpass = null;
    this.shaderPass = null;
    this.shaderPassView = null;
    this.outlinePass = null;
    this.container = null;

    this.width = 300;
    this.height = 300;
    this.width_div = 0;
    this.height_div = 0;

    this.self = null;
}

Viewer3D.prototype.update = function()
{
    // var timer = Date.now() * 0.0005;
    // this.camera.position.x = Math.cos( timer ) * 3;
    // this.camera.position.z = Math.sin( timer ) * 3;
    this.view_manager.renderer.render(this.sceneGlobal, this.camera)
    this.controls.update();
}

Viewer3D.prototype.init = function(div, left, bottom, width, height, nameview, color, type)
{
    var self = this;

    // Initialization ----------------------------------------------------------------
       
    this.name = nameview;
    this.div = div;

    this.width_div = $(div).width();
    this.height_div = $(div).height();
    this.width = width;
    this.height = height;
    this.left = left;
    this.bottom = bottom;
    this.backgroundcolor = color;

    // create main scene ------------------------------------------------------------

    this.sceneGlobal = new THREE.Scene();
    this.sceneGlobal.background = new THREE.Color( 0x72645b );

    // Grid

    var gridXZ = new THREE.GridHelper(100, 10);
	gridXZ.setColors( new THREE.Color(0xff0000), new THREE.Color(0xffffff) );
	this.sceneGlobal.add(gridXZ);

    // CAMERA ------------------------------------------------------------

    //this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 1, 15);
    this.camera = new THREE.PerspectiveCamera( 45, width/height, 0.1, 10000);
    this.camera.position.y = 160;
	this.camera.position.z = 400;
	this.cameraTarget = new THREE.Vector3(0,0,0);
    this.camera.lookAt( this.cameraTarget );

    this.sceneGlobal.add(this.camera);

    // CONTROLS

    //this.controls = new THREE.OrbitControls (this.camera, this.view_manager.renderer.domElement);

    //ITEM
    var loaderstl = new THREE.STLLoader();
            
            loaderstl.load( 'assets/models/JawHingeV1.stl', function ( geometry )
             {
                    console.log("jjjjj");
					var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
					var mesh = new THREE.Mesh( geometry, material );
					//mesh.position.set( 0, - 0.25, 0.6 );
					//mesh.rotation.set( 0, - Math.PI / 2, 0 );
					//mesh.scale.set( 0.01, 0.01, 0.01);
					mesh.castShadow = true;
					mesh.receiveShadow = true;
					self.sceneGlobal.add( mesh );
				} );

    // Environement -------------------------------------------------------------------  

    this.sceneGlobal.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
    this.addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
	this.addShadowedLight( 0.5, 1, -1, 0xffaa00, 1 );
}

Viewer3D.prototype.addShadowedLight = function( x, y, z, color, intensity )
 {
     var directionalLight = new THREE.DirectionalLight( color, intensity );
     directionalLight.position.set( x, y, z );
     this.sceneGlobal.add( directionalLight );
				directionalLight.castShadow = true;
				var d = 1;
				directionalLight.shadow.camera.left = -d;
				directionalLight.shadow.camera.right = d;
				directionalLight.shadow.camera.top = d;
				directionalLight.shadow.camera.bottom = -d;
				directionalLight.shadow.camera.near = 1;
				directionalLight.shadow.camera.far = 4;
				directionalLight.shadow.mapSize.width = 1024;
				directionalLight.shadow.mapSize.height = 1024;
				directionalLight.shadow.bias = -0.002;
 }