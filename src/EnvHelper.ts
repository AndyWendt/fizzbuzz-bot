const dotEnv = require(__dirname + '/../env.json');

export interface Environment {
    SLACK_VERIFICATION_TOKEN: string,
    SLACK_BOT_TOKEN: string,
    SLACK_OAUTH_TOKEN: string
}

export class EnvHelper {

    env: any;

    constructor() {
        this.env = dotEnv;
    }

    public getEnv(): Environment {
        return <Environment> this.parse();
    }

    private parse() {
        try {
            return JSON.parse(this.env);
        }
        catch (e) {
            return this.env;
        }
    }
}

export default new EnvHelper().getEnv();
