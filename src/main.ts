import "phaser";

import { MenuScene } from "./scene/menu";
import { GameScene } from "./scene/game";
import { BootScene } from "./scene/boot";

const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0,
            }
        }
    },

    title: "Fox and Wolf",
    version: "0.0.1",
    url: "https://andraaa.space/fox-and-wolf/"
    // Development only!
    // url: "https://localhost:10001"
};

const liffConfig = {
    liffId: "1576890362-rD45XzDN",
};

class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);

        this.scene.add("BootScene", BootScene);
        this.scene.add("MenuScene", MenuScene);
        this.scene.add("GameScene", GameScene);

        this.authenticate()
            .then(() => {
                this.scene.start("BootScene");
            });
    }

    async authenticate(): Promise<any> {
        if (!liff.isLoggedIn()) {
            liff.login({
                redirectUri: this.config.gameURL,
            });
        }

        const profile = await liff.getProfile();
        this.registry.set("profile", profile);
    }
}

liff.init(liffConfig)
    .then(() => new Game(gameConfig))
    .catch(() => alert("Error when starting LIFF")
    );