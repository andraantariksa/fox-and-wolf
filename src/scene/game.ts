function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export class GameScene extends Phaser.Scene {
    private character: Phaser.Physics.Arcade.Sprite;
    private wolf: Phaser.Physics.Arcade.Sprite;
    private ground: Phaser.Physics.Arcade.Image;
    private wolfUnjumped: boolean;
    private score: number;
    private scoreText: Phaser.GameObjects.Text;
    private jump: boolean;

    constructor() {
        super({
            key: "GameScene",
        });

        this.jump = false;
        this.wolfUnjumped = true;
        this.score = 0;
    }

    preload(): void {
        this.load.spritesheet("firefox", "assets/sprite/kit_from_firefox.png", {
            frameWidth: 56,
            frameHeight: 80,
        });
        this.load.spritesheet("wolf", "assets/sprite/wolfsheet3-side.png", {
            frameWidth: 64,
            frameHeight: 32,
        });
    }

    create(): void {
        this.jump = false;
        this.wolfUnjumped = true;
        this.score = 0;

        const gameHeight = Number(this.game.config.height);
        const gameWidth = Number(this.game.config.width);

        // Ground and sky
        this.add.image(gameWidth / 2, gameHeight / 2, "sky");
        this.ground = this.physics.add.image(gameWidth / 2, gameHeight / 2, "ground");
        this.ground.y = gameHeight - (this.ground.height / 2);
        this.ground.setImmovable();

        // Firefox
        this.character = this.physics.add.sprite(gameWidth / 4, this.ground.y - (this.ground.height * (1 / 2)), "firefox", 1);
        this.character.setGravityY(500);
        this.character.y -= this.character.height / 2;

        this.physics.add.collider(this.character, this.ground, (_character, _ground) => {
            this.jump = true;
        });

        // Wolf
        this.wolf = this.physics.add.sprite(Number(this.game.config.width), this.ground.y - (this.ground.height * (1 / 2)), "wolf", 1);
        this.anims.create({
            key: "wolf-run",
            frameRate: 15,
            frames: this.anims.generateFrameNumbers("wolf", {
                start: 6,
                end: 10,
            }),
        });
        this.wolf.play("wolf-run");
        this.wolf.anims.setRepeat(-1);
        this.wolf.setScale(2, 2);
        this.wolf.flipX = true;
        this.wolf.setGravityY(0);
        this.wolf.y -= this.wolf.height;
        this.wolf.body.velocity.x = -200;

        this.time.addEvent({
            delay: 3000,
            callback: this.resetWolf,
            callbackScope: this,
            loop: true,
        });

        // Event when the fox collide with the wolf
        this.physics.add.collider(this.wolf, this.character, () => this.scene.start("MenuScene", {
            gameOverState: true,
            score: this.score,
        }));

        // Score
        this.scoreText = this.add.text(0, 0, "Score: -");
    }

    update(): void {
        this.scoreText.setText(`Score ${this.score}`);

        this.input.on("pointerdown", () => {
            if (this.jump) {
                this.character.body.velocity.y = -450;
                this.jump = false;
            }
        });

        if (!this.jump && this.wolf.x < this.character.x && this.wolfUnjumped) {
            this.score += 1;
            this.wolfUnjumped = false;
        }
    }

    resetWolf(): void {
        this.wolfUnjumped = true;
        this.wolf.x = Number(this.game.config.width) + this.wolf.width;
    }
}