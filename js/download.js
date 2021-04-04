var os = null;
var info = {
    latestVersion : null,
    downloadURLs: {
        //Linux
        deb: '',
        zip_linux: '',
        appimg: '',

        // windows
        exe: '',
        msi: '',
        zip_windows: '',

        // macos
        dmg: ''
    }
}

if (navigator) {
    let userAgent = navigator.userAgent.toLocaleLowerCase();
    if(userAgent.indexOf('linux') !== -1) {
        os = 'linux'
    }
    else if(userAgent.indexOf('windows') !== -1) {
        os = 'windows'
    }
    else if(userAgent.indexOf('mac') !== -1) {
        os = 'mac'
    }
}

const xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        const releaseInfo =  {
            assets: { 
                name: string,
                browser_download_url: string 
            },
            tag_name: string
        } = JSON.parse(xmlHttp.responseText);

        // linux assets
        const debAsset = releaseInfo.assets.find((asset) => asset.name.includes('.deb'));
        const zipLinuxAsset = releaseInfo.assets.find((asset) => asset.name.includes('.zip') && asset.name.includes('linux'));
        const appimgAsset = releaseInfo.assets.find((asset) => asset.name.toLowerCase().includes('.appimage'));

        // windows assets
        const exeAsset = releaseInfo.assets.find((asset) => asset.name.includes('.exe'));
        const msiAsset = releaseInfo.assets.find((asset) => asset.name.includes('.msi'));
        const zipWindowsAsset = releaseInfo.assets.find((asset) => asset.name.includes('.zip') && asset.name.includes('win'));

        // macos assets
        const dmgAsset = releaseInfo.assets.find((asset) => asset.name.toLowerCase().includes('.dmg'));

            
        info['latestVersion'] = releaseInfo.tag_name;

        info['downloadURLs'] = {

            // linux
            deb: debAsset ? debAsset.browser_download_url : '',
            zip_linux: zipLinuxAsset ? zipLinuxAsset.browser_download_url : '',
            appimg: appimgAsset ? appimgAsset.browser_download_url : '',

            // windows
            exe: exeAsset ? exeAsset.browser_download_url : '',
            msi: msiAsset ? msiAsset.browser_download_url : '',
            zip_windows: zipWindowsAsset ? zipWindowsAsset.browser_download_url : '',

            // macos
            dmg: dmgAsset ? dmgAsset.browser_download_url : ''
        }
    }
}

// console.log(info, os)

// true for asynchronous
xmlHttp.open('GET', 'https://api.github.com/repos/HarshKhandeparkar/rainbow-board/releases/latest', true);
xmlHttp.send(null);
xmlHttp.onerror = () => {};
