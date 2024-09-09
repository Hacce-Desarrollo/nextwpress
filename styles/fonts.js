import localFont from 'next/font/local';

const mainFont = localFont({ 
    src: 'fonts/CaviarDreams-webfont.woff',
    variable: '--font-caviarDreams',
});

const mainFontBold = localFont({ 
    src: 'fonts/Caviar_Dreams_Bold-webfont.woff' ,
    variable: '--font-caviarDreamsBold',
});

// More local fonts here...

export { mainFont, mainFontBold }