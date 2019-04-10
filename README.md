# Accord Project Template Studio (v2)

## Notes for development:

In order to link another React component to template-studio-v2 for development, following these steps:
1. Ensure template-studio-v2 is on your local machine.
2. Ensure your React component has been built.
3. In the root directory of your React component intended to link, run `npm link`.
4. Copy the `name` property of this React component from it's `package.json` file.
5. in the root directory of template-studio-v2, run `npm link <INSERT NAME HERE>`.
6. Refresh and ensure the `<NAME>` is in the `node_modules` directory.

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!