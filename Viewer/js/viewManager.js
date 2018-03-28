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
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

