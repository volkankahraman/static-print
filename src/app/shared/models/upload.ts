export class Upload {
	file: File;
	name: string;

	createdAt: Date = new Date();

	constructor(file: File) {
		this.file = file;
		this.name = file.name;
	}

	getInstance() {
		return {
			name: this.name,
			createdAt: this.createdAt
		};
	}
}
