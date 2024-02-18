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
        alert("Chapter 2 has not been released yet.");
    }
});

document.getElementById('homeLink').addEventListener('click', function() {
    window.location.href = "";
});

async function loadChapterPages(chapterNumber) {
    readingChapter = true;

    const mangaPagesDiv = document.getElementById('chapter1Pages');
    mangaPagesDiv.innerHTML = '';
    document.querySelector('.chapterDivider').style.display = 'none';

    try {
        let imageList = [];
        if (chapterNumber === 1) {
            document.getElementById('chapter1').classList.add('not-clickable');
            chapter2.style.display = "none";
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
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%210.png'
    
            ];
        } 

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
            img.alt = `Chapter ${chapterNumber} Page ${i + 1}`;
            mangaPagesDiv.appendChild(img);

            if (i < totalImages - 1) {
                mangaPagesDiv.appendChild(createPageSeparator());
            }
        }

    } catch (error) {
        console.error('Error loading pages:', error);
    }
}
