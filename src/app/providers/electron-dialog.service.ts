import { Injectable, EventEmitter } from '@angular/core';
import { ElectronMainProcessAPI, ElectronRendererAPI } from '../electron';
import { Observable, Subscriber, of, empty } from 'rxjs';
import { concatMap } from 'rxjs/operators';

export enum DialogCommand {
    OpenDirectory = 'openDirectory',
}

let initialListener = false;
if (!initialListener) {
    ElectronMainProcessAPI.ipcMain.on(DialogCommand.OpenDirectory, function (event: { preventDefault: Function, sender }) {
        // console.log('command:' + DialogCommand.OpenDirectory);
        // console.log('event = ', event);
        ElectronMainProcessAPI.dialog.showOpenDialog({
            properties: [DialogCommand.OpenDirectory]
        }, function (directoryPaths) {
            // console.log('showOpenDialog() directoryPaths = ', directoryPaths);
            event.sender.send(DialogCommand.OpenDirectory, directoryPaths ? directoryPaths[0] || '' : '');
        });
    });
    initialListener = true;
}

@Injectable()
export class ElectronDialogService {

    constructor() { }

    /**
     * 選擇資料夾，回傳選擇的資料夾路徑
    */
    openDirectory(): Observable<string> {
        const ob = new Observable<string>((subscriber: Subscriber<string>) => {
            const listener = (event: { sender: EventEmitter<any> }, path: string) => {
                // console.log('event = ', event);
                // console.log('directory path = ', path);
                ElectronRendererAPI.ipcRenderer.removeListener(DialogCommand.OpenDirectory, listener);
                subscriber.next(path);
                subscriber.complete();
            };
            ElectronRendererAPI.ipcRenderer.send(DialogCommand.OpenDirectory);
            ElectronRendererAPI.ipcRenderer.on(DialogCommand.OpenDirectory, listener);
        });
        return ob.pipe(concatMap(x => x ? of(x) : empty()));
    }

}
