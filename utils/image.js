export function rotateImage(image, deg) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
            ctx.drawImage(image, 0, 0, img.width, img.height);
        };
        img.src = image;
    });
}
