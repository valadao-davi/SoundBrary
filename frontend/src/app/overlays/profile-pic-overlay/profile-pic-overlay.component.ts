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
  @Input() typeCard!:string;
  nameUser: string = '';
  validName: boolean | null = null

  constructor (private http: HttpClient, private userService: ServiceUserService, private handleError: ErrorHandleServiceService, private avisosService: AvisosService) {}


  onInputChangeImage(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    
    if(inputElement.value){
      this.isImageValid(inputElement.value)
    }
  }

  onInputChangeName(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    
    if(inputElement.value){
      this.isNameValid(inputElement.value)
    }
  }

  saveImage(){
    this.userService.setImage(this.acessToken, this.link).pipe(
      catchError((code)=> {
        return this.handleError.handleErrorCode(code)
      })
    ).subscribe({
      next: () => {
        this.avisosService.mostrarAvisoTemporario("Imagem editada com sucesso!", "success")
        this.closeOverlay()
        window.location.reload();
      }
    })
  }

  editName(){
    this.userService.setNewName(this.acessToken, this.nameUser).pipe(
      catchError((code)=> {
        return this.handleError.handleErrorCode(code)
      })
    ).subscribe({
      next: () => {
        this.avisosService.mostrarAvisoTemporario("Nome editado com sucesso!", "success")
        this.closeOverlay()
      }
    })
  }

  isNameValid(name: string){
    if(name.length === 0 || name.length > 25){
      this.validName = false
    }else{
      this.validName = true
    }    
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
         }else if( response && response.status === 404){
         this.validUrl = false
         }
    }catch{
      this.validUrl = false
    }
  }
}
