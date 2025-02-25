let readingChapter = false;

document.getElementById('homeLink').addEventListener('click', () => {
    window.location.href = "";
});

const chapters = {
    1: {
        images: [
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Title.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Characters.png',
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
        ],
        altTexts: [
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
        ]
    },
    2: {
        images: [
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2011.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2012.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2013.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2014.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2015.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2016.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2017.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2018.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2019.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%202/Page%2020.png'
        ],
        altTexts: [
            'Page 11',
            'Page 12',
            'Page 13',
            'Page 14',
            'Page 15',
            'Page 16',
            'Page 17',
            'Page 18',
            'Page 19',
            'Page 20'
        ]
    },
    3: {
        images: [
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2021.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2022.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2023.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2024.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2025.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2026.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2027.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2028.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2029.png',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%203/Page%2030.png'
                
            ],
             altTexts: [
                 'Page 21',
                 'Page 22',
                 'Page 23',
                 'Page 24',
                 'Page 25',
                 'Page 26',
                 'Page 27',
                 'Page 28',
                 'Page 29',
                 'Page 30'
            ]
        },
        4: {
            images: [
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Characters%202.png'
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2031.png'
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2032.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2033.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2034.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2035.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2036.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2037.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2038.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2039.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%204/Page%2040.png',


            ],
             altTexts: [
                  'Character 2'
                //'Page 31'
                //'Page 32',
                //'Page 33',
                //'Page 34',
                //'Page 35',
                //'Page 36',
                //'Page 37',
                //'Page 38',
                //'Page 39',
                //'Page 40',
            ]
        },
        /* 5: {
            images: [
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2041.png'
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2042.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2043.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2044.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2045.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2046.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2047.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2048.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2049.png',
                //'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%205/Page%2050.png',

            ],
             altTexts: [
                'Page 41'
                //'Page 42',
                //'Page 43',
                //'Page 44',
                //'Page 45',
                //'Page 46',
                //'Page 47',
                //'Page 48',
                //'Page 49',
                //'Page 50'
            ]
        }
        */ 
};

document.addEventListener("DOMContentLoaded", function(event) {
    const coll = document.getElementsByClassName("collapsible");

    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        const content = this.nextElementSibling;
        const otherCollapsibles = document.querySelectorAll('.collapsible.active');
        for (let j = 0; j < otherCollapsibles.length; j++) {
          const otherContent = otherCollapsibles[j].nextElementSibling;
          if (otherCollapsibles[j] !== this && otherContent.style.maxHeight) {
            otherCollapsibles[j].classList.remove("active");
            otherContent.style.maxHeight = null;
            otherCollapsibles[j].textContent = "Show Comments";
          }
        }

        this.classList.toggle("active");
        if (content.style.maxHeight){
          content.style.maxHeight = null;
          this.textContent = "Show Comments";
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          this.textContent = "Hide Comments";
        }
      });
    }
});

document.getElementById('chapterList').addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'A' && !readingChapter) {  
        event.preventDefault();
        const chapterNumber = parseInt(target.id.replace('chapter', ''), 10);
        if (chapters[chapterNumber]) {  
            loadChapterPages(chapterNumber);
            
        } else {
            alert(`Chapter ${chapterNumber} has not been released yet.`);
        }
    }
});

async function loadImageSequentially(src, alt) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.width = 1000;
        img.src = src;
        img.alt = alt;
        img.onload = () => resolve(img);
        img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            const errorPlaceholder = document.createElement('div');
            errorPlaceholder.textContent = `Image not available: ${alt}`;
            errorPlaceholder.classList.add('imageError');
            resolve(errorPlaceholder);
        };
    });
}

async function loadChapterPages(chapterNumber) {
    readingChapter = true;

    const chapterData = chapters[chapterNumber];
    const mangaPagesDiv = document.getElementById('chapterPages');
    mangaPagesDiv.innerHTML = '';

    document.querySelectorAll('#chapterList a').forEach(link => {
        link.classList.add('not-clickable');
    });
    hideOtherChapters(chapterNumber);

    try {
        const totalImages = chapterData.images.length;

        function createPageSeparator() {
            const separator = document.createElement('div');
            separator.classList.add('pageSeparator');
            return separator;
        }

        for (let i = 0; i < totalImages; i++) {
            const img = await loadImageSequentially(chapterData.images[i], chapterData.altTexts[i]);
            mangaPagesDiv.appendChild(img);

            if (i < totalImages - 1) {
                mangaPagesDiv.appendChild(createPageSeparator());
            }
        }
    } catch (error) {
        console.error('Error loading pages:', error);
    } 
}

function hideOtherChapters(exceptChapterNumber) {
    document.querySelectorAll('#chapterList a').forEach(link => {
        const chapterNumber = parseInt(link.id.replace('chapter', ''), 10);
        if (chapterNumber !== exceptChapterNumber) {
            link.style.display = 'none';
        }
    });
}
