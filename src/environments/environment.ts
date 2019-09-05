// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  SERVER_URL: `http://localhost:8083/`,
  FILESERVER_URL: `http://localhost:8083/`,
  FILEUPLOAD_URL: `http://localhost:8083/file/upload`,
  // 连接立方后台url
  photo_URL: `http://192.168.18.254:8087/ocs/`,
  // photo_URL: `http://192.168.1.107:8087/ocs/`,
  // photo_URL: `http://120.26.9.130:80/test/`,
  production: false,
  useHash: true,
  hmr: false,
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
