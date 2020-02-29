var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// Random Integer Generator
function getRandom(min, max){
     return (Math.random() * (max - min)) + min;
 }
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
     return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
 }
//mouse object
let mouse = {
    x: 0,
    y: undefined
};
// EventListener Mouse Move
window.addEventListener('mousemove',
function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});
const mCircle = Math.PI * 2;

function Circle(x, y , radius, velocity, tail){
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.tail = tail;
    this.velocity = velocity;
    this.radius = 0;
    this.maxradius = radius;
    var alpha = getRandom(0.65 ,0.95);
    var a = 0.079;
    this.zx = this.velocity * (innerWidth / innerHeight) * (this.x - (innerWidth / 2))/innerWidth ;
    this.zy  = this.velocity *  (this.y - (innerHeight / 2))/innerHeight;

    this.draw = function(){
        c.beginPath();
        c.moveTo(this.px,this.py);
        c.lineTo(this.x, this.y);
        c.lineCap = "round";
        c.lineWidth = this.radius;
        c.strokeStyle = 'white';
        c.globalAlpha = alpha;
        c.stroke();
        
    }
    this.update = function(){
 

        var zx = this.velocity * ((innerWidth / innerHeight) * (this.x - (innerWidth / 2))/innerWidth) ;
        var zy = this.velocity *  ((this.y - (innerHeight / 2))/innerHeight);

        this.x += zx ;
        this.y += zy ;
        this.px += (this.velocity * (innerWidth / innerHeight) * (this.x - (innerWidth / 2))/innerWidth);
        this.py += (this.velocity *  (this.y - (innerHeight / 2))/innerHeight) ;
        
        this.velocity  += mouse.x * .0007;
        if(mouse.x * .003 > (innerWidth * .003) * .4){
            this.px += (this.velocity * (innerWidth / innerHeight) * (this.x - (innerWidth / 2))/innerWidth) * this.tail;
            this.py += (this.velocity *  (this.y - (innerHeight / 2))/innerHeight) * this.tail;
            this.maxradius +=4;
            this.tail = .84;
            this.velocity  += mouse.x * .0009;
            if(this.radius < this.maxradius){
                this.radius +=0.1;
            }
        }
        
    

        if(this.radius < this.maxradius){
            this.radius +=0.03;
        }
        if(alpha > .95){
            a = -a;
        } else if(alpha < .65){
            a = -a;
        }
        alpha += a;
        if( this.px > innerWidth || this.px < 0){
            this.x = (Math.random() * innerWidth);
            this.radius = 0;
            this.maxradius = radius;
            this.tail = tail;
            this.px = this.x;
            this.py = this.y;
            this.velocity = velocity;
        }
        if( this.py > innerWidth || this.py < 0.5){
            this.y = (Math.random() * innerWidth);
            this.radius = 0;
            this.maxradius = radius;
            this.tail = tail;
            this.py = this.y;
            this.px = this.x;
            this.velocity = velocity;
        }
        this.draw();
    }
}

var circleArray = [];

for (var i = 0; i < 300; i++){
    var x = (Math.random() * innerWidth);
    var y = (Math.random() * innerHeight);
    var radius = getRandom(2 , 6);
    circleArray.push(new Circle(x , y, radius, .4, .71));
}

console.log(circleArray);

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for( var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

animate();