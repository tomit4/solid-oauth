# Solid OAuth2 | Google

**:construction: This project is a WIP and is not yet a finished package**

## Introduction

This repository contains the source code for integrating the
[Google Identity Services SDK](https://developers.google.com/identity/gsi/web/guides/overview)
with [SolidJS](https://www.solidjs.com/).

It is a near one for one port of the
[react-oauth](https://github.com/MomenSherif/react-oauth) package.

### An Ongoing Project

I wrote this to simply bring this package over to SolidJS, and at the time of
this writing it has not yet been bundled into a package for
[npm](https://www.npmjs.com/). Thusly, it has only bare minimum functionality
when compared with its React counterpart, but if you just need a simple Google
OAuth2 login page that can retrieve the access code or access token, you will
find this sufficient.

### Installation

You'll first need to clone this repository:

```sh
git clone https://github.com/tomit4/solid-oauth
```

Then it's just a matter of using your preferred package manager to install the
dependencies and run the server. I decided to use [bun](https://bun.sh/) for
this particular project, so installation examples will be using `bun`. That
said, you can easily use `npm` or `pnpm` if you so desire to do the same.

```sh
bun install
```

Finally you can run the server by invoking the `dev` command with `bun`:

```sh
bun dev
```

### Basic Usage

You can then open up your browser to the default port 3000:
<em>localhost:3000</em>, and you will be presented with a simple "Login With
Google" button. Clicking on it will bring up the familiar Google Login Window
from which you can sign in. Note that the authentication process does not give
any visual output in the browser at this time.

Diving into the basic code a bit, you'll find located within the App.tsx file
you will find a basic demonstration of the <GoogleOAuthProvider> context
provider component, and also use of the `useGoogleLogin` hook:

```tsx
import type { Component } from "solid-js";
import useGoogleLogin from "./hooks/useGoogleLogin";
import { GoogleOAuthProvider } from "./contexts/GoogleOAuthProvider";
const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID;
const googleClientNonce = import.meta.env.VITE_GOOGLE_OAUTH2_NONCE;

const ButtonComponent: Component = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // NOTE: Here You can utilize the auth-code or access_token as you see fit
      // console.log('Success :=>', codeResponse.code); // 'auth-code'
      // console.log('Success :=>', codeResponse.access_token); // 'implicit'
    },
    onError: (errorResponse) => {
      console.error("Error :=>", errorResponse);
    },
    flow: "auth-code", // change to 'implicit' for access_token
  });
  return <button onClick={login}>Login With Google</button>;
};

const App: Component = () => {
  return (
    <>
      <GoogleOAuthProvider
        clientId={googleClientId}
        nonce={googleClientNonce}
      >
        <ButtonComponent />
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
```

Note that you'll need to grab your
[Google OAuth2 Client Id](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid)
and set up your application. Here is
[straight forward guide](https://medium.com/@tony.infisical/guide-to-using-oauth-2-0-to-access-google-apis-dead94d6866d)
on how to set up your first Google OAuth2 App via the Google Developer Console.

**TODO:**

- [ ] Check the [react-oauth](https://github.com/MomenSherif/react-oauth)
      project and mimic it to the best of your ability in SolidJS.
- [ ] Package it up and release it on [NPM](https://www.npmjs.com/).
