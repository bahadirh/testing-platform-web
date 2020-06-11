# Web Interface for Testing Platform

Before running the web application, please make sure the API it requires and a Rabbitmq instance for API-test client communication are already started as well. Further documentation on those can be found on their own repositories.

## 1. Pull the repository

```bash
git clone https://gitlab.com/cmpe492/testing-web.git && cd testing-web
```

Run the commands below inside `testing-web` folder on terminal.

## 2. Check Node version and Yarn installation

The app requires Node version 12 or newer.

```bash
node -v
yarn -v
```

Sample output:

> v12.18.0 \
> 1.22.4

## 3. Install dependencies

```bash
$ yarn install
```

## How to start development server locally

The app runs on **port 5000** by default, which can be changed in **package.json** file under _dev_ script if needed.

```bash
yarn dev
```

## How to build the project as single-page application

```bash
yarn build
```

The build should be created in **dist** folder. Be aware that previously-created **dist** folder will be overwritten.

## How to generate static project

```bash
yarn generate
```

Static project creates separate HTML files for each route defined within the app. These can be served as any static resource. The files should be created in **dist** folder. Be aware that previously-created **dist** folder will be overwritten.

## Contact info

bahadirhocamoglu@gmail.com
