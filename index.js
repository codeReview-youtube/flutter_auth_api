const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT  || 4000;

const app = express();
app.use(cors());
app.use(bodyParser());

app.get('/', (req,res) => {
    res.send({
        error: 'not implemented'
    });
});

const tokens = {
    token: 'my_token',
    refreshToken: "my_refresh_token"
};

const clientId = 'I9938b';

app.post('/api/register', (req, res) => {
    if(req.body) {
        const  {email, password} = req.body;
        if(email || (typeof email === 'string' && email.trim() !== '')) {
            res.send({
                ...tokens,
                clientId,
                email,
            });
        } else {
            res.send({
                error: 'Empty request body!'
            })
        }
    } else {
        res.send({
            error: 'Expected request body'
        })
    }
});


const genericError = 'Missing request body parameters!';
app.post('/api/login', (req, res) => {
    if(req.body){
        const { email, password } = req.body;
        if((!email || email.trim()) === '' && !password || password.trim() === '') {
            return res.status(406).send({
                error: genericError
            })
        } else {
            if(password.length < 8) {
                res.status(406).send({
                    error: 'Incorrect Password!'
                })
            }
            // in case of special character 
            if(typeof password === 'string' && password.includes('$')) {
                res.status(406).send({
                    error: 'Special characters are not allowed!'
                })
            }
            if(req.body.token && req.body.token === tokens.token) {
                res.status(200).send({
                    ...tokens,
                    email,
                    clientId,
                });
            } else {
                res.status(406).send({
                    'error': 'invalid or missing token'
                });
            }
        }
    }
});


app.listen(PORT, () => {
    console.log(`SERVER IS RUNING ON SERVER ${PORT}`);
});