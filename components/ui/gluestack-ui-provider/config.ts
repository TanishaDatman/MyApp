'use client';
import { vars } from 'nativewind';

export const config = {
    light: vars({
      // 235, 244, 235 
        '--color-red': '214 39 15',
        '--color-green': '25 159 101',
        '--color-lightgreen': '235 244 235',
        '--color-black': '21 21 21',
        '--color-white': '255 255 255',
        '--color-yellow': '220 159 55',
        '--color-lightyellow': '246 234 203',
        '--color-textgrey': '132 132 132',
        '--color-lightgrey': '243 244 247',
        '--color-backgroundgrey': '243 244 247',
        '--color-divider': '237 237 237'

    }),
    dark: vars({
      // 235, 244, 235 
        '--color-dred': '212 72 53',
        '--color-dgreen': '25 159 101',
        '--color-dlightgreen': '28 44 27',
        '--color-dgrey': '32 32 32',
        '--color-dcard': '14 59 78',
        '--color-dwhite': '255 255 255',
        '--color-dyellow': '220 159 55',
        '--color-dlightyellow': '220 159 55',
        '--color-dtextgrey': '132 132 132',

    }),
    
};
