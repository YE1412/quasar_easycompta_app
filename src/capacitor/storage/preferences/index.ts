/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { Preferences } from '@capacitor/preferences';
import { Cookies } from 'quasar';

const cookie = Cookies;

const setPref = async (key: string, val: any, withCookie = true) => {
	// console.log(`Preferences setting !`);
	await Preferences.set({
		key: key,
		value: JSON.stringify(val)
	});
	// console.log(`Cookie setting !`);
	if (withCookie)
		cookie.set(key, JSON.stringify(val), {path: '/', sameSite: 'Lax', secure: false});
};

const getPref = async (key: string): any => {
	const ret = await Preferences.get({
		key: key
	});
	return JSON.parse(ret.value);
};

const removePref = async (key: string) => {
	await Preferences.remove({
		key: key
	});
	cookie.remove(key);
};

const getCookie = (key: string) => {
	let ret = null;
	ret = !!cookie.get(key) 
		? JSON.parse(decodeURIComponent(cookie.get(key)))
		: ret;
	return ret;
};

const removeAll = async() => {
	await Preferences.clear();
};

export { setPref, getPref, removePref, getCookie, removeAll };