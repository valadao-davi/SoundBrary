import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { catchError } from 'rxjs';
import { AvisosService } from 'src/app/services/avisos.service';
import { ErrorHandleServiceService } from 'src/app/services/error-handle-service.service';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-profile-pic-overlay',
  templateUrl: './profile-pic-overlay.component.html',
  styleUrls: ['./profile-pic-overlay.component.css']
})
export class ProfilePicOverlayComponent {

  @Input() link: string = '';
  validUrl: boolean | null = null
  @Input() acessToken!: string;
  @Input() closeOverlay!: () => void

  constructor (private http: HttpClient, private userService: ServiceUserService, private handleError: ErrorHandleServiceService, private avisosService: AvisosService) {}


  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    console.log('Texto digitado:', inputElement.value);
    if(inputElement.value){
      this.isImageValid(inputElement.value)
    }
  }

  saveImage(){
    this.userService.setImage(this.acessToken, this.link).pipe(
      catchError((code)=> {
        return this.handleError.handleErrorCode(code)
      })
    ).subscribe({
      next: () => {
        console.log('aqui')
        this.avisosService.mostrarAvisoTemporario("Imagem editada com sucesso!", "success")
        this.closeOverlay()
      }
    })
  }

  async isImageValid(url: string): Promise<void> {
    try{
      const response = await this.http.head(url, {
        headers: new HttpHeaders().set('Accept', 'image/*'),
        observe: 'response',
        responseType: 'text'
      }).toPromise();
      if(response && response.status === 200){
         this.validUrl = true
         console.log(this.validUrl)

      }else if( response && response.status === 404){
         this.validUrl = false
         console.log(this.validUrl)
      }
    }catch{
      console.log(this.validUrl)
       this.validUrl = false
    }
  }
}
