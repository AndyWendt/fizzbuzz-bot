import {NextFunction, Response} from 'express';
import {Request} from '../App';
import {EventHandler, EventHandlerInterface, EventInterface} from "../Events/EventHandler";
import {ChallengeManager} from "../Challenges/ChallengeManager";
import {InvalidEventError} from "../Events/InvalidEventError";
import {Messenger} from "../Slack/Messenger";

export class EventsController {
    eventHandler: EventHandlerInterface;

    constructor(eventHandler: EventHandlerInterface) {
        this.eventHandler = eventHandler;
    }

    public events = (req: Request, res: Response, next: NextFunction) => {
        this.eventHandler.handle(<EventInterface> req.body.event).then((result: boolean) => {
            return res.status(200).json({handled: true});
        }).catch((error: any) => {
            if (error instanceof InvalidEventError) {
                return res.status(200).json({handled: true});
            }

            console.log('error', error);
            return res.status(500).json(error);
        });
    }
}

export default new EventsController(new EventHandler(new ChallengeManager(), new Messenger()));
