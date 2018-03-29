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
    //this.composer.render();
    this.view_manager.renderer.render(this.scene, this.camera);
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
    this.sceneGlobalOutline = new THREE.Scene();
    this.scene = new THREE.Object3D();
    this.sceneGlobal.add(this.scene);

    // CAMERA ------------------------------------------------------------

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
    this.sceneGlobal.add(this.camera);    
    this.camera.updateProjectionMatrix();

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
}