export const objectStoreIdentify = {
	name: 'Path',
};

export class PathDb {
	constructor(private db: IDBDatabase) {}
	findAll(): Promise<string> {
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(objectStoreIdentify.name, 'readonly');
			const objectStore = transaction.objectStore(objectStoreIdentify.name);
			const request = objectStore.getAll();
			transaction.abort = () => {
				return reject(new Error('TransactionがAbortしました'));
			};

			request.onerror = () => {
				return reject(new Error('読み込みに失敗しました'));
			};
			request.onsuccess = () => {
				return resolve(request.result[request.result.length - 1]);
			};
			transaction.commit();
		});
	}
	update(id: string | undefined, path: string): Promise<number> {
		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction(objectStoreIdentify.name, 'readwrite');
			const objectStore = transaction.objectStore(objectStoreIdentify.name);
			const request = objectStore.put({
				id,
				path
			});
			transaction.abort = () => {
				return reject(new Error('TransactionがAbortしました'));
			};
			request.onerror = () => {
				return reject(new Error('保存に失敗しました'));
			};
			request.onsuccess = function () {
				return resolve(this.result as number);
			};
			transaction.commit();
		});
	}
}
