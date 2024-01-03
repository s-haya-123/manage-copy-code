import { PathDb } from '$lib/indexedDb/pathDb';
import { db } from '$lib/store/dbAccessStore';
import { derived, writable, type Readable } from 'svelte/store';

type VrcWorld =
	| {
			isSync: false;
	  }
	| {
			isSync: true;
			path: string;
			world: string | undefined;
	  };
const pathStore = writable<string>('');
const worldStore = writable<string>('');
const pathDb = new PathDb(db);

const syncVrcWorldStore = derived<[Readable<string>, Readable<string>], VrcWorld>(
	[pathStore, worldStore],
	([$path, $world], set) => {
		if ($path !== '') {
			set({
				isSync: true,
				path: $path,
				world: $world !== '' ? $world : undefined
			});
		} else {
			set({
				isSync: false
			});
		}
	}
);

export const syncVrcWorld = {
	subscribe: syncVrcWorldStore.subscribe,
	syncStart: (path: string) => {
		pathStore.set(path);
	},
	syncStop: () => {
		pathStore.set('');
	},
	updateWorld: (world: string) => {
		worldStore.set(world);
	}
};
