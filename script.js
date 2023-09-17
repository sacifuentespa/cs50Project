window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 640;

    // Had to begin with OOP

    class Player {
        constructor(game) {
            this.game = game;
            this.collisionX = this.game.width * 0.5;
            this.collisionY = this.game.height * 0.5;
            this.collisionRadius = 30;
            this.speedX = 1;
            this.speedY = 1;
            this.dx = 0;
            this.dy = 0;
        }

        draw(context) {
            context.beginPath();
            context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            context.save();
            context.globalAlpha = 0.5;
            context.fill();
            context.restore();
            context.beginPath();
            context.moveTo(this.collisionX, this.collisionY);
            context.lineTo(this.game.mouse.x, this.game.mouse.y);
            context.stroke();
        }

        update(){
            // dx and dy represente the distance x and y from the mouse to the player.
            this.dx = this.game.mouse.x - this.collisionX;
            this.dy = this.game.mouse.y - this.collisionY;
            // distace from mouse to player calculated with the hypotenuse.
            const distance = Math.hypot(this.dy, this.dx);
            this.speedX = (this.dx/distance)*1.5 || 0;
            this.speedY = (this.dy/distance)*1.5 || 0;
            this.collisionX += this.speedX;
            this.collisionY += this.speedY;
        }
    }

    class Obstacle {
        constructor(game){
            this.game = game;
            this.collisionX = Math.random() * this.game.width;
            this.collisionY = Math.random() * this.game.height;
            this.collisionRadius = 50;
        }
        draw(context){
            context.beginPath();
            context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            context.save();
            context.globalAlpha = 0.5;
            context.fill();
            context.restore();
        }
    }

    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.player = new Player(this);
            this.numberOfObstacles = 5;
            this.obstacle = [];
            this.mouse = {
                x: this.width * 0.5,
                y: this.height * 0.5,
                pressed: false
            }

            //event listeners 
            canvas.addEventListener('mousedown', (e) => {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = true;
            })

            canvas.addEventListener('mouseup', (e) => {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = false;
            })

            canvas.addEventListener('mousemove', (e) => {
                if(this.mouse.pressed){
                    this.mouse.x = e.offsetX;
                    this.mouse.y = e.offsetY;
                }
                
            })
        }
        render(context) {
            this.player.draw(context);
            this.player.update();
        }
    }

    const game = new Game(canvas);
    game.render(ctx);

    function animate(){
        ctx.clearRect(0,0, canvas.width, canvas.height)
        game.render(ctx);
        requestAnimationFrame(animate)
    }
    animate();
});
