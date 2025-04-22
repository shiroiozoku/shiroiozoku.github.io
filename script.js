let readingChapter = false;

import { chapters } from './pages.js';

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
    placeholder.style.height = '1400px'; 
    placeholder.dataset.src = src;
    placeholder.dataset.alt = alt;
    return placeholder;
}

function createPageSeparator() {
    const separator = document.createElement('div');
    separator.classList.add('pageSeparator');
    return separator;
}

async function loadChapterPages(chapterNumber) {
    readingChapter = true;

    const chapterData = chapters[chapterNumber];
    const mangaPagesDiv = document.getElementById('chapterPages');

    // Clear previous content efficiently
    while (mangaPagesDiv.firstChild) {
        mangaPagesDiv.removeChild(mangaPagesDiv.firstChild);
    }

    document.querySelectorAll('#chapterList a').forEach(link => {
        link.classList.add('not-clickable');
    });

    hideOtherChapters(chapterNumber);

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
        rootMargin: '800px 0px',
        threshold: 0
    });

    const totalImages = chapterData.images.length;
    let i = 0;

    function loadNextBatch() {
        const fragment = document.createDocumentFragment();

        for (let batch = 0; batch < 3 && i < totalImages; batch++, i++) {
            const container = createLazyImageContainer(chapterData.images[i], chapterData.altTexts[i]);
            fragment.appendChild(container);
            observer.observe(container);

            if (i < totalImages - 1) {
                fragment.appendChild(createPageSeparator());
            }
        }

        mangaPagesDiv.appendChild(fragment);

        if (i < totalImages) {
            requestIdleCallback(loadNextBatch);
        }
    }

    requestIdleCallback(loadNextBatch);
}

function hideOtherChapters(exceptChapterNumber) {
    document.querySelectorAll('#chapterList a').forEach(link => {
        const chapterNumber = parseInt(link.id.replace('chapter', ''), 10);
        if (chapterNumber !== exceptChapterNumber) {
            link.style.display = 'none';
        }
    });
}