import "./output.css";

const shorts_switch = document.getElementById(
	"shorts-content",
) as HTMLInputElement;
const recommendations_switch = document.getElementById(
	"recommends-content",
) as HTMLInputElement;
const comments_switch = document.getElementById(
	"comments-content",
) as HTMLInputElement;
const main_switch = document.getElementById("main-content") as HTMLInputElement;

export type SwitchedChecked = {
	shorts_checked: boolean;
	recommendations_checked: boolean;
	comments_checked: boolean;
	main_checked: boolean;
};

let options: SwitchedChecked = {
	shorts_checked: shorts_switch.checked,
	recommendations_checked: recommendations_switch.checked,
	comments_checked: comments_switch.checked,
	main_checked: main_switch.checked,
};

async function LoadData() {
	const data = await chrome.storage.sync.get("options");
	Object.assign(options, data.options);
	shorts_switch.checked = Boolean(options.shorts_checked);
	recommendations_switch.checked = Boolean(options.recommendations_checked);
	comments_switch.checked = Boolean(options.comments_checked);
	main_switch.checked = Boolean(options.main_checked);
}

LoadData();

shorts_switch.addEventListener("change", () => {
	options = {
		shorts_checked: shorts_switch.checked,
		recommendations_checked: recommendations_switch.checked,
		comments_checked: comments_switch.checked,
		main_checked: main_switch.checked,
	};
	chrome.storage.sync.set({ options });
});

recommendations_switch.addEventListener("change", () => {
	options = {
		shorts_checked: shorts_switch.checked,
		recommendations_checked: recommendations_switch.checked,
		comments_checked: comments_switch.checked,
		main_checked: main_switch.checked,
	};
	chrome.storage.sync.set({ options });
});

comments_switch.addEventListener("change", () => {
	options = {
		shorts_checked: shorts_switch.checked,
		recommendations_checked: recommendations_switch.checked,
		comments_checked: comments_switch.checked,
		main_checked: main_switch.checked,
	};
	chrome.storage.sync.set({ options });
});

main_switch.addEventListener("change", () => {
	options = {
		shorts_checked: shorts_switch.checked,
		recommendations_checked: recommendations_switch.checked,
		comments_checked: comments_switch.checked,
		main_checked: main_switch.checked,
	};
	chrome.storage.sync.set({ options });
});
