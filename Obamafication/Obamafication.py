from Myro import *

filename = "obama.jpg"
pic = makePicture(filename)

DarkBlue = makeColor(0,51,76)
Red = makeColor(217, 26, 33)
Blue = makeColor(112,150,158)
Yellow = makeColor(252, 227, 166)

for pixel in getPixels(pic):
    red = getRed(pixel)
    green = getGreen(pixel)
    blue = getBlue(pixel)
    if red > 240 and green > 240 and blue > 240:
        setColor(pixel, Yellow)
    elif red > 80 and green > 80 and blue > 80:
        setColor(pixel, Blue)
    elif red > 20 and green > 20 and blue > 20:
        setColor(pixel, Red)
    else:
        setColor(pixel, DarkBlue)
    
show(pic)

savePicture(pic, "obamanew.jpg")