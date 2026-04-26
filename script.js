import { chapters } from './pages.js';

const validChapters = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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
    const wrapper = document.createElement('div');
    wrapper.className = 'imagePlaceholder';

    const img = new Image();
    img.src = src;
    img.alt = alt || 'Page';
    img.className = 'page-img';

    img.onload = () => {
        wrapper.innerHTML = '';
        wrapper.appendChild(img);

        wrapper.classList.remove('imagePlaceholder');

        requestAnimationFrame(() => {
            img.classList.add('visible');
        });
    };

    return { wrapper, img };
}

async function loadChapterPages(chapterNumber) {
    mangaPagesDiv.innerHTML = '';
    toggleView('reader');

    const chapter = chapters[chapterNumber];
    if (!chapter) {
        console.error('Chapter not found:', chapterNumber);
        toggleView('home');
        return;
    }

    document.title = chapterNumber === 8 ? 'All Pages' : `Chapter ${chapterNumber}`;
    updateReaderNavigation(chapterNumber);

    for (let i = 0; i < chapter.images.length; i++) {
        const { wrapper, img } = createPageElement(
            chapter.images[i],
            chapter.altTexts ? chapter.altTexts[i] : `Page ${i + 1}`
        );

        mangaPagesDiv.appendChild(wrapper);

        await new Promise(resolve => {
            if (img.complete) {
                resolve();
            } else {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
            }
        });
    }
}

function updateReaderNavigation(currentChap) {
    readerNavDiv.innerHTML = '';

    if (currentChap > 0 && currentChap < 8 && chapters[currentChap - 1]) {
        const prev = document.createElement('button');
        prev.className = 'nav-btn';
        prev.textContent = '- Previous';
        prev.onclick = () => {
            history.pushState({ chapter: currentChap - 1 }, '', `/chapter${currentChap - 1}`);
            loadChapterPages(currentChap - 1);
        };
        readerNavDiv.appendChild(prev);
    } else {
        readerNavDiv.appendChild(document.createElement('div'));
    }

    if (chapters[currentChap + 1] && currentChap + 1 < 8) {
        const next = document.createElement('button');
        next.className = 'nav-btn primary';
        next.textContent = 'Next +';
        next.onclick = () => {
            history.pushState({ chapter: currentChap + 1 }, '', `/chapter${currentChap + 1}`);
            loadChapterPages(currentChap + 1);
        };
        readerNavDiv.appendChild(next);
    } else {
        const homeBtn = document.createElement('button');
        homeBtn.className = 'nav-btn primary';
        homeBtn.textContent = 'Home';
        homeBtn.onclick = () => toggleView('home');

        if (currentChap === 8) {
            homeBtn.style.borderRadius = '4px';
        }

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
        loadChapterPages(8);
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