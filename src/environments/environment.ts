// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'angular-chat-app-aaron',
    appId: '1:450720626954:web:5e16713e7c69d6b7d922f3',
    storageBucket: 'angular-chat-app-aaron.appspot.com',
    apiKey: 'AIzaSyDtD6gw14AK6uJWMslqBVTyVxOk5boK74Y',
    authDomain: 'angular-chat-app-aaron.firebaseapp.com',
    messagingSenderId: '450720626954',
  },
  production: false,
  apiUrl: 'https://us-central1-angular-chat-app-aaron.cloudfunctions.net',
  stream: {
    key: '9kpvhc934nze',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
