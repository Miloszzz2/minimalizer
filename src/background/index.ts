async function init() {
    var targetNode = document.body;

    var config = { childList: true, subtree: true };
    var callback = async function (mutationsList: any, observer: any) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const data = await chrome.storage.sync.get("options");
                const recommendationsEl = document.getElementsByTagName("ytd-watch-next-secondary-results-renderer")[0] as HTMLElement;
                const shortsEl = document.getElementsByTagName("ytd-reel-shelf-renderer")[0] as HTMLElement;
                const commentsEl = document.getElementsByTagName("ytd-comments")[0] as HTMLElement;
                const richShortsRenderer = document.getElementsByTagName("ytd-rich-section-renderer") as HTMLCollectionOf<HTMLElement>;
                if (shortsEl || recommendationsEl || commentsEl || richShortsRenderer[0]) {
                    if (data.options)
                        VisibilityChange(data.options);

                    if (data.options.shorts_checked === true) {
                        console.log("stopped1")
                        observer.disconnect();
                        return;
                    }
                }

            }
        }
    };

    var observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
}

init();

chrome.storage.onChanged.addListener(
    function (changes, area) {
        if (area == 'sync' && changes.options?.newValue) {
            VisibilityChange(changes.options.newValue)
        }
    }
);
function VisibilityChange(changes: any) {
    const recommendationsEl = document.getElementsByTagName("ytd-watch-next-secondary-results-renderer")[0] as HTMLElement;
    const reel_shorts_renderer = document.getElementsByTagName("ytd-reel-shelf-renderer") as HTMLCollectionOf<HTMLElement>;
    const rich_shorts_renderer = document.getElementsByTagName("ytd-rich-section-renderer") as HTMLCollectionOf<HTMLElement>;
    const shorts = Array.from(reel_shorts_renderer).concat(Array.from(rich_shorts_renderer));
    const commentsEl = document.getElementsByTagName("ytd-comments")[0] as HTMLElement;

    if (recommendationsEl) {
        if (Boolean(changes.recommendations_checked) === false) {
            recommendationsEl.style.display = "none";
        }
        else {
            recommendationsEl.style.display = "flex";
        }
    }

    if (shorts.length > 0) {
        if (Boolean(changes.shorts_checked) === false) {
            shorts.forEach((shorts_obj) => {
                shorts_obj.style.display = "none"
            });
        } else {
            Array.from(shorts).forEach((shorts_obj) => {
                shorts_obj.style.display = "flex"
            });
        }
    }


    if (commentsEl) {
        if (Boolean(changes.comments_checked) === false) {
            commentsEl.style.display = "none";
        }
        else {
            commentsEl.style.display = "flex";
        }
    }
}