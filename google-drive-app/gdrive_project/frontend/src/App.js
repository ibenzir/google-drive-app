import React, { useState } from "react";
import GoogleAuth from "./components/GoogleAuth";
import Upload from "./components/Upload";
import Files from "./components/Files";

function App() {
    const [auth, setAuth] = useState(null);

    return (
        <div>
            <h1>Google Drive File Manager</h1>
            {!auth ? <GoogleAuth setAuth={setAuth} /> : (
                <>
                    <Upload />
                    <Files />
                </>
            )}
        </div>
    );
}

export default App;
