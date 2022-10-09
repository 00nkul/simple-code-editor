const express = require('express');
const routes = express.Router();
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs')

const executeCode = async (req, res) => {
    const { code, language } = req.body
    const name = getRandomName();
    let status = "";
    let message = "";
    let fileName = `${name}.${language}`;

    if (language == "cpp") {
        fileName = name + "." + language;
    }

    try {
        fs.writeFileSync(fileName, code);
        runFile(fileName, language)
            .then((response) => {
                console.log(response, "response");
                deleteFile(fileName);
                res.status(200).json({ output: response.output, err: response.err });
                return;
            })
            .catch((err) => {
                console.error(err);
                res.status(400).json({ err });
            })
    } catch (error) {
        console.error(error);
        status = "not ok";
        message = "Something went wrong !"
    }
}

async function runFile(fileName, language) {
    console.log(fileName, "fileName");
    let command = `node ${fileName}`;
    if (language == "js") {
        command = `node ${fileName}`;
    } else if (language == 'py') {
        command = `python3 ${fileName}`;
    } else {
        command = `g++ ${fileName} -o o && ./o`
    }
    const result = { err: '', output: '' };
    try {
        const { stdout, stderr } = await exec(command);
        if (stderr) {
            result.err = stderr
        } else {
            result.output = stdout
        }
        return result;
    } catch (e) {
        let temp = e.stderr
        var lines = temp.split('\n');
        lines.splice(0, 1);
        temp = lines.join('\n');
        result.err = temp;
        return result;
    }
}

const deleteFile = async (fileName) => {
    let command = `rm ${fileName}`;
    if (fileName.endsWith('cpp')) {
        command = `rm ${fileName} && rm o`;
    }
    console.log(command);
    try {
        const { stdout, stderr } = await exec(command);
        if (stderr) {
            return stderr;
        }
    } catch (error) {
        console.log(error);
    }
}

function getRandomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

routes.route('/').post(executeCode);

module.exports = routes;