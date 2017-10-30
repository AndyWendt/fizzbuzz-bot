import {ChallengeInterface} from "./ChallengeManager";

export class FizzBuzzChallenge implements ChallengeInterface {

    lowerLimit: number;
    upperLimit: number;

    constructor() {
        this.lowerLimit = this.randomInt(1, 10000);
        this.upperLimit = this.lowerLimit + 100;
    }

    public rules(): string {
        return 'Rules';
    }

    public prepCode(code: string): string {
        return code + `\r\n fizzbuzz(${this.lowerLimit}, ${this.upperLimit});`;
    }

    public passes(result: Array<any>): boolean {
        // if (result.length !== 100) {
        //     return false;
        // }

        return true;
    }

    private randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}
