import express, { Application, Request, Response } from 'express'
import { Options } from 'python-shell';
import { PythonShell } from 'python-shell';
const fs = require('fs')

const app: Application = express()

// middleware
app.use(express.json());
app.use(express.urlencoded());

var cors = require('cors');
app.use(cors());

const port: number = 3001


app.get('/toto', (req: Request, res: Response) => {
    res.send('Hello toto')
})

const code = `print(123214)
print(123534214)
n = input()
print(n)
n = input()
print(n)`


app.post('/submit', async(req: Request,res: Response)=>{
    const code = req.body.code;
    fs.writeFile('myscript.py', code, (err:any) => {
        if (err) throw err;
    })

    let pyshell = new PythonShell('myscript.py');
    console.log(req.body.input)
    const input = req.body.input;
    console.log(input)

    for(let i=0; i<input.length;i++){
        pyshell.send(input[i]);
    }

    let data: any = []

    pyshell.on('message', function (message) {
        console.log(message)
        data.push(message)
    });

    
    pyshell.end(function (err,code,signal) {
        res.send({data})
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        if (err) {
            console.log(err)
        };
        console.log('finished');
    });
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})