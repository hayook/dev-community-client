from PIL import Image, ImageDraw, ImageFont

# get the letter as input from the user
letter = input("Enter a letter: ")

# create a new image with a white background
img = Image.new("RGB", (200, 200), "black")

# get a drawing context for the image
draw = ImageDraw.Draw(img)

# set the font and font size for the letter
font = ImageFont.truetype("arial.ttf", 100)

# determine the size of the letter in the chosen font
text_width, text_height = draw.textsize(letter, font)

# calculate the position to draw the letter centered in the image
x = (200 - text_width) / 2
y = (200 - text_height) / 2

# draw the letter onto the image in black
draw.text((x, y), letter, font=font, fill="white")

# save the image to a file
img.save("{}.png".format(letter))
