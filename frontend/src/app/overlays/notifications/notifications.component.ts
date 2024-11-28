import { Component, Input } from '@angular/core';
import { Notiffication } from 'src/app/layouts/Notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  @Input() listReceived: Notiffication[] = []
  listIdDissays!: string[]

  ngOnInit(){
    console.log(this.listReceived)
    this.listIdDissays = this.listReceived.filter(i => i.type === "Dissay").map(i => {
      return i.idObject
    })
    console.log(this.listIdDissays)
  }
}
