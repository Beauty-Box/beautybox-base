export class Avatar {
    constructor(url, crop, rotate) {
        this.url = url || '';
        this.crop = crop || {};
        this.rotete = rotate || 0;
        this.avatarUpdate = false;
    }
    init() {
        if (!this.url) {
            return;
        }
        const img = new Image();
        img.src = this.url;
        img.onload = e => {
            console.log(e);
        };
    }
    convertFromUrl() {
        let img = new Image();
        img.onload = e => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
        };
        img.src = this.url;
    }
    convertFromBase64() {
        let img = new Image();
        img.onload = e => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
        };
        img.src = this.base64;
    }
    convertFromFile() {
        let reader = new FileReader();
    }
    save() {}
    update() {}
    delete() {
        this.url = '';
        this.crop = '';
        this.rotete = 0;
        this.file = null;
        this.base64 = '';
        this.deleteAvatar = true;
    }
}
