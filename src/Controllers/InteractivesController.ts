import {NextFunction, Response} from 'express';
import {Request} from '../App';
import {FizzBuzzChallenge} from "../Challenges/FizzBuzzChallenge";

export class InteractivesController {

    constructor() {
    }

    public interaction = (req: Request, res: Response, next: NextFunction) => {
        //console.log(req.body.actions[0].selected_options[0]);

        // This is cheating but currently this is the only challenge.  Otherwise, we'd select it from
        // the challenges list.
        let fizzBuzz = new FizzBuzzChallenge();
        return res.status(200).json({
            text: fizzBuzz.instructions(),
            replace_original: true,
        });
    };
}

export default new InteractivesController();
