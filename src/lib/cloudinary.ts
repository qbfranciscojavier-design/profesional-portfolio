// src/lib/cloudinary.ts

export const uploadToCloudinary = async (file: File) => {
    const cloudName = "dsuglwpeq"; // <--- ¡CÁMBIALO POR TU CLOUD NAME!
    const uploadPreset = "cv_paco_preset"; // Este es el que acabamos de configurar

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Error al subir a Cloudinary");
        }

        // Retornamos la URL segura
        return data.secure_url;

    } catch (error) {
        console.error("Error subiendo a Cloudinary:", error);
        throw error;
    }
};