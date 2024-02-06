document.getElementById('chapter1').addEventListener('click', function() {
    loadChapterPages();
});

async function loadChapterPages() {
    const mangaPagesDiv = document.getElementById('chapter1Pages');
    mangaPagesDiv.innerHTML = '';

    try {
        // Array of image URLs
        const imageList = [
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Title.jpeg',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Characters.jpeg',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/How%20to%20Read.jpeg',
            'https://raw.githubusercontent.com/shiroiozoku/shiroiozoku.github.io/main/Chapter%201/Page%201.jpeg'
        ];

        let currentPageIndex = 0;
        const totalImages = imageList.length;

        function showPage(index) {
            mangaPagesDiv.innerHTML = '';
            let img = document.createElement('img');
            img.width = 1000; 
            img.height = 1300;
            img.src = imageList[index];
            img.alt = 'Chapter 1 Page';
            mangaPagesDiv.appendChild(img);
        }

        function nextPage() {
            currentPageIndex++;
            if (currentPageIndex >= totalImages) {
                currentPageIndex = totalImages - 1;
            }
            showPage(currentPageIndex);
        }

        function previousPage() {
            currentPageIndex--;
            if (currentPageIndex < 0) {
                currentPageIndex = 0;
            }
            showPage(currentPageIndex);
        }

        showPage(currentPageIndex);

        const prevButton = document.createElement('button');
        prevButton.textContent = '←'; // Left arrow symbol
        prevButton.addEventListener('click', previousPage);

        const nextButton = document.createElement('button');
        nextButton.textContent = '→'; // Right arrow symbol
        nextButton.addEventListener('click', nextPage);

        // Initially hide the buttons
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';

        // Insert left button before "Chapter 1" text
        document.getElementById('prevPage').appendChild(prevButton);

        // Insert right button after "Chapter 1" text
        const chapter1Link = document.getElementById('chapter1');
        chapter1Link.parentNode.insertBefore(nextButton, chapter1Link.nextSibling);

        // Show the buttons after loading chapter pages
        prevButton.style.display = 'inline-block';
        nextButton.style.display = 'inline-block';

    } catch (error) {
        console.error('Error loading pages:', error);
    }
}

