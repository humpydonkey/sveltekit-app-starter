import { fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    return new Response();
};

export const POST: RequestHandler = async (event) => {
    const body = await event.request.json();
    let prompt = body["inputPrompt"];
    console.log(`Received input: ${JSON.stringify(body)}`)
    // if (!prompt) {
    //     return fail(400, { prompt: "Prompt is required" });
    // }
    return await callInference(prompt);
};

const callInference = async (prompt: string) => {
    const modelId = "w7p246w"
    const endpointUrl = `https://app.baseten.co/model_versions/${modelId}/predict`
	console.log(`Calling Baseten with prompt: ${prompt}`);
    const resp = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Api-Key ' + process.env.BASETEN_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "prompt": prompt,
            "use_refiner": true
        }),
    })
    if (resp.status != 200) {
        throw new Error("Failed to get prediction from Baseten")
    }
    const jsonData = await resp.json();
    console.log(`Got response from Baseten: ${jsonData}`)
    const data: string = jsonData["model_output"]["data"];
    console.log(`The size of the image is ${data.length} bytes`);
    return json({data: "data:image/png;base64," + data});
};