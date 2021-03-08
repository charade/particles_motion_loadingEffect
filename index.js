let canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
let ctx = canvas.getContext('2d');
let particlesArrMotion = [];
let nbParticlesMotion = 300;
//On place les particules à écart régulier
let disFromCenter = 30;

let mouse = {
    x : null,
    y : null
}
canvas.addEventListener('mousemove',(e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
})

let color = ['#F25050','#91AAF2','#F2B199','#F25252','#F2A03D','#BF7C63','#3A758C',
             '#99E2F2','#B7BF7A','#D95448','#57F2B9','#73605A','#F2AB27','#F29B9B',
             '#9AB5D9','#F2D06B','#AC8FBF','#BF0A2B','#BCD991','#F28F38','#745DA6']
class ParticleMotion{
    constructor(x,y){
        this.x = null;
        this.y = null;
        this.base = {
            x: x,
            y :y,
        }
        this.radius = 4*Math.random() + 4;
        this.angle= Math.random() * 2 * Math.PI;
        this.randomRange = 100*Math.random() + 100 ;
        this.speed = Math.random() + 1;
        this.color = color[Math.floor(Math.random()*color.length)]
        
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        // ctx.strokeStyle ='silver'
        // ctx.stroke()
        ctx.fill();
        ctx.closePath();
    }

    update(){
        this.followMouse(mouse);
        this.x = this.base.x + this.randomRange*Math.sin(this.angle);
        this.y = this.base.y + this.randomRange*Math.cos(this.angle);
        //on incrémente l'angle pour la rotation
        this.angle += this.speed/100;
    }
    followMouse(e){
        this.base.x = e.x;
        this.base.y = e.y;
    }
}

function load(){
    for(let i =0; i < nbParticlesMotion; i++){
        particlesArrMotion.push(new ParticleMotion(canvas.width/2,canvas.height/2))
    }
}
load();


function animate(){
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    for(let el of particlesArrMotion){
        el.draw()
        el.update();
    }
    ctx.fillStyle = 'rgba(0,0,0,0.05)'
    requestAnimationFrame(animate)
}
animate()