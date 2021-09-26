//** setup canvas */ 
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//** global variables */ 
let keys = [];

//** objects */ 
class Player {
    constructor(x, y, w, h, velX, velY) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.velX = velX;
        this.velY = velY;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(175, 238, 238)';
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
    }
};

class Ball {
    constructor (x, y, velX, velY, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(175, 238, 238)';
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= canvas.width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= canvas.height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        const dx1 = this.x - this.size;
        const dy1 = this.y;

        const dx2 = this.x + this.size;
        const dy2 = this.y;

        if (dx1 <= player1.x + player1.w && dy1 >= player1.y && dy1 <= player1.y + player1.h) {
            this.velX = -this.velX;
            this.x += this.velX;
            this.y += this.velY;
        } else if (dx2 >= player2.x && dy2 >= player2.y && dy2 <= player2.y + player2.h) {
            this.velX = -this.velX;
            this.x += this.velX;
            this.y += this.velY;
        }
    }

    scoreDetect() {
        if (this.x >= canvas.width) {
            // player1 scores
        } else if (this.x <= 0) {
            // player2 scores
        }
    }
};

//** object instances */
let player1;
let player2;
let ball1;

//** functions */
const random = (min, max) => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

const startGame = () => {

    // hide menu page
    const menuPage = document.getElementById("menu-page");
    if (menuPage.style.display !== "none") {
        menuPage.style.display = "none";
        // remove event listener
        document.removeEventListener('keypress', startGame);
    } 
    
    // set up canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // define paddles and balls
    player1 = new Player(
        50, 
        canvas.height/2 - 40,
        15,
        100,
        15,
        15
    );

    player2 = new Player(
        canvas.width - 50,
        canvas.height/2 - 40,
        15,
        100,
        15,
        15
    );

    ball1 = new Ball(
        canvas.width/2,
        canvas.height/2,
        5,
        5,
        10
    );

    // start animation loop
    loop();
}

const movePlayers = () => {
    // log pressed keys 
    window.onkeydown = window.onkeyup = (e) => {
        keys[e.keyCode] = e.type == 'keydown';
    }
    if (keys[38]) {
        if (player1.y <= 0) {
            player1.y = 0;
        } else {
            player1.y -= player1.velY;
        }
    }
    if (keys[40]) {
        if (player1.y >= canvas.height - player1.h) {
            player1.y = canvas.height - player1.h;
        } else {
            player1.y += player1.velY;
        }
    }
    if (keys[87]) {
        if (player2.y <=0) {
            player2.y = 0;
        } else {
            player2.y -= player2.velY;
        }
    }
    if (keys[83]) {
        if (player2.y >= canvas.height - player2.h) {
            player2.y = canvas.height - player2.h;
        } else {
            player2.y += player2.velY;
        }
    }
}

const loop = () => {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

    player1.draw();
    player2.draw();
    ball1.draw();

    movePlayers();
    ball1.update();

    ball1.collisionDetect();

    requestAnimationFrame(loop);
}

//** Add event listeners */ 
document.addEventListener('keypress', startGame);