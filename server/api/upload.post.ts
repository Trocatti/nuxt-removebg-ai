export default defineEventHandler(async (event) => {
    const file = await readMultipartFormData(event)
    const configs = useRuntimeConfig()

    if (!file) {
        return createError({
            status: 400,
            statusMessage: 'file required'
        })
    }

    const imageBase64 = file[0].data.toString('base64')

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

    const apiKey = configs.public.REMOVE_BG_TOKEN
    if (!apiKey) throw new Error('Invalid API Key');

    try {

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

    } catch (error) {
        console.error(error);
    }

    return createError({
        status: 400,
        statusMessage: 'Cloud not found or invalid API'
    })

})