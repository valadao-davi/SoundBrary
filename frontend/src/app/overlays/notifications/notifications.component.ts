import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Notiffication } from 'src/app/layouts/Notification';
import { ServiceCommentService } from 'src/app/services/service-comment.service';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { ServiceNotificationService } from 'src/app/services/service-notification.service';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  @Input() accessToken!: string;
  listReceived: Notiffication[] = [];
  listNotificationDissays: Notiffication[] = [];
  listNotificationComments: Notiffication[] = [];
  linkImagesMusic: string[] = [];
  linkImagesUser: string[] = [];
  commentTextList: string[] = [];
  @Input() closeOverlay!: () => void;

  dataLoad: boolean = false;

  constructor(
    private serviceMusic: ServiceMusicService,
    private router: Router,
    private serviceComment: ServiceCommentService,
    private serviceUser: ServiceUserService,
    private serviceNotification: ServiceNotificationService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    if (this.accessToken && this.accessToken.length > 0) {
      this.serviceNotification
        .getUserNotifications(this.accessToken)
        .subscribe((list) => {
          this.listReceived = list;
          console.log(this.router.url);
          this.serviceNotification.setClientNotifications(this.listReceived);
          this.listNotificationDissays = this.listReceived.filter(
            (i) => i.type === 'Dissay'
          );
          this.listNotificationComments = this.listReceived.filter(
            (i) => i.type === 'Comment'
          );
          if (this.listNotificationDissays.length > 0) {
            this.listNotificationDissays.map((i) => {
              this.addImageToListMusic(i.idOptional);
            });
          } else {
            this.dataLoad = true;
          }
          if (this.listNotificationComments.length > 0) {
            this.listNotificationComments.map((i) => {
              this.addImageToListUser(i.idOptional);
            });
          } else {
            this.dataLoad = true;
          }
        });
    }
  }

  addImageToListMusic(id?: string) {
    if (id) {
      this.serviceMusic.getMusicById(id).subscribe((item) => {
        if (item.albumImages) {
          const musicImage = item.albumImages[2].link;
          this.linkImagesMusic.push(musicImage);
          if (
            this.linkImagesMusic.length === this.listNotificationDissays.length
          ) {
            this.dataLoad = true;
          }
        }
      });
    }
  }

  addImageToListUser(id?: string) {
    if (id) {
      this.serviceComment.getIdComment(id).subscribe((item) => {
        if (item.userName) {
          const userName = item.userName;
          const text = item.text;
          this.commentTextList.push(text);
          this.serviceUser.getUserName(userName).subscribe((i) => {
            if (i.image) {
              this.linkImagesUser.push(i.image);
              this.dataLoad = true;
            } else {
              this.linkImagesUser.push('../../../assets/icone_0.png');
              this.dataLoad = true;
            }
          });
        }
      });
    }
  }
  navigateToDissay(id: string, idNotification: string) {
    if (idNotification && this.accessToken && id) {
      this.serviceNotification
        .deleteNotification(this.accessToken, idNotification)
        .pipe(
          catchError((code) => {
            if (code.status === 400) {
              alert('Erro: ' + code.error);
            } else if (code.status === 500) {
              alert('Erro no servidor: ' + code.error);
            } else if (code.status !== 200) {
              alert(code + ' , Erro desconhecido');
            }
            return throwError(() => code);
          })
        )
        .subscribe({
          next: (response) => {
            this.listReceived = response;
            this.serviceNotification.setClientNotifications(this.listReceived);
            if (this.router.url === `/dissay/${id}`) {
              window.location.reload();
            }
            this.router.navigate([`/dissay/${id}`]);
          },
          error: (error) => {
            console.error('Erro ao deletar notificação', error);
          },
        });

      this.closeOverlay();
    }
  }
}
