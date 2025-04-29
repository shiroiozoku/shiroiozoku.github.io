let readingChapter = false;
let currentChapterNumber = null; 

const SHOW_COMMENTS = 'Show Comments';
const HIDE_COMMENTS = 'Hide Comments';
const CHAPTER_LIST_TEXT = 'Chapter List';
const TITLE_TEXT = 'Shiroi Ozoku';

const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
const imageCache = new WeakMap();

import { chapters } from './pages.js';

function updateTitle() {
    const homeLink = document.getElementById("homeLink");
    if (readingChapter) {
        homeLink.innerHTML = `<a href="/" id="chapterLink">${CHAPTER_LIST_TEXT}</a>`;
    } else {
        homeLink.textContent = TITLE_TEXT;
    }
}

if (isHomePage) updateTitle();

document.addEventListener("click", function (e) {
    const coll = e.target.closest('.collapsible');
    if (!coll) return;

    const content = coll.nextElementSibling;

    document.querySelectorAll('.collapsible.active').forEach(other => {
        if (other !== coll) {
            other.classList.remove('active');
            other.nextElementSibling.style.maxHeight = null;
            other.textContent = SHOW_COMMENTS;
        }
    });

    coll.classList.toggle('active');
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        coll.textContent = SHOW_COMMENTS;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        coll.textContent = HIDE_COMMENTS;
    }
}, { passive: true });

document.getElementById('chapterList').addEventListener('click', async (event) => {
    const target = event.target;
    if (target.tagName === 'A') {
        event.preventDefault();

        if (readingChapter && currentChapterNumber !== null) {
            const pdfUrl = `pdfs/chapter${currentChapterNumber}.pdf`; 
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = `Shiroi Ozoku Chapter ${currentChapterNumber}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            const chapterNumber = parseInt(target.id.replace('chapter', ''), 10);
            if (chapters[chapterNumber]) {
                loadChapterPages(chapterNumber);
            } else {
                alert(`Chapter ${chapterNumber} has not been released yet.`);
            }
        }
    }
});

function loadImageSequentially(src, alt) {
    const key = { src };
    if (imageCache.has(key)) return Promise.resolve(imageCache.get(key));

    return new Promise((resolve) => {
        const img = new Image();
        img.width = 1000;
        img.src = src;
        img.alt = alt;

        img.onload = () => {
            img.decode().then(() => {
                imageCache.set(key, img);
                resolve(img);
            }).catch(() => {
                imageCache.set(key, img);
                resolve(img);
            });
        };

        img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
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

function runWhenIdle(fn) {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(fn);
    } else {
        setTimeout(fn, 200);
    }
}

async function loadChapterPages(chapterNumber) {
    readingChapter = true;
    currentChapterNumber = chapterNumber;
    updateTitle();

    const chapterData = chapters[chapterNumber];
    const mangaPagesDiv = document.getElementById('chapterPages');
    mangaPagesDiv.innerHTML = '';

    document.querySelectorAll('#chapterList a').forEach(link => {
        link.classList.add('download-link');
        link.textContent = `Download Chapter ${chapterNumber}`;
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

        if (i < totalImages) {
            runWhenIdle(loadNextBatch);
        }
    }

    runWhenIdle(loadNextBatch);

    const nextChapter = chapters[chapterNumber + 1];
    if (nextChapter?.images?.[0]) {
        const preloadImg = new Image();
        preloadImg.src = nextChapter.images[0];
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