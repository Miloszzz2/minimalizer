import './output.css';

// Get the element by ID and cast it to HTMLElement or null
const shorts_switch = document.getElementById('shorts-content') as HTMLInputElement;
const recommendations_switch = document.getElementById('recommends-content') as HTMLInputElement;
const comments_switch = document.getElementById('comments-content') as HTMLInputElement;
shorts_switch.addEventListener('change', async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        console.log(tabs)
        if (tabs[0].id && tabs[0].url?.includes("https://www.youtube.com")) {
            const response = await chrome.tabs.sendMessage(tabs[0].id, { shorts_checked: shorts_switch.checked, recommends_checked: recommendations_switch.checked, comments_checked: comments_switch.checked });
            console.log(response);
        }
    });
    // do something with response here, not outside the function

});
recommendations_switch.addEventListener('change', async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        console.log(tabs)
        if (tabs[0].id && tabs[0].url?.includes("https://www.youtube.com")) {
            const response = await chrome.tabs.sendMessage(tabs[0].id, { shorts_checked: shorts_switch.checked, recommends_checked: recommendations_switch.checked, comments_checked: comments_switch.checked });
            console.log(response);
        }
    });
    // do something with response here, not outside the function

});
comments_switch.addEventListener('change', async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        console.log(tabs)
        if (tabs[0].id && tabs[0].url?.includes("https://www.youtube.com")) {
            const response = await chrome.tabs.sendMessage(tabs[0].id, { shorts_checked: shorts_switch.checked, recommends_checked: recommendations_switch.checked, comments_checked: comments_switch.checked });
            console.log(response);
        }
    });
    // do something with response here, not outside the function

});