import { Injectable } from '@angular/core';
import { ElectronRendererAPI } from '../electron';
import { Observable, Subscriber, throwError } from 'rxjs';

@Injectable()
export class NodeFsService {

    constructor() { }

    readFileByPath(filePath: string): Observable<string> {
        console.log('filePath = ', filePath);
        const ob = new Observable<string>((subscriber: Subscriber<string>) => {
            ElectronRendererAPI.fs.readFile(filePath, function (error, data) {
                if (error) {
                    // console.error('error = ', error);
                    subscriber.error(error);
                } else {
                    // console.log('data.toString() = ', data.toString());
                    subscriber.next(data.toString());
                    subscriber.complete();
                }
            });
        });
        return ob;

    }
}
