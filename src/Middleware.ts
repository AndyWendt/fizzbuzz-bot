import {Router, Request, Response, NextFunction} from 'express';

export default class Middleware {
    public static checkBodyToken(req: Request, res: Response, next: NextFunction) {
        if (req.body.token !== req.webtaskContext.secrets.SLACK_VERIFICATION_TOKEN) {
            return res.status(401).json({
                "error": "unauthorized"
            });
        }

        next();
    }

    public static urlVerification(req: Request, res: Response, next: NextFunction) {
        if (req.body.type === "url_verification") {
            return res.status(200).json({
                challenge: req.body.challenge
            });
        }

        next();
    }
}


