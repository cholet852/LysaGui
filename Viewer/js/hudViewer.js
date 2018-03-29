function HUDViewer(viewMan)
{
    this.view_manager = viewMan;

//Stats
    this.stats = new Stats();
    this.stats.setMode(0);

    var div_stat = document.createElement("div");
    div_stat.style.width = "80px";
    div_stat.style.height = "50px";
    div_stat.style.position = "absolute";
    div_stat.style.right = "10px";
    div_stat.style.bottom = "50px";
    div_stat.style.zIndex = "10";
    div_stat.appendChild(this.stats.domElement);

    var container = this.view_manager.domElement3D;
    container.appendChild(div_stat);
}