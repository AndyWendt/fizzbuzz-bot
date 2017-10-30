import {ChallengeInterface} from "./ChallengeManager";
import {ChallengeFailure} from "./ChallengeFailure";

export class FizzBuzzChallenge implements ChallengeInterface {

    name = 'fizzbuzz';
    lowerLimit: number;
    upperLimit: number;
    numberOfEntries = 101;

    constructor() {
        this.lowerLimit = this.randomInt(1, 10000);
        this.upperLimit = this.lowerLimit + (this.numberOfEntries - 1);
    }

    public instructions(): string {
        return '*Challenge:* Write a function that prints the numbers from _low_ to _high_. ' +
            '\r\n But for multiples of three print “Fizz” instead of the number and for ' +
            'the multiples of five print “Buzz”. \r\nFor numbers which are multiples of both ' +
            'three and five print “FizzBuzz”.  \r\n\r\nFunction signature must be `fizzbuzz(low: int, high: int)`' +
            '\r\n\r\n *Submit code* as a code snippet in javascript form with the name of *fizzbuzz*.';
    }

    public prepCode(code: string): string {
        return code + `\r\n fizzbuzz(${this.lowerLimit}, ${this.upperLimit});`;
    }

    public passes(result: Array<any>): boolean {
        if (result.length !== this.numberOfEntries) {
            throw new ChallengeFailure(`Failed challenge: ${this.name}`)
        }

        return this.checkFizzBuzzArray(result);
    }

    private randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private checkFizzBuzzArray(result: Array<any>) {
        let n = this.lowerLimit;
        for (let i = 0; i < result.length; i++) {
            if ((n % 5) === 0 && (n % 3) === 0) {
                if (result[i] !== 'fizzbuzz') {
                    console.log('false fizzbuzz fail', n, i);
                    return false;
                }

                n++;
                continue;
            }

            if ((n % 5) === 0) {
                if (result[i] !== 'fizz') {
                    console.log('false fizz fail', n, i);
                    return false;
                }

                n++;
                continue;
            }

            if ((n % 3) === 0) {
                if (result[i] !== 'buzz') {
                    console.log('false buzz fail', n, i);
                    return false;
                }

                n++;
                continue;
            }

            if (result[i] !== n) {
                console.log('false n fail', n, i);
                return false;
            }

            n++;
        }

        return true;
    }
}
