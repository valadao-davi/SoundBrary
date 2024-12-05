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
  musicItems!: Music[]
  dataLoad: boolean = false

  constructor(private serviceDissay: ServiceDissayService, private serviceMusic: ServiceMusicService, private router: Router){}
  ngOnInit(){
    console.log(this.listReceived)
    this.listIdDissays = this.listReceived.filter(i => i.type === "Dissay").map(i => {
      return i.idObject
    })
    if(this.listIdDissays){
      this.getIdsDissayAndMusics()
    }
  }

  getIdsDissayAndMusics(){
    if(this.listIdDissays.length > 0){
      console.log(this.listIdDissays)
      const items = this.listIdDissays.map(id =>
        this.serviceDissay.getDissayById(id)
    )
      forkJoin(items).subscribe(
        (results) => {
          console.log(results)
          this.dissaysItems = results
          if(this.dissaysItems && this.dissaysItems.length > 0){
            console.log("recebido dissay items")
            const items = this.dissaysItems.map(item =>
              this.serviceMusic.getMusicById(item.musicId)
          )
            forkJoin(items).subscribe(
              (results) => {
                this.musicItems = results
                this.dataLoad = true
              }
            )
          }
        }
      )
    }

  }
  returnIdMusic(id: string): string{
    const musicId = this.dissaysItems.find(i => i._id === id)?.musicId
    if(musicId){
      return musicId
    }else{
      return ""
    }
  }
  returnImageBaseById(id: string){
    const musicId = this.dissaysItems.find(i => i._id === id)?.musicId
    const musicImageUrl = this.musicItems.find(i => i.id === musicId)?.albumImages[2].link
    return musicImageUrl
  }
  navigateMusic(id: string) {

      this.router.navigate([`/musica/${id}`])


  }

}
