import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (!file) return alert("Please select a file!");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8000/gdrive/upload/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("File uploaded successfully! File ID: " + response.data.file_id);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload to Google Drive</button>
        </div>
    );
};

export default Upload;
