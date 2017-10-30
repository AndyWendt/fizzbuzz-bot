import * as requestPromise from "request-promise";
import {AttemptInterface, ChallengeManagerInterface, challenges} from "../Challenge/ChallengeManager";
import {InvalidEventError} from "../Errors/InvalidEventError";
import {ChallengeFailure} from "../Challenge/ChallengeFailure";

const WebClient = require('@slack/client').WebClient;

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
        try {
            this.verifyEvent(event);
            let attempt = await this.handleAttempt(event);

            let score = await this.challengeManager.calcScore(attempt);
            await this.sendMessage(event, `Your score for ${attempt.challengeType} is ${score}`);

            return true;
        } catch (e) {
            if (e instanceof ChallengeFailure) {
                await this.sendMessage(event, e.message);
                return false;
            } else {
                throw e;
            }
        }
    }

    private async sendMessage(event: EventInterface, message: string) {
        const webclient = new WebClient(process.env.SLACK_BOT_TOKEN);
        webclient.chat.postMessage(event.channel, message, function (err, res) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Message sent: ', res);
            }
        });
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
