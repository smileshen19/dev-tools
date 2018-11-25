import { Injectable } from '@angular/core';
import { ElectronRendererAPI } from '../electron';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class NodeChildProcessService {

    constructor() { }

    executeCommand(command: string): Observable<string> {
        console.log('command = ', command);
        const ob = new Observable<string>((subscriber: Subscriber<string>) => {
            ElectronRendererAPI.childProcess.exec(command, function (error, stdout, stderr) {
                console.log('error = ', error);
                console.log('stdout = ', stdout);
                console.log('stderr = ', stderr);
                subscriber.next();
                subscriber.complete();
                // if (error) {
                //     console.error('err = ', error);
                //     subscriber.error(error);
                // } else {
                //     console.log('data.toString() = ', data.toString());
                //     subscriber.next(data.toString());
                //     subscriber.complete();
                // }
            });
        });
        return ob;

    }
}
