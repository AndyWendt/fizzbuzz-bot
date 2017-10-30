import {NextFunction, Response} from 'express';
import {Request} from '../App';

export class SlashController {

    constructor() {
    }

    public slash = (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({
            text: '*Which challenge would you like to try?*',
            attachments: [
                {
                    color: '#5A352D',
                    callback_id: 'options',
                    text: '', // attachments must have text property defined (abstractable)
                    actions: [
                        {
                            name: 'select_type',
                            type: 'select',
                            options: [
                                {
                                    "text": "FizzBuzz",
                                    "value": "fizzbuzz"
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    }
}

export default new SlashController();
