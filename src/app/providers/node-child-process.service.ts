import { Injectable } from '@angular/core';
import { ElectronRendererAPI } from '../electron';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class NodeChildProcessService {

    constructor() { }

    executeCommand(command: string): Observable<{ stdout: string, stderr: string }> {
        console.log('command = ', command);
        const ob = new Observable<{ stdout: string, stderr: string }>((subscriber: Subscriber<{ stdout: string, stderr: string }>) => {
            ElectronRendererAPI.childProcess.exec(command, function (error: string, stdout: string, stderr: string) {
                console.log('error = ', error);
                console.log('stdout = ', stdout);
                console.log('stderr = ', stderr);
                if (!error) {
                    subscriber.next({ stdout: stdout, stderr: stderr });
                    subscriber.complete();
                } else {
                    console.error('NodeChildProcessService executeCommand() error = ', error);
                    subscriber.error(error);
                }
            });
        });
        return ob;

    }
}
