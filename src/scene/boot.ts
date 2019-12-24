export class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: "BootScene",
        });
    }

    preload(): void {
        this.load.audio("music-menu", "assets/audio/Winds Of Stories.ogg");
    }

    create(): void {
        // setTimeout(() => this.scene.start("MenuScene"), 3000);
        const center_x = Number(this.game.config.width) / 2;
        const title = this.add.text(
            center_x,
            Number(this.game.config.height) / 2,
            this.game.config.gameTitle,
            {
                fontSize: 50,
            }
        );
        title.x -= title.width / 2;
        title.y -= title.height / 2;

        const tapAnywhereToContinue = this.add.text(
            center_x,
            title.y + (title.height / 2) + 30,
            `Tap anywhere to continue`,
            {
                fontSize: 20,
            }
        );
        tapAnywhereToContinue.x -= tapAnywhereToContinue.width / 2;

        this.input.on("pointerdown", () => {
            this.sound.play("music-menu", {
                loop: true,
            });
            this.scene.start("MenuScene");
        });
    }
}