import {VM} from "vm2";
import {FizzBuzzChallenge} from "./FizzBuzzChallenge";

export type challenges = "fizzbuzz";

export interface AttemptInterface {
    code: string
    challengeType: challenges
}

export interface ChallengeInterface {
    rules(): string

    prepCode(code: string): string

    passes(result: Array<any>): boolean
}

export interface ChallengeManagerInterface {
    calcScore(attempt: AttemptInterface): string

    createAttempt(challengeType: challenges, code: string): AttemptInterface

    challengeTypeIsInvalid(name: string): boolean
}

export class ChallengeManager implements ChallengeManagerInterface {
    challenges = ["fizzbuzz"];

    public calcScore(attempt: AttemptInterface): string {
        let challenge = ChallengeManager.challengeFactory(attempt.challengeType);

        const vm = new VM({
            timeout: 1000,
            sandbox: {}
        });

        let code = challenge.prepCode(attempt.code);

        let start = process.hrtime();
        let result = vm.run(code);
        let elapsed = ChallengeManager.elapsed(start);

        let pass = challenge.passes(result);

        if (pass === false) {
            return "FAILURE";
        }

        return elapsed;
    }

    public challengeTypeIsInvalid(name: string): boolean {
        return this.challenges.indexOf(name) < 0;
    }

    public createAttempt(challengeType: challenges, code: string): AttemptInterface {
        return {
            code: code,
            challengeType: challengeType
        }
    }

    public static challengeFactory(type: challenges) {
        // Since there's only fizzbuzz right now, we can just new it up right here
        return new FizzBuzzChallenge();
    }

    private static elapsed(start): string {
        let precision = 3;
        let elapsed = process.hrtime(start)[1] / 1000000;
        return `${process.hrtime(start)[0]}s ${elapsed.toFixed(precision)}ms`;
    }
}
