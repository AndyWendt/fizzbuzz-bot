import {Router, Request, Response, NextFunction} from 'express';

export class SlackController {
    public events(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({
            foo: "bar"
        });
    }
}

export default new SlackController();
