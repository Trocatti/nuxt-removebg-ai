interface ApiResponse {
    // Define the structure of the expected API response
}

// Typing for the response blob
type ResponseBlob = Blob;

export default defineEventHandler(async (event) => {
    const payload = await readMultipartFormData(event)

    if (!payload) return

    const imageBase64 = payload[0].data.toString('base64')

    const data = {
        "image_file_b64": imageBase64,
        "image_url": "",
        "size": "preview",
        "type": "auto",
        "type_level": "1",
        "format": "auto",
        "roi": "0% 0% 100% 100%",
        "crop": false,
        "crop_margin": "0",
        "scale": "original",
        "position": "original",
        "channels": "rgba",
        "add_shadow": false,
        "semitransparency": true,
        "bg_color": "",
        "bg_image_url": ""
    }

    const apiKey = useAppConfig().REMOVE_BG_TOKEN;

    const response: Blob = await $fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'Accept': 'image/*',
            'Content-Type': 'application/json',
            'X-API-Key': apiKey,
        },
        body: data,
    });

    return response

})