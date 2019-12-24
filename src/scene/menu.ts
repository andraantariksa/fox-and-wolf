import { Models } from "../datastore/score";
import { LiffDecodedProfile } from "liff-type";

export class MenuScene extends Phaser.Scene {
    private topScores: Array<Models.Score>;
    private score: number;
    private gameOverState: boolean;

    constructor() {
        super({
            key: "MenuScene",
        });

        this.topScores = Models.Score.getTop5();
    }

    init(data: any): void {
        this.gameOverState = data.gameOverState;
        this.score = data.score;

        if (this.gameOverState) {
            const profile: any = this.registry.get("profile");
            const tempScore: Models.Score = new Models.Score();
            tempScore
                .setName(profile.displayName)
                .setProfileDetail(profile)
                .setScore(this.score)
                .save();

            this.topScores = Models.Score.getTop5();
        }
    }

    preload(): void {
        this.load.spritesheet("icon-set-blue", "assets/sprite/icon_set_blue.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.image("sky", "assets/background/sky.png");
        this.load.image("ground", "assets/background/ground.png");
    }

    create(): void {
        const gameHeight = Number(this.game.config.height);
        const gameWidth = Number(this.game.config.width);

        // Ground
        this.add.image(gameWidth / 2, gameHeight / 2, "sky");
        const ground = this.physics.add.image(gameWidth / 2, gameHeight / 2, "ground");
        ground.y = gameHeight - (ground.height / 2);
        ground.setImmovable();

        const textGameTitle = this.add.text(
            gameWidth / 2,
            gameHeight / 4,
            this.game.config.gameTitle,
            {
                fontSize: 50,
            }
        );
        textGameTitle.x -= textGameTitle.width / 2;

        const textTapToPlay = this.add.text(
            gameWidth / 2,
            textGameTitle.y + textGameTitle.height + 20,
            "Tap to play",
            {
                fontSize: 25,
            }
        );
        textTapToPlay.x -= textTapToPlay.width / 2;

        const textTopScore = this.add.text(
            gameWidth / 2,
            (gameHeight * (2 / 3)) - 30,
            "Top Scores",
            {
                fontSize: 25,
            }
        );
        textTopScore.x -= textTopScore.width / 2;

        this.topScores.sort(Models.Score.compare);
        this.topScores.forEach((score, number) => {
            this.add.text(
                gameWidth / 6,
                (gameHeight * (2 / 3)) + (18 * number),
                `${number + 1}. ${score.getName()}`,
                {
                    fixedWidth: (gameWidth * (4 / 6)) - 30 - 20,
                }
            );

            this.add.text(
                (gameWidth * (5 / 6)) - 30,
                (gameHeight * (2 / 3)) + (18 * number),
                `${score.getScore()}`,
                {
                    fixedWidth: 30,
                }
            );
        });

        this.input.on("pointerdown", () => {
            this.scene.start("GameScene");
        });
    }
}