import express, { Application, Request, Response } from 'express'
import { Options } from 'python-shell';
import { PythonShell } from 'python-shell';

const app: Application = express()

const port: number = 3001



let options: Options = {
    mode: "text",
    pythonOptions: ['-u'], // get print results in real-time
    args: ['value1']
  };
  

const runPython = async()=>{
    let pyshell = new PythonShell('myscript.py');
    pyshell.send('hello');

    pyshell.on('message', function (message) {
        console.log(message);
    });

    pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
    });
}

app.get('/toto', (req: Request, res: Response) => {
    res.send('Hello toto')
})

app.post('/submit', async(req: Request,res: Response)=>{
    await runPython()
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})