import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
chai.use(chaiHttp);

let agent = chai.request.agent('http://localhost:8080');

describe('Url Verification', () => {
    it('fails if the token does not match', (done) => {
        agent.post('/events')
            .send({
                "token": "foobar",
                "challenge": "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
                "type": "url_verification"
            }).end(function (err, res) {
                chai.expect(res).to.have.status(401);
                done();
            });
    });

    it('fails event type is url_verification, it should return the challenge', (done) => {
        let body = {
            "token": "Jhj5dZrVaK7ZwHHjRyZWjbDl",
            "challenge": "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
            "type": "url_verification"
        };

        agent.post('/events')
            .send(body).end(function (err, res) {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body.challenge).to.equal(body.challenge);
                done();
            });
    });

    // it('fails event type is url_verification, it should return the challenge', (done) => {
    //     agent.post('/events')
    //         .send({
    //             "token": "Jhj5dZrVaK7ZwHHjRyZWjbDl",
    //             "challenge": "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
    //             "type": "url_verification"
    //         }).end(function (err, res) {
    //             chai.expect(err).to.be.null;
    //             chai.expect(res).to.have.status(200);
    //             done();
    //         });
    // });
});
