let readingChapter = false;

document.getElementById('chapter1').addEventListener('click', function(event) {
    event.preventDefault();
    if (!readingChapter) {
        loadChapterPages(1);
    }
});

document.getElementById('chapter2').addEventListener('click', function(event) {
    event.preventDefault();
    if (!readingChapter) {
        loadChapterPages(2);
    }
});

document.getElementById('chapter3').addEventListener('click', function(event) {
    event.preventDefault();
    if (!readingChapter) {
        //loadChapterPages(3);
        alert("Chapter 3 has not been released yet.");
    }
});

document.getElementById('chapter4').addEventListener('click', function(event) {
    event.preventDefault();
    if (!readingChapter) {
        //loadChapterPages(4);
        alert("Chapter 4 has not been released yet.");
    }
});

document.getElementById('chapter5').addEventListener('click', function(event) {
    event.preventDefault();
    if (!readingChapter) {
        //loadChapterPages(5);
        alert("Chapter 5 has not been released yet.");
    }
});


document.getElementById('homeLink').addEventListener('click', function() {
    window.location.href = "";
});

async function loadChapterPages(chapterNumber) {
    readingChapter = true;

    const mangaPagesDiv = document.getElementById('chapterPages');
    mangaPagesDiv.innerHTML = '';


    try {
        let imageList = [];
        if (chapterNumber === 1) {
            document.getElementById('chapter1').classList.add('not-clickable');
            chapter2.style.display = "none";
            chapter3.style.display = "none";
            chapter4.style.display = "none";
            chapter5.style.display = "none";
            imageList = [
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Title.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io//main/Chapter%201/Characters.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/How%20to%20Read.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%201.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%202.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%203.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%204.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%205.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%206.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%207.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%208.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%209.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%2010.png'
            ];
        } 
        else if (chapterNumber === 2) {
            document.getElementById('chapter2').classList.add('not-clickable');
            chapter1.style.display = "none";
            chapter3.style.display = "none";
            chapter4.style.display = "none";
            chapter5.style.display = "none";
            imageList = [
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2011.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2012.png',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2013.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2014.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2015.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2016.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2017.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2018.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2019.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2020.png',

                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Placeholder.png',
            ];
        } 
        
        /*else if (chapterNumber === 3) {
            document.getElementById('chapter3').classList.add('not-clickable');
            chapter1.style.display = "none";
            chapter2.style.display = "none";
            chapter4.style.display = "none";
            chapter5.style.display = "none";
            imageList = [
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2021.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2022.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2023.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2024.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2025.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2026.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2027.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2028.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2029.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2030.png',

                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Placeholder.png',

                
            ];
        }
          else if (chapterNumber === 4) {
            document.getElementById('chapter4').classList.add('not-clickable');
            chapter1.style.display = "none";
            chapter2.style.display = "none";
            chapter3.style.display = "none";
            chapter5.style.display = "none";
            imageList = [
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2031.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2032.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2033.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2034.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2035.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2036.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2037.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2038.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2039.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2040.png',

                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Placeholder.png',
            ];
        }
              else if (chapterNumber === 5) {
            document.getElementById('chapter5').classList.add('not-clickable');
            chapter1.style.display = "none";
            chapter2.style.display = "none";
            chapter3.style.display = "none";
            chapter4.style.display = "none";
            imageList = [
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2041.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2042.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2043.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2044.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2045.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2046.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2047.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2048.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2049.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2050.png',

                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Placeholder.png',
            ];
        }
        */
const totalImages = imageList.length;

function createPageSeparator() {
    const separator = document.createElement('div');
    separator.classList.add('pageSeparator');
    return separator;
}

for (let i = 0; i < totalImages; i++) {
    const img = new Image();
    img.width = 1000;
    img.src = imageList[i];

    if (chapterNumber === 1) {
        const altTexts = [
            'Title',
            'Characters',
            'How to Read',
            'Page 1',
            'Page 2',
            'Page 3',
            'Page 4',
            'Page 5',
            'Page 6',
            'Page 7',
            'Page 8',
            'Page 9',
            'Page 10'
        ];

        if (i < altTexts.length) {
            img.alt = altTexts[i];
        } else {
            img.alt = `Page ${i - 2}`; // Fallback if more pages are added
        }
    } else {
        img.alt = `Page ${i + 1}`;
    }

    mangaPagesDiv.appendChild(img);

    if (i < totalImages - 1) {
        mangaPagesDiv.appendChild(createPageSeparator());
    }
}

