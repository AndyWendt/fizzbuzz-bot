import {NextFunction, Response} from 'express';
import {Request} from '../App';

export class SlashController {

    constructor() {
    }

    public slash = (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({handled: true});
    }
}

export default new SlashController();
