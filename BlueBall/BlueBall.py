from Myro import *
from Graphics import *
from random import *
init("sim")

def findColorSpot(picture, color):
    xPixelSum = 0
    totalPixelNum = 0
    averageXPixel = 0

    show(picture)

    for pixel in getPixels(picture):
        if(color == 1 and getRed(pixel) > 220 and getGreen(pixel) == 0 and getBlue(pixel) == 0):
            xPixelSum += getX(pixel)
            totalPixelNum += 1
        elif(color == 2 and getRed(pixel)== 0 and getGreen(pixel) > 100 and getBlue(pixel) == 0):
            xPixelSum += getX(pixel)
            totalPixelNum += 1
        elif(color == 3 and getRed(pixel) == 0 and getGreen(pixel) == 0 and getBlue(pixel) > 220):
          
            xPixelSum += getX(pixel)
            totalPixelNum += 1
        elif(color == 4 and getRed(pixel) > 200 and getGreen(pixel) > 200 and getBlue(pixel) == 0):
            
            xPixelSum += getX(pixel)
            totalPixelNum += 1
    if(totalPixelNum != 0):
        averageXPixel = xPixelSum/totalPixelNum

    #Handles the case where robot has found the spot if it is near it
    #If necessary adjust the value
    if(totalPixelNum/(getWidth(picture)*getHeight(picture)) > 0.21):
        averageXPixel = -1

    return averageXPixel


#goes towards the ball
angle = randrange(-180,180)
j = 0
while j < 1:
    pic = takePicture()
    x = findColorSpot(pic, 3)
    show(pic)
    print(x)
    if x == 0:
        turnBy(angle)
        takePicture()
        pic = takePicture()
        x = findColorSpot(pic, 3)
        show(pic)
        print(x)
    elif x < 128:
        turnBy(15)
        forward(1,1)
    elif x > 128:
        turnBy(-15)
        forward(1,1)
    elif x == -1:
        forward(1,1)
    elif getStall() == 1:
        backward(1,3)
        turnBy(randrange(1,360))
