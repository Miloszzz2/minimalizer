
import recommendations from './recommendations.css?inline';
chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        const recommendationsEl = document.getElementsByTagName("ytd-watch-next-secondary-results-renderer")[0] as HTMLElement;
        const shortsEl = document.getElementsByTagName("ytd-reel-shelf-renderer")[0] as HTMLElement;
        const commentsEl = document.getElementsByTagName("ytd-comments")[0] as HTMLElement;

        if (request.recommends_checked === false) {
            recommendationsEl.style.display = "none";
        }
        else {
            recommendationsEl.style.display = "flex";
        }

        if (request.shorts_checked === false) {
            shortsEl.style.display = "none";
        }
        else {
            shortsEl.style.display = "flex";
        }

        if (request.comments_checked === false) {
            commentsEl.style.display = "none";
        }
        else {
            commentsEl.style.display = "flex";
        }

    }
);