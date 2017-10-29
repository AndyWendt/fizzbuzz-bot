import {ChallengeInterface} from "./ChallengeManager";

export class FizzBuzzChallenge implements ChallengeInterface {
    public rules(): string {
        return 'Rules';
    }

    public prepCode(code: string): string {
        return code;
    }

    public passes(result: Array<any>): boolean {
        return true;
    }

}
