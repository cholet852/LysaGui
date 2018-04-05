function Viewer3D(viewMan)
{
    this.div = null;
    this.view_manager = viewMan;
    
    this.scene = null;
    this.sceneGlobal = null;

    this.camera = null;
    this.cameraTarget = null;
    this.composer = null;
    this.renderpass = null;
    this.shaderPass = null;
    this.shaderPassView = null;
    this.outlinePass = null;
    this.container = null;

    this.width = 300;
    this.height = 300;
    this.width_div = 0;
    this.height_div = 0;
}

Viewer3D.prototype.update = function()
{
    var timer = Date.now() * 0.0005;
    this.camera.position.x = Math.cos( timer ) * 3;
    this.camera.position.z = Math.sin( timer ) * 3;

    this.camera.lookAt( this.cameraTarget );
    this.view_manager.renderer.render(this.sceneGlobal, this.camera)
}

Viewer3D.prototype.calcDimensions = function()
{
    this.debutX = $(this.div).offset().left + this.left;
    this.finX = this.debutX + this.width;
    
    var botdiv = $(this.div).offset().top + this.bottom;
    this.debutY = botdiv;    
    this.finY = botdiv + this.height;

    //this.svg_manager.updateDimensions();
}

Viewer3D.prototype.init = function(div, left, bottom, width, height, nameview, color, type)
{
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
    //window.scene = this.sceneGlobal;
    this.sceneGlobal.background = new THREE.Color( 0x72645b );
	//this.sceneGlobal.fog = new THREE.Fog( 0x72645b, 2, 15 );

    //this.sceneGlobalOutline = new THREE.Scene();

    //this.scene = new THREE.Object3D();
    //this.sceneGlobal.add(this.scene);

    // Ground
    var plane = new THREE.Mesh(
					new THREE.PlaneBufferGeometry( 40, 40 ),
					new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
				);
    plane.rotation.x = -Math.PI/2;
	plane.position.y = -0.5;
	this.sceneGlobal.add( plane );
	plane.receiveShadow = true;

    // CAMERA ------------------------------------------------------------

    //this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 1, 15);
    this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
    this.camera.position.set( 3, 0.15, 3 );
	this.cameraTarget = new THREE.Vector3( 0, -0.25, 0 );

    this.sceneGlobal.add(this.camera);    
    this.camera.updateProjectionMatrix();

    //ITEM
    var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set( 0, - 0.25, 0.6 );
    cube.castShadow = true;
	cube.receiveShadow = true;
    //this.sceneGlobal.add( cube );

    var loader = new THREE.FileLoader();
    loader.setResponseType('arraybuffer');

    var url = "http://localhost:4200/assets/models/slotted_disk.stl";

    loader.load(url, function (data)
        {
            var loader = new THREE.STLLoader();
            var blob = new Blob([data], { type: 'application/octet-stream'} );
            var content = window.URL.createObjectURL(blob);
            
            loader.load( content, function ( geometry )
             {
                    console.log("jjjjj");
					var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.set( 0, - 0.25, 0.6 );
					mesh.rotation.set( 0, - Math.PI / 2, 0 );
					mesh.scale.set( 10, 10, 10);
					mesh.castShadow = true;
					mesh.receiveShadow = true;
					this.sceneGlobal.add( mesh );
				} );

        }.bind(this));

    
    
    //var blob = new Blob([url], { type: 'application/octet-stream'} );

    //var content = window.URL.createObjectURL(blob);

    

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