/**
 * Runs on the specific Zoom meeting joining page, enters a room name and enables AV, and hits the 'Join' button if it exists.
 */

import { getElement, byButtonText, bySelector } from '/util/dom.js';

function unmuteAudio() {

    const btn = getElement(byButtonText('Unmute'));
    if (btn) {
        btn.click();
    }
}

function startVideo() {
    const btn = getElement(byButtonText('Start Video'));
    if (btn) {
        btn.click();
    }
}

function enterRoomName() {
    document.addEventListener("keydown", function (ev) {
        document.getElementById("input-for-name").value = "BSY";
    }, true);

    const nameInput = getElement(bySelector('input[id=input-for-name]'));
    if (nameInput) {
        nameInput.value = 'BSY';
        // Zoom only enables the join button if an input event was detected.
        nameInput.focus();
        let keyEvent = new Event('keydown', {
            key: "b",
            code: "KeyB",
            keyCode: 74,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false
        })
        nameInput.dispatchEvent(keyEvent);
        document.activeElement.dispatchEvent(keyEvent);
        document.dispatchEvent(keyEvent);
    }
}

function joinMeeting() {
    const btn = getElement(byButtonText('Join'));
    if (btn) {
        btn.click();
    }
}

function closeCookieModal() {
    const btn = getElement(bySelector('*[aria-label=Privacy] button[aria-label=Close]'));
    if (btn) {
        btn.click();
    }
}

setInterval(() => {
    closeCookieModal();
    unmuteAudio();
    startVideo();
    enterRoomName();
    joinMeeting();
}, 1000);
