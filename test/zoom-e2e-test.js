const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { timeout } = require('puppeteer');

function getZoomConfig() {
    const zoomConfigFilePath = path.join(__dirname, 'zoom-config.json');;
    return JSON.parse(fs.readFileSync(zoomConfigFilePath));
}

function delay(timeoutMs) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeoutMs);
    });
}

describe('minimeet extension', function () {
    const extensionPath = path.join(__dirname, '../mv3');
    console.log(extensionPath)
    before('load zoom config', function () {
        this.zoomConfig = getZoomConfig();
    });

    before('start browser', async function () {
        this.browser = await puppeteer.launch({
            overridePermissions: true,
            defaultViewport: null,
            executablePath: '/usr/bin/chromium',
            userDataDir: "/home/pi/.config/chromium/Default/Preferences",
            headless: false,
            use: {
                permissions: ["microphone", "camera"]
            },
            ignoreDefaultArgs: ['--disable-extensions'],
            args: [
                `--disable-notifications`,
                `--disable-extensions-except=${extensionPath}`,
                `--load-extension=${extensionPath}`,
                `--window-size=1920,1080`,
                `--window-position=0,0`,
                `--kiosk`,
                `--no-sandbox`,
                `--disable-setuid-sandbox`,
                `--noerrdialogs`,
                `--disable-infobars`,
                `--no-first-run`,
            ]
        });
    });

    before('start page', async function () {
        this.pages = await this.browser.pages();
        this.page = this.pages[0];

        await this.page.goto(this.zoomConfig.testMeetingUrl);
        this.page.on('dialog', async dialog => {
            console.log('here');
            await dialog.cancel();
        });
        var joined = false
        while (!joined) {
            var selector = await this.page.waitForSelector('input[id=input-for-name]', (selector) => selector).catch(() => false)
            if (!selector) {
                console.log("not found" + selector);
                continue;
            }
            const zoomConfig = this.zoomConfig;
            await this.page.$eval('input[id=input-for-name]', (el, zoomConfig) => el.value = zoomConfig.testMeetingTitle, zoomConfig);
            selector.value = this.zoomConfig.testMeetingTitle;
            await this.page.keyboard.press('Space');
            await delay(2000)
            const exists = await this.page.$eval("input[id=input-for-name]", () => true).catch(() => false)
            if (!exists) {
                joined = true
            }
        }
    });

    it('joins the meeting', async function () {
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.press('Space');
    });
});
