import type { Component } from 'solid-js';
import useGoogleLogin from './hooks/useGoogleLogin';
import { GoogleOAuthProvider } from './contexts/GoogleOAuthProvider';
const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID;
const googleClientNonce = import.meta.env.VITE_GOOGLE_OAUTH2_NONCE;

const ButtonComponent: Component = () => {
    const login = useGoogleLogin({
        onSuccess: codeResponse => {
            // NOTE: Here You can utilize the auth-code or access_token as you see fit
            // console.log('Success :=>', codeResponse.code); // 'auth-code'
            // console.log('Success :=>', codeResponse.access_token); // 'implicit'
        },
        onError: errorResponse => {
            console.error('Error :=>', errorResponse);
        },
        flow: 'auth-code', // change to 'implicit' for access_token
    });
    return <button onClick={login}>Login With Google</button>;
};

const App: Component = () => {
    return (
        <>
            <GoogleOAuthProvider
                clientId={googleClientId}
                nonce={googleClientNonce}>
                <ButtonComponent />
            </GoogleOAuthProvider>
        </>
    );
};

export default App;
