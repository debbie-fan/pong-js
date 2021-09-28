/* setup canvas */ 
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

/* global variables */ 
let keys = [];

/* objects */ 
class Player {
    constructor(x, y, w, h, velX, velY) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.velX = velX;
        this.velY = velY;
        this.score = 0;
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
        const ballX = this.x;
        const ballRightX = this.x + this.size;
        const ballLeftX = this.x - this.size;
        const ballTopY = this.y - this.size;
        const ballBotY = this.y + this.size;

        const p1RightX = player1.x + player1.w;
        const p1LeftX = player1.x;
        const p1TopY = player1.y;
        const p1BotY = player1.y + player1.h;

        const p2RightX = player2.x + player2.w;
        const p2LeftX = player2.x;
        const p2TopY = player2.y;
        const p2BotY = player2.y + player2.h;

        if (ballLeftX <= p1RightX && ballBotY <= p1BotY && ballTopY >= p1TopY && ballLeftX > p1LeftX) {
            console.log('hit p1');
            if (this.velX < 0) {
                this.velX = -(this.velX);
            }
        } 
        if (ballRightX >= p2LeftX && ballBotY <= p2BotY && ballTopY >= p2TopY && ballRightX < p2RightX) {
            console.log('hit p2');
            if (this.velX > 0) {
                this.velX = -(this.velX);
            }
        } 
        if (ballBotY >= p1TopY && ballX <= p1RightX && ballX >= p1LeftX && ballTopY < p1TopY) {
            console.log('hit p1 top');
            if (this.velY > 0) {
                this.velY = -(this.velY);
                this.velX = -(this.velX);
            }
        } 
        if (ballTopY <= p1BotY && ballX <= p1RightX && ballX >= p1LeftX && ballBotY > p1BotY) {
            console.log('hit p1 bot');
            if (this.velY < 0) {
                this.velY = -(this.velY);
                this.velX = -(this.velX);
            }
        }
        if (ballBotY >= p2TopY && ballX <= p2RightX && ballX >= p2LeftX && ballTopY < p2TopY) {
            console.log('hit p2 top');
            if (this.velY > 0) {
                this.velY = -(this.velY);
                this.velX = -(this.velX);
            }
        }
        if (ballTopY <= p2BotY && ballX <= p2RightX && ballX >= p2LeftX && ballBotY > p2BotY) {
            console.log('hit p2 bot');
            if (this.velY < 0) {
                this.velY = -(this.velY);
                this.velX = -(this.velX);
            }
        }
    }

    scoreDetect() {
        if (this.x + this.size >= canvas.width) {
            // player1 scores
            player1.score += 1;
            // restart ball
            this.x = canvas.width/2;
            this.y = canvas.height/2;
        } else if (this.x - this.size <= 0) {
            // player2 scores
            player2.score += 1;
            // restart ball
            this.x = canvas.width/2;
            this.y = canvas.height/2;
        }
    }
};

/* object instances */
let player1;
let player2;
let ball1;

/* functions */
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
        40, 
        canvas.height/2 - 40,
        20,
        100,
        15,
        15
    );

    player2 = new Player(
        canvas.width - 40,
        canvas.height/2 - 40,
        20,
        100,
        15,
        15
    );

    ball1 = new Ball(
        canvas.width/2,
        canvas.height/2,
        7,
        7,
        12
    );
    // start animation loop
    loop();
}

const updateScoreboard = () => {
    // show scoreboard
    const fontSize = canvas.height * 0.30;
    ctx.globalAlpha = 0.5;
    ctx.font = "bold " + fontSize + "px arial";
    ctx.fillStyle = "rgb(175, 238, 238)";
    ctx.textAlign = "center";
    ctx.fillText(player1.score, canvas.width/4, canvas.height/2 + fontSize/4);
    ctx.fillText(player2.score, canvas.width/4*3, canvas.height/2 + fontSize/4);
    ctx.globalAlpha = 1.0;
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

    updateScoreboard();
    player1.draw();
    player2.draw();
    ball1.draw();

    movePlayers();
    ball1.update();

    ball1.collisionDetect();
    ball1.scoreDetect();

    requestAnimationFrame(loop);
}

/* Add event listeners */ 
document.addEventListener('keypress', startGame);