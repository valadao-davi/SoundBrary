import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Coment } from 'src/app/layouts/Comment';
import { Dissay } from 'src/app/layouts/Dissay';
import { Music } from 'src/app/layouts/Music';
import { User } from 'src/app/layouts/User';
import { AvisosService } from 'src/app/services/avisos.service';
import { ServiceAvaliateService } from 'src/app/services/service-avaliate.service';
import { ServiceCommentService } from 'src/app/services/service-comment.service';
import { ServiceDissayService } from 'src/app/services/service-dissay.service';
import { ServiceMusicService } from 'src/app/services/service-music.service';
import { ServiceUserService } from 'src/app/services/service-user.service';

@Component({
  selector: 'app-dissay',
  templateUrl: './dissay.component.html',
  styleUrls: ['./dissay.component.css']
})
export class DissayComponent {

  respostas = [
    { nome: 'Mariana R.', data: '27/08/2024 11:05pm', texto: 'Acho que os efeitos da guitarra estão na ordem errada.', para: 'Teste', showInput: false },
    { nome: 'Carlos A.', data: '27/08/2024 11:10pm', texto: 'Concordo com a Mariana!', para: 'aaa', showInput: false }
    // Adicione mais respostas conforme necessário
  ];
  dataLoaded!: boolean;
  dissayData!: Dissay;
  musicData!: Music;
  accessToken!: string
  comments!:Coment[]
  totalRateUser!: number;
  totalRate!: number | null;

  id!: string | null;
  userData!: User
  userDissayData!: User

  respostaAbertaIndex: number | null = null;
  mostrarAviso = false;
  sumirAviso = true;
  mensagemAviso = '';
  tipoAviso = '';
  timeoutAviso: any;
  ownerDissay: boolean = false;
  userImage!: string;

  constructor(private router: Router,private route: ActivatedRoute, private serviceDissay: ServiceDissayService, private serviceSpotify: ServiceMusicService, private serviceUser: ServiceUserService, private serviceComment: ServiceCommentService, private serviceAvaliate: ServiceAvaliateService, private avisosService: AvisosService){}

  ngOnInit(){
    this.accessToken = localStorage.getItem('token') ?? ""

    this.route.paramMap.subscribe((params)=> {
      this.id = params.get('id')
      if(this.id){
          this.loadDissay(this.id)
      }
    })

    if(this.accessToken){
      this.loadAuthUser(this.accessToken)
    }


  }

  loadDissay(id: string) {
    this.serviceDissay.getDissayById(id).subscribe(dissay => {
      this.dissayData = dissay;
      this.comments = dissay.comments ?? [];

      if (this.totalRateUser === null) {
        this.totalRate = dissay.totalRate ?? 0.0;
      }

      this.comments = this.comments.map(comment => ({
        _id: comment._id,
        userName: comment.userName,
        idParent: comment.idParent ?? "",
        idParentAwnser: comment.idParentAwnser ?? "",
        text: comment.text,
        date: new Date(comment.date).toLocaleDateString()
      }));

      this.loadMusic(this.dissayData.musicId);

      this.serviceUser.getUserName(this.dissayData.userName).subscribe(user => {
        this.userDissayData = user;
        if(this.userData && this.userDissayData){
          this.verifyDissayCreatedByUser(this.userData, this.userDissayData); // Verifica o ownership aqui mesmo

        }
      });
    });
  }

  //Usuario que esta visualizando o dissay
  loadAuthUser(user: string){
    this.serviceUser.getUser(user).subscribe(user=> {
      this.userData = user

      this.getAvaliationUser(this.dissayData._id!)
    })
  }


  //Verifica se sao os mesmos usuarios
  verifyDissayCreatedByUser(userData: User, userOwner: User){


    if((userData && userOwner) && userData.userName === userOwner.userName){
      console.log('Id do usuário visualizando: ', userData._id)
      console.log('Id do usuário criador: ', userOwner._id)
      this.ownerDissay = true
    }else{
      this.ownerDissay = false
    }
  }

  loadMusic(id: string){
    this.serviceSpotify.getMusicById(id).subscribe(music => {
      this.musicData = music
      console.log(this.musicData)
      this.dataLoaded = true
    })
  }

  avaliateDissay(rate: number){
    console.log(rate)
    if(this.accessToken === ""){
      this.router.navigate(["/login"])
      return;
    }else{
      this.serviceAvaliate.avaliateDissay(this.accessToken, this.dissayData._id!, rate).subscribe(params => {
        this.loadDissay(this.id!)
        this.totalRateUser = rate
        this.totalRate = null
      })
    }
  }
  editAvaliation(rate: number){
    this.serviceAvaliate.editAvaliationUser(this.accessToken, this.dissayData._id!, rate).pipe(
      catchError((code)=> {
        if(code.status === 400){
           alert("Erro: " + code.error)
        }else if(code.status === 500){
          alert("Erro no servidor: " + code.error)
        }else if(code.status !== 200){
          alert("Erro desconhecido")
          console.log(code.error)
        }
        return throwError(() => code)
      })
    ).subscribe(params => {
        this.totalRateUser = rate
        console.log(this.totalRateUser)
        this.loadDissay(this.id!)
        this.totalRate = null
    })
  }

  getAvaliationUser(dissayId: string){
    this.serviceAvaliate.getAvaliationUser(this.accessToken, dissayId).subscribe(number => {
      this.totalRateUser = number
      this.totalRate = null
    })
  }

  deleteDissay(dissayId: string){
    this.serviceDissay.deleteDissay(this.accessToken, dissayId).subscribe({
      next: (response) => {
        this.router.navigate(['/home'])
        this.avisosService.mostrarAvisoTemporario('O Dissay foi apagado com sucesso!', 'success')
      },
      error: (err) => {
        this.avisosService.mostrarAvisoTemporario('Erro ao deletar Dissay', 'error')
        console.error('Erro ao deletar dissay')
      }
    })
  }

  getImageUsername(username: string): string {
    this.serviceUser.getUserName(username).subscribe(user => {
      this.userImage = user.image ?? ""
    })
    return this.userImage
  }

  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // Reseta a altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Define a nova altura

  }

  editDissay(){
    this.router.navigate(['/criar-dissay'], { queryParams: { id: this.dissayData._id } })
  }

  toggleResposta(index: number) {
    if (this.respostaAbertaIndex === index) {
      // Se a resposta já está aberta, fechá-la
      this.respostaAbertaIndex = null;
    } else {
      // Fechar a resposta anterior, se houver
      this.respostaAbertaIndex = index;
    }
  }

  isRespostaOpen(index: number): boolean {
    return this.respostaAbertaIndex === index;
  }

  excluirComentario(idComment: string){
    console.log(idComment)
    this.serviceComment.deleteComment(this.accessToken, idComment).pipe(
      catchError((code)=> {
        if(code.status === 400){
           alert("Erro: " + code.error)
        }else if(code.status === 500){
          alert("Erro no servidor: " + code.error)
        }else if(code.status !== 200){
          alert("Erro desconhecido")
        }
        return throwError(() => code)
      })
    ).subscribe(comment => {
      this.loadDissay(this.id!)
      this.avisosService.mostrarAvisoTemporario('Comentário deletado com sucesso!', 'success');
    })
  }

  publicarComentario(texto: string) {
    if(texto) {
      if(this.accessToken === ""){
         this.router.navigate(["/login"])
         return;
      }else {
        this.serviceComment.postComment(this.accessToken, this.dissayData._id!, texto).pipe(
          catchError((code)=> {
            if(code.status === 400){
               alert("Erro: " + code.error)
            }else if(code.status === 500){
              alert("Erro no servidor: " + code.error)
            }else if(code.status !== 200){
              alert("Erro desconhecido")
            }
            return throwError(() => code)
          })
        ).subscribe(comment => {
          this.comments.push(comment)
          this.loadDissay(this.id!)
          this.avisosService.mostrarAvisoTemporario('Comentário publicado com sucesso!', 'success');
        })
      }

    }
  }
  getUserNameByIdParent(id: string): string | undefined {
    const comment = this.comments.find(c => c._id === id);
    return comment ? comment.userName : undefined;
  }

  publicarResposta(index: number,idPai: string, texto: string, idResposta?:string) {
    if(texto) {
      if(this.accessToken === ""){
         this.router.navigate(["/login"])
         return;
      }else{
        this.serviceComment.awnserComment(this.accessToken, idPai, texto, idResposta).pipe(
          catchError((code)=> {
            if(code.status === 400){
               alert("Erro: " + code.error)
            }else if(code.status === 500){
              alert("Erro no servidor: " + code.error)
            }else if(code.status !== 200){
              alert("Erro desconhecido")
            }
            return throwError(() => code)
          })
        ).subscribe(comment => {
          this.comments.push(comment)
          this.loadDissay(this.id!)
          this.avisosService.mostrarAvisoTemporario('Comentário publicado com sucesso!', 'success');
        })
        console.log(`Publicar resposta para a resposta ${index}: ${texto}`);
        this.avisosService.mostrarAvisoTemporario('Resposta publicada com sucesso!', 'success');
        this.respostaAbertaIndex = null;
        this.respostas[index].showInput = false; // Fechar o campo de resposta
      }

    }
  }

  cancelarResposta(index: number, texto: string) {
    this.respostaAbertaIndex = null;
    this.respostas[index].showInput = false; // Fechar o campo de resposta
    if (texto) {
      if (this.mostrarAviso) {
        clearTimeout(this.timeoutAviso);
      }
      this.avisosService.mostrarAvisoTemporario('Resposta cancelada.', 'error');
    }
    }


}
