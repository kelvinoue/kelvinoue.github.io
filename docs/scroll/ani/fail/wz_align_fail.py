import cv2

pos = []
pos.append([16,130])
pos.append([16,130])
pos.append([16,130])
pos.append([20,141])
pos.append([20,155])

pos.append([24,154])
pos.append([31,153])
pos.append([35,153])
pos.append([38,152])
pos.append([42,151])

pos.append([42,148])
pos.append([45,139])
pos.append([44,132])
pos.append([43,123])
pos.append([62,108])

pos.append([62,108])

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
