import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "your-google-client-id";  // Replace with actual client ID

const GoogleAuth = ({ setAuth }) => {
    const onSuccess = (credentialResponse) => {
        console.log("Login Success:", credentialResponse);
        setAuth(credentialResponse.credential);
    };

    const onFailure = () => {
        console.log("Login Failed");
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
