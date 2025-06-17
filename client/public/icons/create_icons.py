#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size):
    # Create a new image with purple background
    img = Image.new('RGB', (size, size), '#8b5cf6')
    draw = ImageDraw.Draw(img)
    
    # Add white text "PARA"
    font_size = size // 8
    try:
        font = ImageFont.load_default()
    except:
        font = None
    
    text = "PARA"
    if font:
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
    else:
        text_width = len(text) * font_size // 2
        text_height = font_size
    
    x = (size - text_width) // 2
    y = (size - text_height) // 2
    
    draw.text((x, y), text, fill='white', font=font)
    
    # Save the image
    filename = f'icon-{size}x{size}.png'
    img.save(filename)
    print(f"Created {filename}")

if __name__ == "__main__":
    sizes = [72, 96, 128, 144, 152, 192, 384, 512]
    for size in sizes:
        create_icon(size)