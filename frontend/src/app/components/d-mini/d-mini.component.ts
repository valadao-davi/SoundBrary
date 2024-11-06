import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Instrument } from 'src/app/layouts/Instrument';
import { Music } from 'src/app/layouts/Music';
import { User } from 'src/app/layouts/User';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-d-mini',
  templateUrl: './d-mini.component.html',
  styleUrls: ['./d-mini.component.css']
})
export class DMiniComponent {

  @Input() name!: string;
  @Input() listInstruments!: Instrument[];
  @Input() musicId!: string;
  @Input() userName!: string
  @Input() idDissay!: string;
  @Input() rateNumber: number = 0.0


  namePerson!: string

  musicDissay!: Music;

  constructor(private router: Router,private serviceSpotify: ServiceMusicService, private serviceUser: ServiceUserService){}

  navigateDissay(id: string) {
    this.router.navigate([`/dissay/${id}`]);
  }

  ngOnInit(){
    console.log("musicId: ", this.musicId, " userName: ", this.userName)
    if(this.musicId && this.userName){
      console.log("teste")
      this.serviceSpotify.getMusicById(this.musicId).subscribe(music => {
        this.musicDissay = music
        console.log(this.musicDissay)
      })
      this.serviceUser.getUserName(this.userName).subscribe(user => {
        this.namePerson = user.name
        console.log(user.name)
      })
    }
  }

  }


