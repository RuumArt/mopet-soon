const imageWidths = [
  16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048,
  3840,
];

export const getNextImageSrc = ({ src, width, quality = 95 }) => {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
};

export const findClosestNextImageWidth = width => {
  return (
    (imageWidths.find(w => w >= width) ||
      imageWidths[imageWidths.length - 1]) ??
    3840
  );
};

const LOADED_IMAGES = [];

export function loadImage(url, options = {}) {
    return new Promise((resolve, reject) => {

        let loadedImage = LOADED_IMAGES.find(image => image.url === url)

        if (loadedImage) {
            resolve({
                ...loadedImage,
                ...options
            })
        } else {
            const $img = new Image();

            if (options.crossOrigin) {
                $img.crossOrigin = options.crossOrigin;
            }

            const loadCallback = () => {
                const result = {
                    element: $img,
                    ...getImageMetadata($img),
                    ...options
                }
                LOADED_IMAGES.push(result)
                resolve(result);
            }

            if ($img.decode) {
                $img.src = url
                $img.decode().then(loadCallback).catch(e => {
                    reject(e)
                })
            } else {
                $img.onload = loadCallback
                $img.onerror = (e) => {
                    reject(e);
                };
                $img.src = url
            }
        }

    });
}

export function getImageMetadata($img) {
    return {
        url: $img.src,
        width: $img.naturalWidth,
        height: $img.naturalHeight,
        ratio: $img.naturalWidth / $img.naturalHeight,
    };
}
