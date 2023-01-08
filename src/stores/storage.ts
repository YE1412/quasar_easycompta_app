import { StorageLike } from 'pinia-plugin-persistedstate';

function discard(ctx: unknow){
	return ctx;
};

export const cookieStorage: StorageLike = {
	getItem(key: string){
		discard({ key });
		return;
	},
	setItem(key: string, val: any){
		discard({ key, val });
		return;
	},
	removeItem(key: string){
		discard({ key });
		return;
	},	
};