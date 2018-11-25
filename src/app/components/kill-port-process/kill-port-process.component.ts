import { Component, OnInit } from '@angular/core';
import { NodeChildProcessService } from '../../providers/node-child-process.service';

@Component({
  selector: 'app-kill-port-process',
  templateUrl: './kill-port-process.component.html',
  styleUrls: ['./kill-port-process.component.scss']
})
export class KillPortProcessComponent implements OnInit {

  port = 4200;

  constructor(
    private nodeChildProcessService: NodeChildProcessService,
  ) { }

  ngOnInit() {
  }

  delete() {
    this.nodeChildProcessService.executeCommand('netstat -ano | findstr 4200')
      .subscribe((response) => {
        console.log('response = ', response.stdout.length, response);
        if (response.stdout.length) {
          response.stdout = response.stdout.trim();
          const lastIndexOfSpace = response.stdout.lastIndexOf(' ');
          const port = response.stdout.substr(lastIndexOfSpace + 1, response.stdout.length);
          console.log('port = ', port);
          if (!isNaN(+port)) {
            this.nodeChildProcessService.executeCommand(`taskkill /PID ${+port} /F`).subscribe(() => {
              alert('刪除成功');
            });
          }
        }
        console.log();
      }, (error) => {
        alert('刪除失敗，可能已經不存在占用指定port的process');
      });
  }

}
