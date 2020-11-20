import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	constructor(private storage: AngularFireStorage) {}

	uploadFile(event) {
		const file = event.target.files[0];
		const filePath = '/documents';
		const task = this.storage.upload(filePath, file);

		return task;
	}
}
