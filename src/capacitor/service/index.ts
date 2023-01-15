import * as http from 'app/src/boot/capacitor_http';

const fullOrigin = process.env.APP_URL;
const origin = fullOrigin.slice(0, fullOrigin.lastIndexOf(':') + 1);
const base_url = origin + process.env.PORT_SSR + process.env.PUBLIC_PATH;
// console.log(process.env);
// console.log(import.meta.env);
// console.log(base_url);

export default http;
export { base_url };