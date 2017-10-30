export class ChallengeFailure extends Error {
    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, ChallengeFailure.prototype);
    }
}
