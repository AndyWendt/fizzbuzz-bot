import {VM} from "vm2";
import {FizzBuzzChallenge} from "./FizzBuzzChallenge";

export type challenges = "fizzbuzz";

export interface AttemptInterface {
    code: string
    challengeType: challenges
}

export interface ChallengeInterface {
    instructions(): string

    prepCode(code: string): string

    passes(result: Array<any>): boolean
}

export interface ChallengeManagerInterface {
    calcScore(attempt: AttemptInterface): string

    createAttempt(challengeType: challenges, code: string): AttemptInterface

    challengeTypeIsInvalid(name: string): boolean
}

export interface ChallengeResult {
    result: Array<any>
    elapsedTime: string
}

export class ChallengeManager implements ChallengeManagerInterface {
    challenges = ["fizzbuzz"];

    public calcScore(attempt: AttemptInterface): string {
        let challenge = ChallengeManager.challengeFactory(attempt.challengeType);
        let challengeResult = this.runChallenge(attempt.code, challenge);
        challenge.passes(challengeResult.result);

        return challengeResult.elapsedTime;
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

    private runChallenge(code: string, challenge: ChallengeInterface): ChallengeResult {
        let preppedCode = challenge.prepCode(code);

        const vm = new VM({
            timeout: 1000,
            sandbox: {}
        });

        let start = process.hrtime();
        let result = vm.run(preppedCode);
        let elapsed = ChallengeManager.elapsed(start);

        return {
            result: result,
            elapsedTime: elapsed
        };
    }
}
