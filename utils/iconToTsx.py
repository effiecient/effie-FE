# TAKE FILE NAME AS ARGUMENT
# python3 iconToTsx.py info.svg

import sys
import os
import re

defaultPath = "../public/icons/"
if len(sys.argv) > 1:
    filename = defaultPath + sys.argv[1]
else:
    print("No filename given, using default")
    filename = "../public/icons/info.svg"

'''
    /* --color-black: #000000;
    --color-white: #FFFFFF;

    --color-neutral-50: #F8F9FA;
    --color-neutral-100: #EDF0F3;
    --color-neutral-200: #E1E7EC;
    --color-neutral-300: #CFD6DE;
    --color-neutral-400: #B8C4CE;
    --color-neutral-500: #A0ADBB;
    --color-neutral-600: #8895A7;
    --color-neutral-700: #667181;
    --color-neutral-800: #434D5A;
    --color-neutral-900: #212934;

    --color-primary-50: #EEEAFF;
    --color-primary-100: #D4CDF2;
    --color-primary-200: #B9AFE6;
    --color-primary-300: #9F92D9;
    --color-primary-400: #8474CC;
    --color-primary-500: #7766C6;
    --color-primary-600: #6C5BBA;
    --color-primary-700: #6150AD;
    --color-primary-800: #5545A1;
    --color-primary-900: #4A3A94;

    --color-secondary-50: #FFEEF3;
    --color-secondary-200: #FCCFDB;
    --color-secondary-500: #F9B0C3;
    --color-secondary-700: #C86D85;
    --color-secondary-900: #962A46;

    --color-tertiary-50: #FFF2CD;
    --color-tertiary-200: #FFDA70;
    --color-tertiary-500: #FFC212;
    --color-tertiary-700: #BE9009;
    --color-tertiary-900: #7D5D00; */
'''

colorDict = {
    "000000": "black",
    "FFFFFF": "white",

    "F8F9FA": "neutral-50",
    "EDF0F3": "neutral-100",
    "E1E7EC": "neutral-200",
    "CFD6DE": "neutral-300",
    "B8C4CE": "neutral-400",
    "A0ADBB": "neutral-500",
    "8895A7": "neutral-600",
    "667181": "neutral-700",
    "434D5A": "neutral-800",
    "212934": "neutral-900",

    "EEEAFF": "primary-50",
    "D4CDF2": "primary-100",
    "B9AFE6": "primary-200",
    "9F92D9": "primary-300",
    "8474CC": "primary-400",
    "7766C6": "primary-500",
    "6C5BBA": "primary-600",
    "6150AD": "primary-700",
    "5545A1": "primary-800",
    "4A3A94": "primary-900",

    "FFEEF3": "secondary-50",
    "FCCFDB": "secondary-200",
    "F9B0C3": "secondary-500",
    "C86D85": "secondary-700",
    "962A46": "secondary-900",
    
    "FFF2CD": "tertiary-50",
    "FFDA70": "tertiary-200",
    "FFC212": "tertiary-500",
    "BE9009": "tertiary-700",
    "7D5D00": "tertiary-900",
}


'''
type CopyIconProps = {
    className?: string;
    fillClassName?: string;
}

export default function CopyIcon({ className } : CopyIconProps) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} copy-icon`}>
            <g>
                <path d="M6 14.5H4.75C4.61 14.5 4.5 14.39 4.5 14.25V13C4.5 12.59 4.16 12.25 3.75 12.25C3.34 12.25 3 12.59 3 13V14.25C3 15.21 3.78 16 4.75 16H6C6.41 16 6.75 15.66 6.75 15.25C6.75 14.84 6.41 14.5 6 14.5Z" fill="#B8C4CE" className="copy-path"/>
                <path d="M12 4.5H13.25C13.39 4.5 13.5 4.61 13.5 4.75V6C13.5 6.41 13.84 6.75 14.25 6.75C14.66 6.75 15 6.41 15 6V4.75C15 3.78 14.21 3 13.25 3H12C11.59 3 11.25 3.34 11.25 3.75C11.25 4.16 11.59 4.5 12 4.5Z" fill="#B8C4CE" className="copy-path"/>
                <path d="M6 3H4.75C3.78 3 3 3.78 3 4.75V6C3 6.41 3.34 6.75 3.75 6.75C4.16 6.75 4.5 6.41 4.5 6V4.75C4.5 4.61 4.61 4.5 4.75 4.5H6C6.41 4.5 6.75 4.16 6.75 3.75C6.75 3.34 6.41 3 6 3Z" fill="#B8C4CE" className="copy-path"/>
                <path d="M19.25 8.01001H10.75C9.78 8.01001 9 8.79001 9 9.76001V19.26C9 20.22 9.79 21.01 10.75 21.01H19.25C20.21 21.01 21 20.22 21 19.26V9.76001C21 8.79001 20.21 8.01001 19.25 8.01001ZM19.5 19.26C19.5 19.4 19.39 19.51 19.25 19.51H10.75C10.61 19.51 10.5 19.4 10.5 19.26V9.76001C10.5 9.62001 10.61 9.51001 10.75 9.51001H19.25C19.39 9.51001 19.5 9.62001 19.5 9.76001V19.26Z" fill="#B8C4CE" className="copy-path"/>
            </g>
        </svg>
    );
}
'''

with open(filename, "r") as f:
    lines = f.read().splitlines()

result = ""

iconName = "".join([word.capitalize() for word in filename.split("/")[-1].split(".")[0].split("-")]) + "Icon"
# PROPS
result += f'type {iconName}Props = '
result += '{\n'
result += '    className?: string;\n'
result += '    fillClassName?: string;\n'
result += '}\n\n'

# COMPONENT
result += f'export default function {iconName}({{ className, fillClassName }} : {iconName}Props) '
result += '{\n'
result += '    return (\n'

# SVG
for line in lines:
    if (line.startswith('<svg')):
        # Add className
        line = line.replace(">", f' className={{`${{className}}`}}>')
    if 'fill="white"' in line:
        line = line.replace('fill="white"', 'className={fillClassName ? fillClassName : "fill-white"} fill="white"')
    if 'fill="black"' in line:
        line = line.replace('fill="black"', 'className={fillClassName ? fillClassName : "fill-black"} fill="black"')
    if 'fill="#' in line and not 'className' in line:
        # replace color with colorDict
        color = line.split('fill="#')[1].split('"')[0]
        if color in colorDict:
            line = line.replace('fill="#', 'className={fillClassName ? fillClassName : "fill-' + colorDict[color] + '"} fill="#')
    if 'stroke="#' in line and not 'className' in line:
        # replace color with colorDict
        color = line.split('stroke="#')[1].split('"')[0]
        if color in colorDict:
            line = line.replace('stroke="#', 'className={fillClassName ? fillClassName : "fill-' + colorDict[color] + '"} stroke="#')
    # replace all snake-case to camelCase
    line = line.replace('clip-path', 'clipPath')
    line = line.replace('clip-rule', 'clipRule')
    line = line.replace('fill-rule', 'fillRule')
    line = line.replace('stroke-linecap', 'strokeLinecap')
    line = line.replace('stroke-linejoin', 'strokeLinejoin')
    line = line.replace('stroke-width', 'strokeWidth')
    result += '        ' + line + '\n'

result += '    );\n'
result += '}\n'


outputFilename = "/".join(filename.split("/")[0:-1]) + "/" + filename.split("/")[-1].split(".")[0] + ".tsx"

with open(outputFilename, "w") as f:
    f.write(result)

# print(result)