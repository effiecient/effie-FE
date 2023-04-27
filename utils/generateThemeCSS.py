# Made because apparently Copilot is not smart enough to consistently generate this

with open("input.txt", "r") as f:
    lines = f.read().splitlines()

for line in lines:
    if line == '':
        print()
    else:
        lineSplit = line.split("#")
        varName = lineSplit[0]
        hexColor = lineSplit[1][:-1]
        rColor = int(hexColor[0:2], 16)
        gColor = int(hexColor[2:4], 16)
        bColor = int(hexColor[4:6], 16)
        print(f"{varName}{rColor}, {gColor}, {bColor};")