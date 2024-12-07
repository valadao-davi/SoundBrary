import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Notiffication } from 'src/app/layouts/Notification';
import { ServiceCommentService } from 'src/app/services/service-comment.service';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  @Input() accessToken!: string;
  listReceived: Notiffication[] = []
  listNotificationDissays: Notiffication[] = []
  listNotificationComments: Notiffication[] = []
  linkImagesMusic: string[] = []
  linkImagesUser: string[] = []
  commentTextList: string[] = []
  @Input() closeOverlay!: () => void

  dataLoad: boolean = false

  constructor(private serviceMusic: ServiceMusicService, private router: Router, private serviceComment: ServiceCommentService, private serviceUser: ServiceUserService){}
  ngOnInit(){
    console.log(this.accessToken)
    if(this.accessToken && this.accessToken.length > 0){
      this.serviceUser.getUserNotifications(this.accessToken).subscribe(list => {
        console.log(list)
        this.listReceived = list
        console.log(this.listReceived)
        this.listNotificationDissays = this.listReceived.filter(i => i.type === 'Dissay')
        this.listNotificationComments = this.listReceived.filter(i => i.type === 'Comment')
        if(this.listNotificationDissays.length > 0){
          this.listNotificationDissays.map(i => {
            this.addImageToListMusic(i.idOptional)
          })
        }else{
          this.dataLoad = true
        }
        if(this.listNotificationComments.length > 0){
          this.listNotificationComments.map(i => {
            this.addImageToListUser(i.idOptional)
          })
        }else{
          this.dataLoad = true
        }
      })
    }else{
      console.log(this.accessToken)
    }

  }



  addImageToListMusic(id?: string) {

    if(id){
      this.serviceMusic.getMusicById(id).subscribe(item => {
        if(item.albumImages){
          const musicImage = item.albumImages[2].link
          this.linkImagesMusic.push(musicImage)
          if (this.linkImagesMusic.length === this.listNotificationDissays.length) {
            this.dataLoad = true;
          }
        }
      })

    }

  }

  addImageToListUser(id?: string) {

    if(id){
      this.serviceComment.getIdComment(id).subscribe(item => {
        if(item.userName){
          const userName = item.userName
          const text = item.text
          this.commentTextList.push(text)
          console.log(userName, text)
          this.serviceUser.getUserName(userName).subscribe( i => {
            if(i.image){
              this.linkImagesUser.push(i.image)
              this.dataLoad = true
              console.log(this.linkImagesUser)
            }else{
              this.linkImagesUser.push('../../../assets/icone_0.png')
              this.dataLoad = true
            }
          })
        }
      })

    }

  }
  navigateToDissay(id: string, idNotification: string) {
    console.log(idNotification)
      this.serviceUser.deleteNotification(this.accessToken, idNotification).subscribe(i => {
        this.router.navigate([`/dissay/${id}`])
        this.closeOverlay()
      })


  }

}
