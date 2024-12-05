import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Dissay } from 'src/app/layouts/Dissay';
import { Music } from 'src/app/layouts/Music';
import { Notiffication } from 'src/app/layouts/Notification';
import { ServiceDissayService } from 'src/app/services/service-dissay.service';
import { ServiceMusicService } from 'src/app/services/service-music.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  @Input() listReceived: Notiffication[] = []
  listNotificationDissays: Notiffication[] = []
  listNotificationComments: Notiffication[] = []
  linkImagesMusic!: string[]
  dataLoad: boolean = false

  constructor(private serviceMusic: ServiceMusicService, private router: Router){}
  ngOnInit(){
 
    this.listNotificationDissays = this.listReceived.filter(i => i.type === 'Dissay')
    this.listNotificationComments = this.listReceived.filter(i => i.type === 'Comment')
    if(this.listNotificationDissays.length > 0){
      this.listNotificationDissays.map(i => {
        this.addImageToList(i.idOptional)
      })
    }
  }



  addImageToList(id: string) {

    if(id){
      this.serviceMusic.getMusicById(id).subscribe(item => {
        if(item.albumImages){
          const musicImage = item.albumImages[2].link
          this.linkImagesMusic.push(musicImage)
        }
      })
    }
    
  }
  navigateToDissay(id: string) {

      this.router.navigate([`/dissay/${id}`])


  }

}
