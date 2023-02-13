/*eslint @typescript-eslint/no-explicit-any: 'off'*/
import { Preferences } from '@capacitor/preferences';
import { Cookies, Platform } from 'quasar';
import { CapacitorCookies } from '@capacitor/core';

const cookie = Cookies;
const platform = Platform;

const setPref = async (key: string, val: any, withCookie = true) => {
	// console.log(`Preferences setting !`);
	let ret = true;
	await Preferences.set({
		key: key,
		value: JSON.stringify(val)
	});
	// console.log(`Cookie setting !`);
	if (withCookie){
		//console.log(`Cookie setting - ${key}!`);
		if(!!platform.is.ipad === false ){
			setCookie(key, val);
			ret = cookie.has(`${key}`);
		}
		else {
			await setCapacitorCookie(key, val)
		}
	}
	return ret;
};

const setCookie = async (key: string, val: any) => {
	cookie.set(key, JSON.stringify(val), {path: '/', sameSite: 'Lax', secure: false});
};

const setCapacitorCookie = async (key: string, val: any) => {
	await CapacitorCookies.setCookie({
		path: '/',
		key: key,
		value: JSON.stringify(val)
	});
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
	if(!!platform.is.ipad === false ){
		ret = !!cookie.get(key) 
			? JSON.parse(decodeURIComponent(cookie.get(key)))
			: ret;
	}
	else {
		const elems = decodeURIComponent(document.cookie).split(';');
		// console.log('Elems');
		// console.log(elems);
		const found = elems.find(el => el.startsWith(key));
		if (!!found){
			const rawStr = found.substring(found.indexOf('=') + 1);
			// console.log('RawStr');
			// console.log(rawStr);
			ret = JSON.parse(rawStr);
		}
	}
	return ret;
};

const getCookies = () => {
	let ret = null;
	if(!!platform.is.ipad === false ){
		ret = !!cookie.getAll() 
			? JSON.parse(decodeURIComponent(cookie.getAll()))
			: ret;
	}
	else {
		ret = decodeURIComponent(document.cookie);
	}
	return ret;
};

const removeAll = async() => {
	await Preferences.clear();
};

export { setPref, getPref, removePref, getCookie, getCookies, removeAll };