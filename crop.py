from PIL import Image
import glob
import os

images = glob.glob('g:/antigravity/game/Test1/public/assets/characters/*.png')
for img_path in images:
    try:
        img = Image.open(img_path).convert('RGBA')
        data = img.load()
        width, height = img.size
        
        min_x = width
        min_y = height
        max_x = 0
        max_y = 0
        
        for y in range(height):
            for x in range(width):
                r, g, b, a = data[x, y]
                # Character is brighter, background is dark
                if a > 0 and (r > 35 or g > 35 or b > 35):
                    if x < min_x: min_x = x
                    if y < min_y: min_y = y
                    if x > max_x: max_x = x
                    if y > max_y: max_y = y
                    
        if min_x < max_x and min_y < max_y:
            padding = 15
            min_x = max(0, min_x - padding)
            min_y = max(0, min_y - padding)
            max_x = min(width, max_x + padding)
            max_y = min(height, max_y + padding)
            
            cropped = img.crop((min_x, min_y, max_x, max_y))
            
            c_data = cropped.load()
            c_width, c_height = cropped.size
            for y in range(c_height):
                for x in range(c_width):
                    r, g, b, a = c_data[x, y]
                    if r <= 35 and g <= 35 and b <= 35:
                        c_data[x, y] = (0, 0, 0, 0)
                        
            cropped.save(img_path)
            print('Cropped and transparentized', img_path)
        else:
            print('No character found in', img_path)
    except Exception as e:
        print('Error processing', img_path, e)
