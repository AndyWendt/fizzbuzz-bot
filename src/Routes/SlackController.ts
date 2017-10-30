import {NextFunction, Response} from 'express';
import {Request} from '../App';
import {EventHandler, EventHandlerInterface, EventInterface} from "../Events/EventHandler";
import {ChallengeManager} from "../Challenges/ChallengeManager";
import {InvalidEventError} from "../Events/InvalidEventError";

export class SlackController {
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

            return res.status(500).json(error);
        });
    }
}

export default new SlackController(new EventHandler(new ChallengeManager()));
