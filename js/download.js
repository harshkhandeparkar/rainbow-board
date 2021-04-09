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

  if (!userAgent.includes('mobile')) {
    if(userAgent.includes('linux')) os = 'linux';
    else if(userAgent.includes('windows')) os = 'windows';
    else if(userAgent.includes('mac')) os = 'mac';
    else os = 'other';
  }
  else os = 'other';
}

const showDownloadPage = () => {

  // Set display to none for all platforms.
  linuxElement.style.display = 'none';
  windowsElement.style.display = 'none';
  macElement.style.display = 'none';
  noDownloadElement.style.display = 'none';

  switch(os) {
    case 'linux':
      linuxElement.style.display = 'block';
      break;
    case 'windows':
      windowsElement.style.display = 'block';
      break;
    case 'mac':
      macElement.style.display = 'block'
      break;
    default:
      noDownloadElement.style.display = 'block';
      break;
  }

  // linux links
  document.querySelectorAll('.appimg-link').forEach((ele) => ele.setAttribute('href', info.downloadURLs.appimg));
  document.querySelectorAll('.deb-link').forEach((ele) => ele.setAttribute('href', info.downloadURLs.deb));
  document.querySelectorAll('.zip-lin-link').forEach((ele) => ele.setAttribute('href', info.downloadURLs.zip_linux));

  // windows links
  document.querySelectorAll('.exe-link').forEach((ele) => ele.setAttribute('href', info.downloadURLs.exe));
  document.querySelectorAll('.msi-link').forEach((ele) => ele.setAttribute('href', info.downloadURLs.msi));
  document.querySelectorAll('.zip-win-link').forEach((ele) => ele.setAttribute('href', info.downloadURLs.zip_windows));

  // mac links
  document.querySelectorAll('.dmg-link').forEach((ele) => ele.setAttribute('href', info.downloadURLs.dmg));
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
