let readingChapter = false;

document.getElementById('chapter1').addEventListener('click', function(event) {
    if (!readingChapter) {
        event.preventDefault();  
        loadChapterPages(1); 
    }
});

document.getElementById('chapter2').addEventListener('click', function(event) {
    if (!readingChapter) {
        event.preventDefault();
        alert("Chapter 2 has not been released yet.");
    }
});

document.getElementById('homeLink').addEventListener('click', function() {
    window.location.href = ""; 
});

async function loadChapterPages(chapterNumber) {
    readingChapter = true; {
    const mangaPagesDiv = document.getElementById('chapter1Pages');
    mangaPagesDiv.innerHTML = '';
    document.querySelector('.chapterDivider').style.display = 'none';
    try {
        let imageList;
        if (chapterNumber === 1) {
            chapter2.style.display = "none";
            imageList = [
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Title.jpg',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io//main/Chapter%201/Characters.jpg',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/How%20to%20Read.jpg',
                'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%201.jpeg'
            ];
            document.getElementById('chapter1').classList.add('not-clickable');
        } else if (chapterNumber === 2) {
            imageList = [];
        }

        let currentPageIndex = 0;
        const totalImages = imageList.length;

        function showPage(index) {
            mangaPagesDiv.innerHTML = '';
            let img = document.createElement('img');
            img.width = 800
            img.src = imageList[index];
            img.alt = 'Chapter 1 Page';
            mangaPagesDiv.appendChild(img);
        }

        function nextPage() {
            currentPageIndex++;
            if (currentPageIndex >= totalImages - 1) {
                nextButton.style.display = 'none';
            }
            if (currentPageIndex > 0) {
                prevButton.style.display = ''; 
            }
            if (currentPageIndex >= totalImages) {
                currentPageIndex = totalImages - 1;
            }
            showPage(currentPageIndex);
        }
        
        function previousPage() {
            currentPageIndex--;
            if (currentPageIndex <= 0) {
                prevButton.style.display = 'none';
            } else {
                prevButton.style.display = ''; 
            }
            if (currentPageIndex < 0) {
                currentPageIndex = 0;
            }
            if (currentPageIndex < totalImages - 1) {
                nextButton.style.display = ''; 
            }
            showPage(currentPageIndex);
        }
        
        showPage(currentPageIndex);
        
        

        const prevButton = document.createElement('button');
        prevButton.textContent = '←'; 
        prevButton.addEventListener('click', previousPage);

        const nextButton = document.createElement('button');
        nextButton.textContent = '→'; 
        nextButton.addEventListener('click', nextPage);

        document.getElementById('prevPage').appendChild(prevButton);
        document.getElementById('nextPage').appendChild(nextButton);

        const chapter1Link = document.getElementById('chapter1');
        chapter1Link.parentNode.insertBefore(nextButton, chapter1Link.nextSibling);

    
        prevButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';

    } catch (error) {
        console.error('Error loading pages:', error);
    }
}
}
