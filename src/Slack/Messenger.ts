const WebClient = require('@slack/client').WebClient;
import env from "../EnvHelper";

export interface MessengerInterface {
    sendMessage(channel: string, message: string): Promise<boolean>
}

export class Messenger implements MessengerInterface {

    public sendMessage(channel: string, message: string): Promise<boolean> {
        const webclient = new WebClient(env.SLACK_BOT_TOKEN);
        return new Promise((resolve, reject) => {
            webclient.chat.postMessage(channel, message, function (err, res) {
                if (err) {
                    console.log('Error:', err);
                    reject(false);
                } else {
                    console.log('Message sent');
                    resolve(true);
                }
            });
        });
    }
}
