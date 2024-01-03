import { writable } from 'svelte/store';

const key = 'LogFilePath';

const pathItemStore = () => {
	const { subscribe, set } = writable<string>('');
	const item = localStorage.getItem(key);
	if (item) {
		set(item);
	}
	return {
		subscribe,
		updatePath: (path: string) => {
			localStorage.setItem(key, path);
			set(path);
		},
		resetPath: () => {
			localStorage.setItem(key, '');
			set('');
		}
	};
};

export const pathItem = pathItemStore();
