import cv2

pos = []
pos.append([16,130])
pos.append([83,195])
pos.append([83,192])
pos.append([82,189])
pos.append([53,167])

pos.append([36,151])
pos.append([39,158])
pos.append([49,170])
pos.append([62,179])
pos.append([61,183])

pos.append([63,183])
pos.append([66,187])
pos.append([69,191])
pos.append([37,153])
pos.append([41,152])

pos.append([41,149])
pos.append([44,141])
pos.append([43,134])
pos.append([41,119])
pos.append([30,104])
pos.append([30,104])

for i in range(len(pos)):
    pos[i][1] = 115 - (pos[i][1] - 100)
    pos[i][0] = 115 - pos[i][0]

for j in range(len(pos)):
    filename = str(j) + '.png'
    ofilename = 'img' + str(j) + '.png'

    img = cv2.imread(filename, cv2.IMREAD_UNCHANGED)

    targeth, targetw = 230, 230
    h, w = img.shape[0], img.shape[1]

    top = pos[j][1]
    bot = targeth - h - top
    left = pos[j][0]
    right = targetw - w - left

    img2 = cv2.copyMakeBorder(img, top, bot, left, right, cv2.BORDER_CONSTANT, value=[0,0,0,0])
    cv2.imwrite(ofilename, img2)
