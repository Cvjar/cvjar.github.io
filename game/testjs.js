var Container   = PIXI.Container,
    loader          = PIXI.loader,
    resources     = PIXI.loader.resources,
    Graphics      = PIXI.Graphics;
    Text             = PIXI.Text,
    Texture        = PIXI.Texture,
    Sprite          = PIXI.Sprite;
var stage       = new Container(),
    renderer    = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0x1199bb});
document.body.appendChild(renderer.view);

var bgs = PIXI.Texture.fromImage('imgs/bg.gif');
var bg = new PIXI.extras.TilingSprite(bgs, renderer.width*2, renderer.height*2);
bg.anchor.set(0.5, 0.5); bg.scale.set(2);
bg.alpha = 0.4;
var texture = PIXI.Texture.fromImage('imgs/1.png');
var bunny = new Sprite(texture);
bunny.anchor.set(0.5, 0.5);
bunny.position.set(renderer.width/2-bunny.width/2, renderer.height/3*1.2);
bunny.width = 250;
bunny.height = 250;
var texture2 = PIXI.Texture.fromImage('imgs/2.png');

var _lev = 1;
var _style =  {
        font: '24px Arial',
        fill: '#F7edca',
        align: 'center'
    }
var text = new Text(
    "20", _style
);
var title = new Text('24',  {
        font: '25px Arial',
        fill: '#00FF00',
        align: 'center'
    });
title.text = "按着笑脸                       \n                接近"+_lev+"秒钟放开~！"
text.position.set(renderer.width/2, renderer.height/3*2);  text.anchor.set(.5)
title.position.set(renderer.width/2, renderer.height/10);   title.anchor.set(0.5)

var con = new Container();
con.addChild(bunny);
con.addChild(text);
con.addChild(title)
stage.addChild(bg)
stage.addChild(con);


bunny.interactive = true;
bg.interactive = true;

bunny.on('mousedown', function(){Tclick();   this.texture = texture2});
bunny.on('mouseup', function(){Tclick();   this.texture = texture});
//bunny.on('mouseout', function(){Tclick();   this.texture = texture});
bunny.on('touchstart',  function(){Tclick();   this.texture = texture2});
bunny.on('touchend', function(){Tclick();   this.texture = texture});
bunny.on('touchout', function(){Tclick();   this.texture = texture});

animate();
var c=new Date().getTime();;
var ti=0;
var temp;
var _once = true;
var gameover = false;
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
        
    }else{
        gameover = true;
        _once = true;

    }

    if (gameover) {
        gameover = false;
        var _t = ti - temp;
        if (_t>1000) {
            text.text = '早就超时啦，\n你真是笨死了~！'
        }else if (_t>500) {
            text.text = '时间为:'+_t +'  不错，非常有潜力！';
        }else if (_t>0) { text.text = text.text = '叫你按一秒,\n不是一毫秒，\n专心点听课!';; }
        else{
            text.text = "按笑脸开始游戏！";
        }
        gameover = false;
    };
}

var _cli = false;
function Tclick(){
    if(_cli){
        c = new Date().getTime();
    }
    _cli = !_cli;
}
