var Container = PIXI.Container,
    loader                  = PIXI.loader,
    resources               = PIXI.loader.resources,
    Graphics                = PIXI.Graphics;
    Text                    = PIXI.Text,
    Texture                 = PIXI.Texture,
    Sprite                  = PIXI.Sprite;
var stage       = new Container(),
    renderer    = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0x1199bb});
document.body.appendChild(renderer.view);

var texture = PIXI.Texture.fromImage('bunny.png');
var bunny = new Sprite(texture);
bunny.anchor.set(0.5, 0.5);
bunny.position.set(renderer.width/2-bunny.width/2, renderer.height/3-bunny.height/2);
bunny.scale.set(5, 5);

var text = new Text(
    "hello", {
        font: '36px Arial',
        fill: '#F7edca',
        align: 'center'
    }
);
text.position.set(renderer.width/2-20, renderer.height/2+20)

var con = new Container();
con.addChild(bunny);
con.addChild(text);
stage.addChild(con);

bunny.interactive = true;

bunny.on('mousedown', Tclick);
bunny.on('mouseup', Tclick)
bunny.on('touchstart', Tclick);
bunny.on('touchend', Tclick)

animate();
var c=new Date().getTime();;
var ti=0;
var temp;
var _once = true;
function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);

    if(_cli){
        ti = new Date().getTime() - c
        if(_once) {
            temp = ti;
            _once = false;
        }
        console.log(ti-temp);
        text.text = ti - temp;
    }else{
        _once = true;
    }
}

var _cli = false;
function Tclick(){
    if(_cli){
        c = new Date().getTime();
    }
    _cli = !_cli;
}