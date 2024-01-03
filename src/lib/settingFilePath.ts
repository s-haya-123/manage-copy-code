import { pathItem } from '$lib/store/pathStore';
import { open } from '@tauri-apps/api/dialog';

const fileOpen = async () => {
	return (await open({
		multiple: false,
		directory: true
	})) as string | undefined;
};

export const settingFilePath = async () => {
	const path = await fileOpen();
	if (path) {
		pathItem.updatePath(path);
	}
};
