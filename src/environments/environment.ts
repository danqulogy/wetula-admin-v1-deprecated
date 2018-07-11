// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  electron: false,
  smsgh: {
    clientId: 'fbkazmva',
    clientSecret: 'catbqayd'
  },
  firebase: {
    apiKey: 'AIzaSyDaMhGAMgaM86l93g5gAdzzJJbwG0D_Wa0',
    authDomain: 'metrostore-jeffery-nzema.firebaseapp.com',
    databaseURL: 'https://metrostore-jeffery-nzema.firebaseio.com',
    projectId: 'metrostore-jeffery-nzema',
    storageBucket: 'metrostore-jeffery-nzema.appspot.com',
    messagingSenderId: '1067833455622'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
