# Nash Building Permits

Web app with an interactive map of the latest building permits issued in Nashville, Tennessee.

![Screenshot](./screenshot.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to develop

Sign up for a [Socrata API app token](https://data.nashville.gov/profile/app_tokens) for Nashville data.

```bash
cp src/config.json.example src/config.json
```

Customize config.json with your Socrata API app token.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## How to deploy

To deploy GitHub Pages site, first modify [package.json](./package.json) to
change the `homepage` field based on your GitHub URL, then:

```bash
yarn run deploy
```
