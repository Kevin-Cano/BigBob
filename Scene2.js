class Scene2 extends Phaser.Scene{
    constructor(){
      super("playGame");
    }

    create(){
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);

      this.add.text(20, 540, "Extra Mayo :", {font: "20px courier new", fill: "white", weight: "bold"});
      

    }
  }
  