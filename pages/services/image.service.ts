const services = {

    post: async function (file: File): Promise<Blob> {
        if (!file) return Promise.reject(new Error('File required'));

        const formData = new FormData();
        formData.append("file", file);

        try {
            const respose: Blob = await $fetch("api/upload", {
                method: "POST",
                body: formData,
            });

            return respose;
        } catch (e) {
            console.error(e);
        }

        return Promise.reject(new Error('Could not upload file'));

    }
}

export default services
