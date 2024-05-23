let config = {
    type: Phaser.AUTO,
    scale: {
        width: 1370,
        height: innerHeight,
    },
    backgroundColor: '#575555',
    
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

let game = new Phaser.Game(config);

function preload() {
    this.load.image("ground", "assets/ground.png");
    this.load.image("BigBob", "assets/BigBob.png");
}

function create() {
    W = game.config.width;
    H = game.config.height;
    let ground = this.add.tileSprite(0, H - 48, W, 48, "ground");
    ground.setOrigin(0, 0);

    this.player = this.add.sprite(40, 540, 'BigBob', 8);
}

function update() {

}