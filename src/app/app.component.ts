import { Component, HostListener } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { ElectronDialogService } from './providers/electron-dialog.service';
import { NodeFsService } from './providers/node-fs.service';
import { NodeChildProcessService } from './providers/node-child-process.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  projectUrl = 'http://localhost:4200/';

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
      console.log('window = ', window);

    } else {
      console.log('Mode web');
    }
  }

}
