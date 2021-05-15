let canvas = null;
let ctx = null;
let spriteList = [];

window.addEventListener("load", () => {
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    tick();
})

const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.01) {
        spriteList.push(new Pluie(2068, 280));
        spriteList.push(new Pluie(2088, 280));
    }

    if (Math.random() < 0.01) {
        spriteList.push(new Pluie(2088, 280));
    }
    
    for (let i = 0; i < spriteList.length; i++) {
        const sprite = spriteList[i];
        let alive = sprite.tick();

        if (!alive) {
            spriteList.splice(i, 1);
            i--;
        }
    }

    window.requestAnimationFrame(tick);
}

class Pluie {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.square_size = Math.random() * 4 + 2;
        this.speed = this.square_size;
    }

    tick () {
        let alive = true;

        this.y += this.speed;

        ctx.fillStyle = "rgba(255, 0, 0, 1)";
        ctx.fillRect(this.x, this.y, this.square_size, this.square_size);

        if (this.y > 830) {
            alive = false;
        }

        return alive;
    }
}