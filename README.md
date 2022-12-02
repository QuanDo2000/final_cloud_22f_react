# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This app is the front-end for Final Project of Cloud Computing.

This app works alongside the [back-end](https://github.com/QuanDo2000/final_cloud_22f_backend).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Azure App Service Settings

- When deploying through GitHub, a Publish Profile is needed.
- The Publish Profile is obtained from Azure.
  - Deployment -> Deployment Center -> Manage publish profile -> Download
- Then we add the content of the downloaded file into Actions secrets on GitHub.
  - Settings -> Security -> Secrets -> Actions -> Repository secret.
  - Notice to use correct naming (refer to documentation for details).
- If deployed through Azure, this is added automatically.

- Because we are deploying a React app, we only need to deploy the build folder and serve it on the cloud.
  - We need to let the App Service know where our `index.html` from the build folder is.
  - Settings -> Configuration -> General settings -> Startup Command
  - Here, add `pm2 serve /home/site/wwwroot/build --no-daemon`
  - Here I used `/home/site/wwwroot/build` because this is where the file `index.html` is located.
