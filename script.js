import { chapters } from './pages.js';

const validChapters = [0, 1, 2, 3, 4, 5];

const homeView = document.getElementById('home-view');
const readerView = document.getElementById('reader-view');
const mangaPagesDiv = document.getElementById('chapterPages');
const readerNavDiv = document.getElementById('readerNav');
const chapterGrid = document.getElementById('chapterGrid');
const startBtn = document.getElementById('startReadingBtn');

function toggleView(view) {
    if (view === 'reader') {
        if (homeView) homeView.style.display = 'none';
        if (readerView) readerView.style.display = 'block';
        window.scrollTo(0, 0);
    } else {
        if (homeView) homeView.style.display = 'block';
        if (readerView) readerView.style.display = 'none';
        mangaPagesDiv.innerHTML = '';
        document.title = 'Shiroi Ozoku';
        history.pushState(null, '', '/');
    }
}

function createPageElement(src, alt) {
    const img = new Image();
    img.src = src;
    img.alt = alt || 'Page';
    img.loading = 'lazy';
    img.style.width = '100%';
    img.style.maxWidth = '1200px';
    img.style.display = 'block';
    img.style.margin = '0 auto 5px';
    return img;
}

function createPageSeparator(text) {
    const sep = document.createElement('div');
    sep.className = 'pageSeparator';
    if (text) {
        sep.textContent = text;
        sep.style.textAlign = 'center';
        sep.style.fontWeight = 'bold';
        sep.style.margin = '20px 0';
    }
    return sep;
}

function loadChapterPages(chapterNumber) {
    mangaPagesDiv.innerHTML = '';
    toggleView('reader');

    if (chapterNumber === 5) {
        document.title = 'All Pages';
        updateReaderNavigation(5);
        for (let i = 1; i <= 4; i++) {
            const chapter = chapters[i];
            if (!chapter) continue;

            chapter.images.forEach((src, index) => {
                mangaPagesDiv.appendChild(
                    createPageElement(src, chapter.altTexts ? chapter.altTexts[index] : `Page ${index + 1}`)
                );
            });
        }
        return;
    }

    const chapter = chapters[chapterNumber];
    if (!chapter) {
        console.error('Chapter not found:', chapterNumber);
        toggleView('home');
        return;
    }

    document.title = `Chapter ${chapterNumber}`;
    updateReaderNavigation(chapterNumber);

    chapter.images.forEach((src, index) => {
        mangaPagesDiv.appendChild(
            createPageElement(src, chapter.altTexts ? chapter.altTexts[index] : `Page ${index + 1}`)
        );
        mangaPagesDiv.appendChild(createPageSeparator());
    });
}

function updateReaderNavigation(currentChap) {
    readerNavDiv.innerHTML = '';

    if (currentChap > 0 && currentChap < 5 && chapters[currentChap - 1]) {
        const prev = document.createElement('button');
        prev.className = 'nav-btn';
        prev.textContent = '- Previous Chapter';
        prev.onclick = () => {
            history.pushState({ chapter: currentChap - 1 }, '', `/chapter${currentChap - 1}`);
            loadChapterPages(currentChap - 1);
        };
        readerNavDiv.appendChild(prev);
    } else {
        readerNavDiv.appendChild(document.createElement('div'));
    }

    if (chapters[currentChap + 1] && currentChap + 1 < 5) {
        const next = document.createElement('button');
        next.className = 'nav-btn primary';
        next.textContent = 'Next Chapter +';
        next.onclick = () => {
            history.pushState({ chapter: currentChap + 1 }, '', `/chapter${currentChap + 1}`);
            loadChapterPages(currentChap + 1);
        };
        readerNavDiv.appendChild(next);
    } else {
        const homeBtn = document.createElement('button');
        homeBtn.className = 'nav-btn primary';
        homeBtn.textContent = 'Return Home';
        homeBtn.onclick = () => toggleView('home');
        readerNavDiv.appendChild(homeBtn);
    }
}

if (chapterGrid) {
    chapterGrid.addEventListener('click', e => {
        const card = e.target.closest('.chapter-card');
        if (!card) return;

        e.preventDefault();
        const num = parseInt(card.dataset.chapter, 10);
        if (!isNaN(num)) {
            history.pushState({ chapter: num }, '', `/chapter${num}`);
            loadChapterPages(num);
        }
    });
}

if (startBtn) {
    startBtn.addEventListener('click', () => {
        loadChapterPages(5);
    });
}

window.addEventListener('popstate', e => {
    if (e.state?.chapter !== undefined) {
        loadChapterPages(e.state.chapter);
    } else {
        toggleView('home');
    }
});

const match = location.pathname.match(/^\/chapter(\d+)$/);
if (match) {
    const num = parseInt(match[1], 10);
    if (validChapters.includes(num)) {
        loadChapterPages(num);
    } else {
        history.replaceState(null, '', '/');
        toggleView('home');
    }
}

const collapsible = document.querySelector('.collapsible');
if (collapsible) {
    collapsible.addEventListener('click', function () {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            this.textContent = 'Show Comments';
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            this.textContent = 'Hide Comments';
        }
    });
}
