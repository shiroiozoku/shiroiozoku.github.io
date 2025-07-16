import { chapters } from './pages.js';

const imageCache = new Map();
let readingChapter = false;
let currentChapterNumber = null;

const TITLE_TEXT = 'Shiroi Ozoku';
const CHAPTER_LIST_TEXT = 'Chapter List';

function runWhenIdle(fn) {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(fn);
    } else {
        setTimeout(fn, 200);
    }
}

function hideOtherChapters(exceptChapterNumber) {
    document.querySelectorAll('#chapterList a').forEach(link => {
        const chapterNumber = parseInt(link.dataset.chapter, 10);
        if (chapterNumber !== exceptChapterNumber) {
            link.style.display = 'none';
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function loadImageSequentially(src, alt) {
    if (imageCache.has(src)) return Promise.resolve(imageCache.get(src));

    return new Promise((resolve) => {
        const img = new Image();
        img.width = 1000;
        img.src = src;
        img.alt = alt;

        img.onload = () => {
            img.decode().then(() => {
                imageCache.set(src, img);
                resolve(img);
            }).catch(() => {
                imageCache.set(src, img);
                resolve(img);
            });
        };

        img.onerror = () => {
            console.error(`Failed to load ${src}`);
            const errorPlaceholder = document.createElement('div');
            errorPlaceholder.textContent = `${alt} not available`;
            errorPlaceholder.style.color = 'white';
            errorPlaceholder.classList.add('imageError');
            resolve(errorPlaceholder);
        };
    });
}

function createLazyImageContainer(src, alt) {
    const placeholder = document.createElement('div');
    placeholder.classList.add('imagePlaceholder');
    placeholder.dataset.src = src;
    placeholder.dataset.alt = alt;
    return placeholder;
}

function createPageSeparator() {
    const separator = document.createElement('div');
    separator.classList.add('pageSeparator');
    return separator;
}

function updateTitle() {
    const homeLink = document.getElementById("homeLink");
    if (readingChapter) {
        homeLink.innerHTML = `<a href="/" id="chapterLink">${CHAPTER_LIST_TEXT}</a>`;
    } else {
        homeLink.textContent = TITLE_TEXT;
    }
}

function setupCollapsibleToggle() {
    document.addEventListener("click", function (e) {
        const coll = e.target.closest('.collapsible');
        if (!coll) return;

        const content = coll.nextElementSibling;

        document.querySelectorAll('.collapsible.active').forEach(other => {
            if (other !== coll) {
                other.classList.remove('active');
                other.nextElementSibling.style.maxHeight = null;
                other.textContent = 'Show Comments';
            }
        });

        coll.classList.toggle('active');
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            coll.textContent = 'Show Comments';
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            coll.textContent = 'Hide Comments';
        }
    }, { passive: true });
}

function setupChapterClickListener() {
    document.getElementById('chapterList').addEventListener('click', async (event) => {
        const target = event.target;
        if (target.tagName === 'A') {
            event.preventDefault();

            if (readingChapter && currentChapterNumber !== null) {
                const fileName = currentChapterNumber === 0
                    ? 'Shiroi Ozoku All Chapters.pdf'
                    : `Shiroi Ozoku Chapter ${currentChapterNumber}.pdf`;

                const pdfUrl = `pdfs/chapter${currentChapterNumber}.pdf`;
                const a = document.createElement('a');
                a.href = pdfUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                const chapterId = target.id;
                const chapterNumber = chapterId === 'allchapters'
                    ? 0
                    : parseInt(chapterId.replace('chapter', ''), 10);

                loadChapterPages(chapterNumber);
                history.pushState({ chapter: chapterNumber }, '', chapterId === 'allchapters' ? '/allchapters' : `/chapter${chapterNumber}`);
            }
        }
    });
}

window.addEventListener('popstate', (event) => {
    if (event.state?.chapter != null) {
        loadChapterPages(event.state.chapter);
    } else {
        location.reload();
    }
});

async function loadChapterPages(chapterNumber) {
    try {
        readingChapter = true;
        currentChapterNumber = chapterNumber;
        updateTitle();
        scrollToTop();

        const navElements = document.getElementsByTagName('nav');
        for (const nav of navElements) {
            nav.style.borderBottom = '4px solid black';
        }

        const chapterData = chapters[chapterNumber];
        const mangaPagesDiv = document.getElementById('chapterPages');
        mangaPagesDiv.innerHTML = '';

        const downloadText = Number(chapterNumber) === 0 ? 'Download All Chapters' : `Download Chapter ${chapterNumber}`;
        document.querySelectorAll('#chapterList a').forEach(link => {
            link.classList.add('download-link');
            link.textContent = downloadText;
        });

        hideOtherChapters(chapterNumber);

        const totalImages = chapterData.images.length;
        const fragment = document.createDocumentFragment();

        const firstImage = await loadImageSequentially(chapterData.images[0], chapterData.altTexts[0]);
        fragment.appendChild(firstImage);

        if (totalImages > 1) {
            fragment.appendChild(createPageSeparator());
        }

        mangaPagesDiv.appendChild(fragment);

        let i = 1;
        const isFastConnection = navigator.connection?.effectiveType?.includes('4g');

        const observer = new IntersectionObserver(async (entries, obs) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const container = entry.target;
                    const src = container.dataset.src;
                    const alt = container.dataset.alt;
                    const img = await loadImageSequentially(src, alt);
                    container.replaceWith(img);
                    obs.unobserve(container);
                }
            }
        }, {
            rootMargin: isFastConnection ? '1200px 0px' : '800px 0px',
            threshold: 0
        });

        function loadNextBatch() {
            const batchFragment = document.createDocumentFragment();

            for (let batch = 0; batch < 3 && i < totalImages; batch++, i++) {
                const container = createLazyImageContainer(chapterData.images[i], chapterData.altTexts[i]);
                batchFragment.appendChild(container);
                observer.observe(container);

                if (i < totalImages - 1) {
                    batchFragment.appendChild(createPageSeparator());
                }
            }

            mangaPagesDiv.appendChild(batchFragment);
            if (i < totalImages) runWhenIdle(loadNextBatch);
        }

        runWhenIdle(loadNextBatch);

        const nextChapter = chapters[chapterNumber + 1];
        if (nextChapter?.images?.[0]) {
            const preloadImg = new Image();
            preloadImg.src = nextChapter.images[0];
        }
    } catch (error) {
        console.error('Error loading chapter:', error);
    }
}

const path = location.pathname;
const validChapters = [1, 2, 3, 4];

if (path === '/' || path === '/404.html') {
} else if (path === '/allchapters') {
    history.replaceState({ chapter: 0 }, '', '/allchapters');
    loadChapterPages(0);
} else {
    const chapterMatch = path.match(/^\/chapter(\d+)$/);
    if (chapterMatch) {
        const chapterNumber = parseInt(chapterMatch[1], 10);
        if (validChapters.includes(chapterNumber)) {
            history.replaceState({ chapter: chapterNumber }, '', path);
            loadChapterPages(chapterNumber);
        } else {
            window.location.href = '/';
        }
    } else {
        window.location.href = '/';
    }
}

setupCollapsibleToggle();
setupChapterClickListener();