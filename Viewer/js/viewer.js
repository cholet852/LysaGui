function Viewer3D(viewMan)
{
    this.div = null;
    this.view_manager = viewMan;
    
    this.scene = null;
    this.sceneGlobal = null;

    this.camera = null;
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
    this.view_manager.renderer.setClearColor(this.backgroundcolor);
    this.view_manager.renderer.setScissorTest(true);
    this.view_manager.renderer.setViewport(this.left, this.bottom, this.width, this.height);
    this.view_manager.renderer.setScissor(this.left, this.bottom, this.width, this.height);

    this.renderPass.scene = this.sceneGlobal;
    this.renderPass.camera = this.camera;
    this.renderPass.viewer = this;
    this.outlinePass.viewer = this;
    this.outlinePass.resolution = new THREE.Vector2(this.width, this.height);
    this.outlinePass.renderScene = this.sceneGlobal;
    this.outlinePass.renderCamera = this.camera;
    this.shaderPass.viewer = this;
    this.composer.render();
    this.calcDimensions();
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
    window.scene = this.sceneGlobal;
    this.sceneGlobal.background = new THREE.Color( 0x72645b );
	this.sceneGlobal.fog = new THREE.Fog( 0x72645b, 2, 15 );

    this.sceneGlobalOutline = new THREE.Scene();

    this.scene = new THREE.Object3D();
    this.sceneGlobal.add(this.scene);

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
    this.camera.position.set( 1, 0.15, 3 );
	this.cameraTarget = new THREE.Vector3( 0, -0.25, 0 );

    //this.sceneGlobal.add(this.camera);    
    //this.camera.updateProjectionMatrix();

    //COMPOSER ------------------------------------------------------------

    this.composer = new THREE.EffectComposer(this.view_manager.renderer);
    this.renderPass = new THREE.RenderPass(this, this.sceneGlobal, this.camera);
    this.composer.addPass(this.renderPass);

    this.outlinePass = new THREE.OutlinePass(this, new THREE.Vector2(this.width_div, this.height_div), this.sceneGlobal, this.camera);
    this.outlinePass.edgeStrength = 5;
    this.outlinePass.edgeGlow = 0;
    this.outlinePass.edgeThickness = 0.5;
    this.outlinePass.pulsePeriod = 0;
    this.outlinePass.visibleEdgeColor = new THREE.Color(0x11E1D3);
    this.outlinePass.hiddenEdgeColor = new THREE.Color(0x11E1D3);
    this.composer.addPass(this.outlinePass);

    this.shaderPass = new THREE.ShaderPass(THREE.VignetteShader);        
    this.composer.addPass(this.shaderPass);
    this.shaderPassView = new THREE.ShaderPass(THREE.MainViewShader);
    this.shaderPassView.renderToScreen = true;
    this.composer.addPass(this.shaderPassView);

    //ITEM
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );

    var loader = new THREE.STLLoader();

    var material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );
				loader.load( '../../models/docisk_kuli.stl', function ( geometry ) {
					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.set( 0, - 0.37, - 0.6 );
					mesh.rotation.set( - Math.PI / 2, 0, 0 );
					mesh.scale.set( 2, 2, 2 );
					mesh.castShadow = true;
					mesh.receiveShadow = true;
					this.sceneGlobal.add( mesh );
				} );

    this.camera.position.z = 5;

    // Environement -------------------------------------------------------------------  

    this.sceneGlobal.add( new THREE.HemisphereLight( 0x443333, 0x111122 ) );
				//addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
				//addShadowedLight( 0.5, 1, -1, 0xffaa00, 1 );            

    this.initLights();
}

Viewer3D.prototype.initLights = function()
{
    var light = new THREE.AmbientLight(0x808080);
    this.scene.add(light);
       
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.15);
    dirLight.position.set(0, 0, 1000);
    this.scene.add(dirLight);

    var dirLight2 = new THREE.DirectionalLight(0xffffff, 0.15);
    dirLight2.position.set(0, 0, -1000);
    this.scene.add(dirLight2);

    var dirLight3 = new THREE.DirectionalLight(0xffffff, 0.15);
    dirLight3.position.set(1000, 0, 0);
    this.scene.add(dirLight3);

    var dirLight4 = new THREE.DirectionalLight(0xffffff, 0.15);
    dirLight4.position.set(-1000, 0, 0);
    this.scene.add(dirLight4);

    var dirLight5 = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight5.position.set(0, -1000, 0);
    this.scene.add(dirLight5);

    var dirLight6 = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight6.position.set(0, 1000, 0);
    this.scene.add(dirLight6);
}