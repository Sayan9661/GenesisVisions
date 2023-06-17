// route used to generate image with api
import JsonBigint from "json-bigint";
const REQUEST_TIMEOUT_SEC = 60000

import express from "express";
import * as dotenv from 'dotenv';
import { Configuration,OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey:process.env.OPEN_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.send('hello from DALLE');
});

// router.route('/').post(async (req, res) => {
//     try {
//         const { prompt } = req.body;

//         const aiResponse = await openai.createImage({
//             prompt,
//             n: 1,
//             size: '1024x1024',
//             response_format: 'b64_json'
//         });

//         const image = aiResponse.data.data[0].b64_json;

//         res.status(200).json({ photo: image });
//     }
//     catch (error) {
//         console.log(error);
//         res.status(500).send(error?.response.data.error.message);
//     }
// })

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const text = prompt;
        // console.log(prompt);
        const aiResponse = await Promise.race([
        (await fetch(`https://gaming-fiber-proceeding-possess.trycloudflare.com` + `/generate`, {
                method: 'POST',
                headers: {
                    'Bypass-Tunnel-Reminder': "go"
                },
                body: JSON.stringify({
                    text,
                    'num_images': 1,
                })
            }
        ).then((aiResponse) => {
            if (!aiResponse.ok) {
                throw Error(aiResponse.statusText);
            }
            return aiResponse
        })).text(),
            new Promise((_, reject) => setTimeout(
            () => reject(new Error('Timeout')), REQUEST_TIMEOUT_SEC))
    ]);

        const image = (JsonBigint.parse(aiResponse))['generatedImgs'];
        console.log(image);
        res.status(200).json({ photo: image });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})




// export async function callDalleService(backendUrl, text, numImages) {

//     const response = await Promise.race([
//         (await fetch(backendUrl + `/generate`, {
//                 method: 'POST',
//                 headers: {
//                     'Bypass-Tunnel-Reminder': "go"
//                 },
//                 body: JSON.stringify({
//                     text,
//                     'num_images': numImages,
//                 })
//             }
//         ).then((response) => {
//             if (!response.ok) {
//                 throw Error(response.statusText);
//             }
//             return response
//         })).text(), new Promise((_, reject) => setTimeout(
//             () => reject(new Error('Timeout')), REQUEST_TIMEOUT_SEC))
//     ]);


//     return {
        
//         'serverResponse': JsonBigint.parse(response)
//     }
// }

export default router;