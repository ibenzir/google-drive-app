import React, { useEffect, useState } from "react";
import axios from "axios";

const Files = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/gdrive/files/")
            .then(res => setFiles(res.data.files))
            .catch(err => console.error("Error fetching files:", err));
    }, []);

    return (
        <div>
            <h2>Google Drive Files</h2>
            <ul>
                {files.length > 0 ? (
                    files.map(file => <li key={file.id}>{file.name}</li>)
                ) : (
                    <p>No files found.</p>
                )}
            </ul>
        </div>
    );
};

export default Files;
