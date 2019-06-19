# Accord Project Template Studio (v2)

[![Netlify Status](https://api.netlify.com/api/v1/badges/088bd784-321b-49d4-940b-8c1c0af6942f/deploy-status)](https://app.netlify.com/sites/accordproject-studio/deploys)

## Notes for development:

In order to link another React component to template-studio-v2 for development, following these steps:
1. Ensure template-studio-v2 is on your local machine.
2. Ensure your React component has been built - in it's root directory, run `npm run build`.
3. In the root directory of your React component intended to link, run `npm link`.
4. Copy the `name` property of this React component from it's `package.json` file.
5. In the root directory of template-studio-v2, run `npm link <INSERT NAME HERE>`.
6. Refresh and ensure the `<NAME>` is in the `node_modules` directory.
7. Run `npm run start`.

(Adding `npm` modules to this repository will unlink anything linked by `npm link`.)

---

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run test`

Launches JEST over the repository.
Current snapshot tests requires `npm test -- -u` in order to update when all changes are final.

### `npm run lint`

Runs ESLint.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

--- 

## Redux Sagas

Template Studio v2 is built with **Redux Sagas**, a good intro guide can be found [here][sagaGuide] and __official docs__ can be found [here][reduxSaga].

### Why Sagas vs. Thunks?

**Thunks** dispatch a function that in turn dispatches an actions. So,

- *Pros*: Simple code to maintain
- *Cons*: Have to mock the async behavior of thunk in test cases which could get pretty clumsy
- *Implies*: Suited for small, straight forward async parts of the application

**Sagas** use generator functions underneath so the function virtually pauses at an async action and resumes when it is resolved

- *Pros*: Test cases become fair and straight without necessity to mock the async behavior
- *Cons*: Brings in more complexity to the code
- *Implies*: Suited for complex async parts of the application that requires complex unit test cases

---

## License <a name="license"></a>
Accord Project source code files are made available under the Apache License, Version 2.0 (Apache-2.0), located in the LICENSE file. Accord Project documentation files are made available under the Creative Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.

[sagaGuide]: https://blog.logrocket.com/understanding-redux-saga-from-action-creators-to-sagas-2587298b5e71
[reduxSaga]: https://redux-saga.js.org/