let config = {
    type: Phaser.AUTO,
    scale: {
        width: 1370,
        height: window.innerHeight, // Ajustement de la hauteur en fonction de la fenêtre
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
    playerJump: -575,
    dashSpeed: 600,
    dashDuration: 200, 
    dashCooldown: 1000 
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
        shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
    });

    let blocs = this.physics.add.staticGroup();
    blocs.create(250, 560, "bloc").refreshBody();
    blocs.create(300, 560, "bloc").refreshBody();
    blocs.create(350, 560, "bloc").refreshBody();
    blocs.create(400, 560, "bloc").refreshBody();
    blocs.create(450, 560, "bloc").refreshBody();
    blocs.create(350, 450, "bloc").refreshBody();

    let platforms = this.physics.add.staticGroup();
    platforms.add(ground);

    this.physics.add.collider(platforms, this.player);
    this.physics.add.collider(this.player, blocs);
    
    this.cameras.main.setBounds(0, 0, W, H);
    this.physics.world.setBounds(0, 0, W, H);

    this.cameras.main.startFollow(this.player, true, true);
    this.cameras.main.setZoom(1.2);

    this.lastLeftPressTime = 0;
    this.lastRightPressTime = 0;
    this.lastDash = 0;
    this.isDashing = false;
    this.dashEndTime = 0;
}

function update(time, delta) {
    let currentTime = this.time.now;

    if (this.isDashing && currentTime >= this.dashEndTime) {
        this.isDashing = false;
    }

    if (!this.isDashing) {
        handleMovement.call(this, currentTime);
    }

    if (this.cursors.up.isDown || this.keys.up.isDown) {
        if (this.player.body.touching.down) { 
            this.player.setVelocityY(playerConfig.playerJump); 
        }
    }

    function handleMovement(currentTime) {
        let velocityX = 0;

        if (this.cursors.left.isDown || this.keys.left.isDown) {
            velocityX = -playerConfig.playerSpeed; 
            this.lastLeftPressTime = currentTime;
            startDash.call(this, -playerConfig.dashSpeed, currentTime);
        } else if (this.cursors.right.isDown || this.keys.right.isDown) {
            velocityX = playerConfig.playerSpeed; 
            this.lastRightPressTime = currentTime;
            startDash.call(this, playerConfig.dashSpeed, currentTime);
        }

        if (!this.isDashing) {
            this.player.setVelocityX(velocityX); 
        }
    }

    function startDash(speed, currentTime) {
        if (this.keys.shift.isDown && currentTime > this.lastDash + playerConfig.dashCooldown) {
            this.isDashing = true;
            this.player.setVelocityX(speed); 
            this.dashEndTime = currentTime + playerConfig.dashDuration; 
            this.lastDash = currentTime;
        }
    }
}
