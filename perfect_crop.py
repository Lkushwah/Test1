import glob
from rembg import remove
from PIL import Image

images = glob.glob('g:/antigravity/game/Test1/public/assets/characters/*.png')
for img_path in images:
    try:
        input_image = Image.open(img_path)
        output_image = remove(input_image)
        # Crop to tight bounding box
        bbox = output_image.getbbox()
        if bbox:
            output_image = output_image.crop(bbox)
        output_image.save(img_path)
        print('Processed perfectly', img_path)
    except Exception as e:
        print('Error', img_path, e)
