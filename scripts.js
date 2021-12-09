document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    let particleArray;

    function Particle (x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    Particle.prototype.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, Math.PI *2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    Particle.prototype.update = function(){
        if (this.x - this.size < 0  || this.x - this.size > window.innerWidth){
            this.directionX = -this.directionX;
        }

        if (this.y - this.size < 0 || this.y - this.size > window.innerHeight){
            this.directionY = -this.directionY;
        }

        

        this.x += this.directionX; 
        this.y += this.directionY; 
        this.draw();
    }

    function init(){
        particleArray = [];
        for (let i=0; i<100; i++){
            let size = (Math.floor(Math.random() * 40)) + 1;
            let x = Math.floor((Math.random() * window.innerWidth - size) + size);
            let y = Math.floor((Math.random() * window.innerHeight - size) + size);
            let directionX = Math.floor((Math.random() * 6) - 3) || 1;
            let directionY = Math.floor((Math.random() * 6) - 3) || 1;
            let particle = new Particle(x, y, directionX, directionY, size, 'white');
            particleArray.push(particle);
            particle.draw();
        }
    }

    function animate(){
        requestAnimationFrame(animate);

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let i = 0; i < particleArray.length; i++){
            particleArray[i].update();
        }
    }

    init();
    console.log(particleArray);
    animate();


})



