# PWA with Angular + Firebase Boilerplate and Sample

## Features

TBU...

## Prerequisite

- Node ^10.9.0
- Firebase

## Contains

- [x] [Typescript](https://www.typescriptlang.org/) 3.4.5
- [x] [Angular](https://github.com/angular) 8.0.0

## Configuration

Creating new folder under `src` it called `environments` then adding the `environment.ts` file

> The file contents for the current environment will overwrite these during build.
> The build system defaults to the dev environment which uses `environment.ts`, but if you do
> `ng build --env=prod` then `environment.prod.ts` will be used instead.
> The list of which env maps to which file can be found in `.angular-cli.json`.

```
const projectId = '<YOUR-PROJECT-ID>';
export const environment = {
  production: false,
  apiBaseUrl: '',
  firebase: {
    apiKey: `<YOUR-API-KEY>`,
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `https://${projectId}.firebaseio.com`,
    projectId: `${projectId}`,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: `<MESSAGIN-ID-FOR-PUSH_NOTIFICATION>`,
    appID: `<YOUR-APP-ID>`,
  }
};
```

- Go to [Firebase Console](https://console.firebase.google.com/) to create your new project.

## Installation & Running

```
$ npm install

$ npm start
```
- Check project at port `4100`

=========================

## Live Demo

- [x] [Todos App](https://todo-app-bfae0.firebaseapp.com)

=========================

# License

MIT
