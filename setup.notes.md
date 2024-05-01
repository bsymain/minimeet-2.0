Startup

sudo apt update
sudo apt install vsftpd

Install actlab .deb package
sudo apt install ./actlab.deb


startx
Actlab
cd bsy-transcribe
export GOOGLE_APPLICATION_CREDENTIALS=./serviceaccount.json && npm run start

Autostart x
sudo apt-get -y install xinit
/etc/rc.local
startx

Autostart actlab gui:
sudo nano /etc/X11/xinit/xinitrc
alias xdg-open https://us06web.zoom.us >/dev/null
actlab --no-sandbox


pm2 start index.js



npx electron-forge make --platform="linux"

Aria label “stop sending my video”


* Need to make platform backend multi-user
* Refactor env variables to be configurable
* Save wifi password after reboot!!!


Wifi
Change to local folder
Install iptables
Run setup.sh
sudo usermod -G netdev -a yourusername
pm2 start wifilib.js


cd /home/pi/minimeet && startx ./start.sh 

Manually load chrome extension

Sudo nano /etc/X11/Xwrapper.config
Allowed users = Anybody

xdg-mime query default x-scheme-handler/zoommtg
/usr/share/applications/zoom.desktop

sudo mkdir -p /etc/opt/chromium/policies/managed/ && echo '{ "URLAllowlist": [“*”.zoom.us] }' |sudo tee /etc/opt/chromium/policies/managed/allowlist.json

https://www.baeldung.com/linux/strip-executableshttps://www.baeldung.com/linux/strip-executables

find -O3 -L /usr/bin/ -name "*xdg*"
rm -r 
/home/pi/.config/chromium/Default/Preferences
/home/pi/.config/chromium/BrowserMetrics/BrowserMetrics-66309AB9-11C8.pma

Copy the whole “Default” prefs folder to that location

Fullscreen
https://stackoverflow.com/questions/42503701/chromium-kiosk-mode-fullscreen-and-remove-address-bar

xdotool key F11
