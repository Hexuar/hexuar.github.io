const charSets = {
    younger_futhark: {
        code:['ᛅ','ᛒ','ᛋ','ᛏ','ᛁ','ᚠ','ᚴ','ᚼ','ᛁ','ᛁ','ᚴ','ᛚ','ᛘ','ᚾ','ᚬ','ᛒ','ᚴ','ᚱ','ᛋ','ᛏ','ᚢ','ᚠ','ᚢ','ᚴ','ᚢ','ᛋ'],
        override:{',':'᛫', '.':'᛭', '-':'᛬', ' ':'᛬'}
    },
    elder_futhark: {
        code:['ᚨ','ᛒ','ᚲ','ᛞ','ᛖ','ᚠ','ᚷ','ᚺ','ᛁ','ᛃ','ᚲ','ᛚ','ᛗ','ᚾ','ᛟ','ᛒ','ᚲ','ᚱ','ᛊ','ᛏ','ᚢ','ᚠ','ᚹ','ᚲ','ᚢ','ᛊ'],
        override:{',':'᛫', '.':'᛭', '-':'᛬', ' ':'᛬'}
    },
    medieval: {
        code:['ᛅ','ᛒ','ᛍ','ᛑ','ᛂ','ᚠ','ᚵ','ᚼ','ᛁ','ᛂ','ᚴ','ᛚ','ᛘ','ᚾ','ᚬ','ᛔ','ᛩ','ᚱ','ᛋ','ᛏ','ᚢ','ᚡ','ᚥ','ᛪ','ᚤ','ᛎ'],
        override:{',':'᛫', '.':'᛭', '-':'᛬', ' ':'᛬'}
    }
}

function Transcribe(text, charSetId) {
    let charSet = charSets[charSetId];

    for(let i = 0; i < 26; i++) {
        text = text.replaceAll(String.fromCharCode(i+65), charSet.code[i]);
        text = text.replaceAll(String.fromCharCode(i+97), charSet.code[i]);
    }

    Object.entries(charSet.override).forEach(pair => {
        text = text.replaceAll(pair[0],pair[1]);
    });

    return text;
}