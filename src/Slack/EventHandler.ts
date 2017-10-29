import * as requestPromise from "request-promise";
import {AttemptInterface, ChallengeManagerInterface, challenges} from "../Challenge/ChallengeManager";
import {InvalidEventError} from "../Errors/InvalidEventError";

export interface EventHandlerInterface {
  handle(event: EventInterface): Promise<boolean>;
}

interface FileInterface {
    id: string
    name: string
    title: string
    filetype: string
    pretty_type: string
    user: string
    url_private_download: string
    url_private: string
    permalink_public: string
}

export interface EventInterface {
    type: string
    subtype?: string
    channel: string
    username?: string
    bot_id?: string
    ts: string
    event_ts: string
    text?: string
    file?: FileInterface
}


export class EventHandler implements EventHandlerInterface {

    challengeManager: ChallengeManagerInterface;

    constructor(challengeManager: ChallengeManagerInterface) {
        this.challengeManager = challengeManager;
    }

    public async handle(event: EventInterface) {
        this.verifyEvent(event);

        let attempt = await this.handleAttempt(event);
        let score = await this.challengeManager.calcScore(attempt);
        console.log(score);

        return true;
    }

    private async handleAttempt(event: EventInterface): Promise<AttemptInterface> {
        let code = await this.retrieveFile(event);
        return this.challengeManager.createAttempt(<challenges> event.file.title, code);
    }

    private async retrieveFile(event: EventInterface) {
        const options = {
            method: 'GET',
            uri: event.file.url_private,
            headers: {
                Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
            }
        };

        return await requestPromise(options);
    }

    private verifyEvent(event: EventInterface) {
        if (event.type !== 'message' && event.subtype !== 'file_share') {
            throw new InvalidEventError('Event is not a message file_share');
        }

        if (event.file.filetype !== 'javascript') {
            throw new InvalidEventError('incorrect filetype');
        }

        if (this.challengeManager.challengeTypeIsInvalid(event.file.title)) {
            throw new InvalidEventError('Challenge type is invalid');
        }
    }
}
