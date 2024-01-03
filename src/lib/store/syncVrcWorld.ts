import { pathItem } from '$lib/store/pathStore';
import { derived, writable, type Readable } from 'svelte/store';

type VrcWorld =
	| {
			mode: 'syncOff';
	  }
	| {
			mode: 'prepare';
	  }
	| {
			mode: 'sync';
			world: string | undefined;
	  };
const worldStore = writable<string>('');
const isSyncStore = writable<boolean>(false);

const syncVrcWorldStore = derived<
	[Readable<boolean>, Readable<string>, Readable<string>],
	VrcWorld
>([isSyncStore, worldStore, pathItem], ([$isSync, $world, $path], set) => {
	if ($isSync) {
		if ($path !== '') {
			set({
				mode: 'sync',
				world: $world
			});
		} else {
			set({
				mode: 'prepare'
			});
		}
	} else {
		set({
			mode: 'syncOff'
		});
	}
});

export const syncVrcWorld = {
	subscribe: syncVrcWorldStore.subscribe,
	syncStart: () => {
		isSyncStore.set(true);
	},
	syncStop: () => {
		isSyncStore.set(false);
	},
	updateWorld: (world: string) => {
		worldStore.set(world);
	}
};
