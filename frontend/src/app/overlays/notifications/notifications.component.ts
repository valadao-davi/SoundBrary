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
  listIdDissays!: string[]
  dissaysItems: Dissay[] = []
  dataLoad: boolean = false
  imageCache: { [key: string]: string} = {}

  constructor(private serviceDissay: ServiceDissayService, private serviceMusic: ServiceMusicService, private router: Router){}
  ngOnInit(){
 

  }



  returnImageBaseById(id: string): string{
    if(id && this.imageCache[id]){
      return this.imageCache[id]
    }

    if(id){
      this.serviceMusic.getMusicById(id).subscribe(item => {
        if(item.albumImages){
          const musicImage = item.albumImages[2].link
          this.imageCache[id] = musicImage
        }else{
          this.imageCache[id] = ''
        }
      })
    }

    return this.imageCache[id] || ''
    
  }
  navigateToDissay(id: string) {

      this.router.navigate([`/dissay/${id}`])


  }

}
