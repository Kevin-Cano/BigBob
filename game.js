let config = {
    type: Phaser.AUTO,
    scale: {
        width: 1370,
        height: innerHeight,
    },
    backgroundColor: '#575555',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000,
            },
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

let playerConfig = {
    playerSpeed: 200,
    playerJump: -500,
}

let game = new Phaser.Game(config);

function preload() {
    this.load.image("ground", "assets/ground.png");
    this.load.image("BigBob", "assets/BigBob.png");
    this.load.image("bloc", "assets/bloc.png");
}

function create() {
    W = game.config.width;
    H = game.config.height;
    
    let ground = this.add.tileSprite(0, H - 48, W, 48, "ground");
    ground.setOrigin(0, 0);

    this.physics.add.existing(ground, true);
    this.player = this.physics.add.sprite(40, 50, 'BigBob');
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, ground);

    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.keys = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.Z,
        left: Phaser.Input.Keyboard.KeyCodes.Q,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    let blocs = this.physics.add.staticGroup();
    blocs.create(250, 560, "bloc").refreshBody()
    blocs.create(300, 560, "bloc").refreshBody();
    blocs.create(350, 560, "bloc").refreshBody()
    blocs.create(400, 560, "bloc").refreshBody();
    blocs.create(450, 560, "bloc").refreshBody()
    blocs.create(350, 450, "bloc").refreshBody();

    let platforms = this.physics.add.staticGroup();
    platforms.add(ground);

    this.physics.add.collider(platforms, this.player)
    this.physics.add.collider(this.player, blocs);
    
    this.cameras.main.setBounds(0, 0, W, H);
    this.physics.world.setBounds(0, 0, W, H);

    this.cameras.main.startFollow(this.player, true, true);
    this.cameras.main.setZoom(1.2);
}

function update() {
    this.player.setVelocityX(0);

    if (this.cursors.left.isDown || this.keys.left.isDown) {
        this.player.setVelocityX(-playerConfig.playerSpeed);
    } else if (this.cursors.right.isDown || this.keys.right.isDown) {
        this.player.setVelocityX(playerConfig.playerSpeed);
    }

    if ((this.cursors.up.isDown || this.keys.up.isDown) && this.player.body.touching.down) {
        this.player.setVelocityY(playerConfig.playerJump);
    }

    if (this.cursors.down.isDown || this.keys.down.isDown) {
        this.player.setVelocityY(playerConfig.playerSpeed);
    }
}
