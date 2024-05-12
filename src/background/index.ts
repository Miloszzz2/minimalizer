async function init() {
    var targetNode = document.body;
    const data = await chrome.storage.sync.get("options");
    var config = { childList: true, subtree: true };
    var callback = function (mutationsList: any, observer: any) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const recommendationsEl = document.getElementsByTagName("ytd-watch-next-secondary-results-renderer")[0] as HTMLElement;
                const shortsEl = document.getElementsByTagName("ytd-reel-shelf-renderer")[0] as HTMLElement;
                const commentsEl = document.getElementsByTagName("ytd-comments")[0] as HTMLElement;
                if (shortsEl && recommendationsEl && commentsEl) {
                    if (data.options)
                        VisibilityChange(data.options);
                    observer.disconnect();
                    return;
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
            console.log(changes.options);
            VisibilityChange(changes.options.newValue)
        }
    }
);
function VisibilityChange(changes: any) {
    const recommendationsEl = document.getElementsByTagName("ytd-watch-next-secondary-results-renderer")[0] as HTMLElement;
    const shortsEl = document.getElementsByTagName("ytd-reel-shelf-renderer")[0] as HTMLElement;
    const commentsEl = document.getElementsByTagName("ytd-comments")[0] as HTMLElement;

    if (Boolean(changes.recommendations_checked) === false) {
        recommendationsEl.style.display = "none";
    }
    else {
        recommendationsEl.style.display = "flex";
    }
    if (Boolean(changes.recommendations_checked) === false) {
        shortsEl.style.display = "none";
    }
    else {
        shortsEl.style.display = "flex";
    }

    if (Boolean(changes.comments_checked) === false) {
        commentsEl.style.display = "none";
    }
    else {
        commentsEl.style.display = "flex";
    }
}