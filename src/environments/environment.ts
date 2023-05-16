// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //urlBase:'https://shine-ecommerce-app.herokuapp.com/',
  //urlBase:"http://172.100.82.224:8080/",
    urlBase:'http://localhost:8080/',
    urlPython:'http://localhost:5000/',
  //urlBase:'https://shine-ecommerce-app.herokuapp.com/',

  direcciones_api:'https://api.tau.com.mx/dipomex/v1/',
  api_key_dipomex:"430bd21056ca321315d7002b9a86cdac7a061d72",
  geocode_api:"22e45b6bb20a4c58a66f46b78cae2278",
  sepomex_api:"eac3d63c-3247-4e59-8de8-b92e8a944736",
  postali:"https://postali.app/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
