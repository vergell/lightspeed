var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

console.log(canvas);

// Random Integer Generator
function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
     return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
 }


var mCircle = Math.PI * 2;

function Circle(x, y , radius, velocity){
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.velocity = velocity;
    this.radius = radius;
    var alpha = .6;
    var a = 0.09;
    this.zx = this.velocity * (innerWidth / innerHeight) * (this.x - (innerWidth / 2))/innerWidth ;
    this.zy  = this.velocity *  (this.y - (innerHeight / 2))/innerHeight;

    this.draw = function(){
        c.beginPath();
        c.moveTo(this.px,this.py);
        c.lineTo(this.x, this.y);
        c.lineCap = "round";
        c.lineWidth = radius;
        c.strokeStyle = 'white';
        c.globalAlpha = alpha;
        c.stroke();
        
        
    }
    this.update = function(){
        var zx = this.velocity * (innerWidth / innerHeight) * (this.x - (innerWidth / 2))/innerWidth ;
         var zy = this.velocity *  (this.y - (innerHeight / 2))/innerHeight;

        this.x += zx ;
        this.y += zy ;
        this.px += (this.velocity * (innerWidth / innerHeight) * (this.x - (innerWidth / 2))/innerWidth) * .9 ;0
        this.py += (this.velocity *  (this.y - (innerHeight / 2))/innerHeight) * .9;

        this.velocity += 0.4;

        if(alpha > .9){
            a = -a;
        } else {
            a+=.09;
        }
        alpha += a;
        if( this.px > innerWidth || this.px < 0){
            this.x = (Math.random() * innerWidth);
            this.radius = this.radius;
            this.px = this.x;
            this.py = this.y;
            this.velocity = velocity;
        }
        if( this.py > innerWidth || this.py < 0){
            this.y = (Math.random() * innerWidth);
            this.radius = this.radius;
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
    var radius = (Math.random() * 4);
    circleArray.push(new Circle(x , y, radius, 0, .4));
}

console.log(circleArray);

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for( var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
    console.log('adkfl');
}

animate();