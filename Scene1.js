class Scene1 extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }

    preload() {
        this.load.image("background", "assets/images/background.jpg");
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        setTimeout(function() {
    }, 100);
    this.scene.start("playGame");
    }
}
    