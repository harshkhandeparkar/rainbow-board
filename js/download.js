let os = null;
const info = {
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

const linuxElement = document.querySelector('#download #lin-dwl');
const windowsElement = document.querySelector('#download #win-dwl');
const macElement = document.querySelector('#download #mac-dwl');
const noDownloadElement = document.querySelector('#download #no-dwl');

if (navigator) {
  let userAgent = navigator.userAgent.toLowerCase();

  if(userAgent.includes('linux')) os = 'linux';
  else if(userAgent.includes('windows')) os = 'windows';
  else if(userAgent.includes('mac')) os = 'mac';
  else os = 'other';
}

const showDownloadPage = () => {
  switch(os) {
    case 'linux':
      linuxElement.style.display = 'block';
      windowsElement.style.display = 'none';
      macElement.style.display = 'none';
      noDownloadElement.style.display = 'none';

      linuxElement.querySelector('#appimg-link').setAttribute('href', info.downloadURLs.appimg);
      linuxElement.querySelector('#deb-link').setAttribute('href', info.downloadURLs.deb);
      linuxElement.querySelector('#zip-lin-link').setAttribute('href', info.downloadURLs.zip_linux);
      break;
    case 'windows':
      linuxElement.style.display = 'none';
      windowsElement.style.display = 'block';
      macElement.style.display = 'none';
      noDownloadElement.style.display = 'none';
      break;
    case 'mac':
      linuxElement.style.display = 'none';
      windowsElement.style.display = 'none';
      macElement.style.display = 'block';
      noDownloadElement.style.display = 'none';
      break;
    default:
      linuxElement.style.display = 'none';
      windowsElement.style.display = 'none';
      macElement.style.display = 'none';
      noDownloadElement.style.display = 'block';
      break;
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
    const zipLinuxAsset = releaseInfo.assets.find((asset) => asset.name.includes('.zip') && !asset.name.includes('win'));
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

    showDownloadPage();
  }
}

// true for asynchronous
xmlHttp.open('GET', 'https://api.github.com/repos/HarshKhandeparkar/rainbow-board/releases/latest', true);
xmlHttp.send(null);
xmlHttp.onerror = () => {};
