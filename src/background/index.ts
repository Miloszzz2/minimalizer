import type { SwitchedChecked } from "../popup";

async function init() {
	const targetNode = document.body;

	const config = { childList: true, subtree: true };
	const callback = async (
		mutationsList: MutationRecord[],
		observer: MutationObserver,
	) => {
		for (const mutation of mutationsList) {
			if (mutation.type === "childList") {
				const data = await chrome.storage.sync.get("options");
				const recommendationsEl = document.getElementsByTagName(
					"ytd-watch-next-secondary-results-renderer",
				)[0] as HTMLElement;
				const shortsEl = document.getElementsByTagName(
					"ytd-reel-shelf-renderer",
				)[0] as HTMLElement;
				const commentsEl = document.getElementsByTagName(
					"ytd-comments",
				)[0] as HTMLElement;
				const richShortsRenderer = document.getElementsByTagName(
					"ytd-rich-section-renderer",
				) as HTMLCollectionOf<HTMLElement>;
				const richGridRenderer = document.querySelectorAll(
					"#contents.ytd-rich-grid-renderer",
				) as NodeListOf<HTMLElement>;
				if (
					shortsEl ||
					recommendationsEl ||
					commentsEl ||
					richShortsRenderer[0] ||
					richGridRenderer[0]
				) {
					if (data.options) VisibilityChange(data.options);

					if (data.options.shorts_checked === true) {
						console.log("stopped1");
						observer.disconnect();
						return;
					}
				}
			}
		}
	};

	const observer = new MutationObserver(callback);

	observer.observe(targetNode, config);
}

init();

chrome.storage.onChanged.addListener((changes, area) => {
	if (area === "sync" && changes.options?.newValue) {
		VisibilityChange(changes.options.newValue);
	}
});
function VisibilityChange(changes: SwitchedChecked) {
	const recommendationsEl = document.getElementsByTagName(
		"ytd-watch-next-secondary-results-renderer",
	)[0] as HTMLElement;
	const reel_shorts_renderer = document.getElementsByTagName(
		"ytd-reel-shelf-renderer",
	) as HTMLCollectionOf<HTMLElement>;
	const rich_shorts_renderer = document.getElementsByTagName(
		"ytd-rich-section-renderer",
	) as HTMLCollectionOf<HTMLElement>;
	const shorts = Array.from(reel_shorts_renderer).concat(
		Array.from(rich_shorts_renderer),
	);
	const commentsEl = document.getElementsByTagName(
		"ytd-comments",
	)[0] as HTMLElement;

	const main_page_recommends = document.querySelectorAll(
		"#contents.ytd-rich-grid-renderer",
	) as NodeListOf<HTMLElement>;

	if (recommendationsEl) {
		if (Boolean(changes.recommendations_checked) === false) {
			recommendationsEl.style.display = "none";
		} else {
			recommendationsEl.style.display = "flex";
		}
	}

	if (shorts.length > 0) {
		if (Boolean(changes.shorts_checked) === false) {
			for (const shorts_obj of shorts) {
				shorts_obj.style.display = "none";
			}
		} else {
			for (const shorts_obj of shorts) {
				shorts_obj.style.display = "flex";
			}
		}
	}

	if (commentsEl) {
		if (Boolean(changes.comments_checked) === false) {
			commentsEl.style.display = "none";
		} else {
			commentsEl.style.display = "flex";
		}
	}
	if (main_page_recommends.length > 0) {
		if (Boolean(changes.main_checked) === false) {
			for (const main_obj of main_page_recommends) {
				main_obj.style.display = "none";
			}
		} else {
			for (const main_obj of main_page_recommends) {
				main_obj.style.display = "flex";
			}
		}
	}
}
