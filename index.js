// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const dotenv = require("dotenv")
// dotenv.config()
// const readline = require("readline")

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// const userInterface = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// userInterface.prompt()

// userInterface.on("line", async input => {

//     // For text-only input, use the gemini-pro model
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const result = await model.generateContentStream([input]);
//     for await (const chunk of result.stream) {
//         const chunkText = chunk.text();
//         console.log(chunkText)
//     }
// })

const express = require('express');
const ejs = require('ejs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// app.get('/', (req, res) => {
//     res.render('index');
// });

app.get('/', (req, res) => {
    res.render('pages/index');
});


app.post('/generate', async(req, res) => {
    const input = req.body.input;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContentStream([input]);
    let responseText = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        responseText += chunkText;
    }
    res.render('pages/index', { responseText });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));