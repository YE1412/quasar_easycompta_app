import * as http from 'app/src/boot/capacitor_http';

// console.log(process.env);
// console.log(import.meta.env);

let base_url = '';
if (!import.meta.env.SSR){
	const fullOrigin = import.meta.env.PUB_APP_URL;
	// const origin = fullOrigin.slice(0, fullOrigin.lastIndexOf(':') + 1);
	// base_url = origin + process.env.PORT_SSR + process.env.PUBLIC_PATH;
	base_url = fullOrigin;
}

// console.log(base_url);

export default http;
export { base_url };