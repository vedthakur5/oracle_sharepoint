import React, { useState } from "react";
import axios from "axios";

const UploadFile = ({ token }) => {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post("http://127.0.0.1:8000/upload", formData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        setFileUrl(res.data.url);
    };

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            {fileUrl && (
                <div>
                    <p>File URL: {fileUrl}</p>
                    <button onClick={() => navigator.clipboard.writeText(fileUrl)}>Copy URL</button>
                </div>
            )}
        </div>
    );
};

export default UploadFile;
