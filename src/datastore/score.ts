// import * as firebase from "firebase/app";
// import "firebase/database";
import FirebaseDB from "./firebase";

export namespace Models {
    export class Score {
        private score: number;
        private name: string;
        private profileDetail: object;
        // private static reference: firebase.database.Reference = FirebaseDB.ref("lari!!!/score");
        private static reference: any = FirebaseDB.ref("fox-and-wolf");

        setScore(score: number): Score {
            this.score = score;
            return this;
        }

        setName(name: string): Score {
            this.name = name;
            return this;
        }

        setProfileDetail(profileDetail): Score {
            this.profileDetail = profileDetail;
            return this;
        }

        getScore(): number {
            return this.score;
        }

        getName(): string {
            return this.name;
        }

        save(): void {
            Score.reference.push({
                name: this.name,
                profileDetail: this.profileDetail,
                score: this.score,
            });
        }

        static getTop5(): Array<Score> {
            const output: Array<Score> = new Array<Score>();
            Score.reference.orderByChild("score").limitToLast(5).on("value", (data) => {
                const dataVal = data.val();
                if (dataVal) {
                    Object.keys(dataVal).forEach((key) => {
                        output.push(
                            new Score()
                                .setName(dataVal[key].name)
                                .setProfileDetail(dataVal[key].profileDetail)
                                .setScore(dataVal[key].score)
                        );
                    });
                }
            });
            return output;
        }

        static compare(a: Score, b: Score): number {
            if (a.score > b.score) {
                return -1;
            } else if (a.score < b.score) {
                return 1;
            } else {
                return 0;
            }
        }
    }

}