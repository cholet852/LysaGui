function ViewManager(domElement3D, eventDispatcher)
{
    this.domElement3D = domElement3D;

    this.viewers = [];
    this.mainViewer;
    this.renderer;
    this.signals = eventDispatcher;

    this.init();
}

ViewManager.prototype.init = function ()
{
    //hud
    this.hud_viewer = new HUDViewer(this);

    //viewers
    var width = $(this.domElement3D).width();
    var height = $(this.domElement3D).height();
    console.log(width, height, this.domElement3D)

    this.renderer = new THREE.WebGLRenderer({ antialias: false, precision: "lowp", stencil: true, depth: true, preserveDrawingBuffer: true });
    this.renderer.setSize(width, height);
    this.renderer.localClippingEnabled = true;
    this.renderer.domElement.style.position = 'absolute';

    var container = this.domElement3D;
    container.appendChild(this.renderer.domElement);

    var v1 = new Viewer3D(this);
    v1.init(this.domElement3D, 0, 0, width, height, "v1", 0xaeaeae);
    this.viewers.push(v1);
    this.mainViewer = v1;

     //start update loop
    this.animate();
}

ViewManager.prototype.animate = function ()
{   
    this.requestId = requestAnimationFrame(this.animate.bind(this));

    for (var i = 0; i < this.viewers.length; i++)
    {
        this.viewers[i].update();
    }

    this.hud_viewer.animate();  
}

// ViewManager.prototype.init = function ()
// {
//     var scene = new THREE.Scene();
//     var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//     var renderer = new THREE.WebGLRenderer();
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     document.body.appendChild( renderer.domElement );

//     var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//     var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//     var cube = new THREE.Mesh( geometry, material );
//     scene.add( cube );

//     camera.position.z = 5;

//     var animate = function () {
// 				requestAnimationFrame( animate );

// 				cube.rotation.x += 0.1;
// 				cube.rotation.y += 0.1;

// 				renderer.render(scene, camera);
// 			};

// 			animate();
// }

