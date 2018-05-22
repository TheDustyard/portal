async function getImages() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.addEventListener("load", (ev) => {
            let raw = JSON.parse(request.responseText);
            let desktopimages = Object.keys(raw.desktop);
            let desktopauthors = Object.values(raw.desktop);
            let mobileimages = Object.keys(raw.mobile);
            let mobileauthors = Object.values(raw.mobile);
            resolve({
                desktop: desktopimages.map((x, i) => {
                    return {
                        file: `images/desktop/${desktopimages[i]}.png`,
                        name: desktopimages[i],
                        author: desktopauthors[i]
                    };
                }),
                mobile: mobileimages.map((x, i) => {
                    return {
                        file: `images/mobile/${mobileimages[i]}.png`,
                        name: mobileimages[i],
                        author: mobileauthors[i]
                    };
                })
            });
        });
        request.open("GET", "images/images.json");
        request.send();
    });
}
let images;
window.addEventListener("load", async () => {
    images = await getImages();
    loadimage();
});
function loadimage() {
    let image = window.innerWidth < 500
        ? images.mobile[getRandomInt(0, images.mobile.length - 1)]
        : images.desktop[getRandomInt(0, images.desktop.length - 1)];
    document.querySelector(".credits .credit").innerText = image.author || "Unknown";
    document.querySelector(".bg").style.backgroundImage = `url(${image.file})`;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
