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

const clientId = 39939938383;

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


app.post('/api/login', (req, res) => {
    if(req.body){
        const { email, password } = req.body;
        if((!email || email.trim()) === '' && !password || password.trim() === '') {
            return res.send({
                error: 'Requested body is not complete!'
            })
        } else {
            if(password.length < 8) {
                res.send({
                    error: 'Incorrect Password!'
                })
            }
            // in case of special character 
            if(typeof password === 'string' && password.includes('$')) {
                res.send({
                    error: 'Special characters are not allowed!'
                })
            }
            if(req.body.token && req.body.token === tokens.token) {
                res.send({
                    ...tokens,
                    email,
                    clientId,
                });
            } else {
                res.send({
                    error: 'Incorrect token!'
                })
            }
        }
    }
});


app.listen(PORT, () => {
    console.log(`SERVER IS RUNING ON SERVER ${PORT}`);
});