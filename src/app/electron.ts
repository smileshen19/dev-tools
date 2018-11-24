import { Remote, RendererInterface } from 'electron';

interface IElectronRendererAPI extends RendererInterface {
    childProcess: any;
    fs: any;
}

export const ElectronRendererAPI: IElectronRendererAPI = {
    // RendererInterface
    clipboard: window.require('electron').clipboard,
    crashReporter: window.require('electron').crashReporter,
    nativeImage: window.require('electron').nativeImage,
    screen: window.require('electron').screen,
    shell: window.require('electron').shell,
    BrowserWindowProxy: window.require('electron').BrowserWindowProxy,
    desktopCapturer: window.require('electron').desktopCapturer,
    ipcRenderer: window.require('electron').ipcRenderer,
    remote: window.require('electron').remote,
    webFrame: window.require('electron').webFrame,
    webviewTag: window.require('electron').webviewTag,
    // others
    childProcess: window.require('child_process'),
    fs: window.require('fs'),
};

console.log('ElectronRendererAPI = ', ElectronRendererAPI);

export const ElectronMainProcessAPI: Electron.MainInterface = ElectronRendererAPI.remote.getGlobal('electron');

console.log('ElectronMainProcessAPI = ', ElectronMainProcessAPI);
