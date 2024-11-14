import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Coment } from 'src/app/layouts/Comment';
import { Dissay } from 'src/app/layouts/Dissay';
import { Music } from 'src/app/layouts/Music';
import { User } from 'src/app/layouts/User';
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

  constructor(private router: Router,private route: ActivatedRoute, private serviceDissay: ServiceDissayService, private serviceSpotify: ServiceMusicService, private serviceUser: ServiceUserService, private serviceComment: ServiceCommentService, private serviceAvaliate: ServiceAvaliateService){}

  ngOnInit(){
    this.accessToken = localStorage.getItem('token') ?? ""
    if(this.accessToken !== ""){
      console.log("contem acesso token")
      this.loadAuthUser(this.accessToken)
    }
    this.route.paramMap.subscribe((params)=> {
      this.id = params.get('id')
      if(this.id){
        this.loadDissay(this.id)
      }
    })
  }

  loadDissay(id: string){
    this.serviceDissay.getDissayById(id).subscribe(dissay => {
      this.dissayData = dissay
      this.comments = dissay.comments ?? []

      if(this.totalRateUser === null){
        this.totalRate = dissay.totalRate ?? 0.0
      }
      this.comments = this.comments.map(comment => ({
        _id: comment._id,
        userName: comment.userName,
        idParent: comment.idParent ?? "",
        idParentAwnser: comment.idParentAwnser ?? "",
        text: comment.text,
        date: new Date(comment.date).toLocaleDateString()
      }))
      this.loadMusic(this.dissayData.musicId)
      this.loadDissayUser(this.dissayData.userName)
    })
  }

  loadAuthUser(user: string){
    this.serviceUser.getUser(user).subscribe(user=> {
      this.userData = user
      this.getAvaliationUser(this.dissayData._id!)
      console.log("funcao sendo chamada")
    })
  }

  loadDissayUser(user: string){
    this.serviceUser.getUserName(user).subscribe(user=> {
      this.userDissayData = user

    })
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


  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto'; // Reseta a altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Define a nova altura

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
      this.mostrarAvisoTemporario('Comentário deletado com sucesso!', 'success');
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
          this.mostrarAvisoTemporario('Comentário publicado com sucesso!', 'success');
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
          this.mostrarAvisoTemporario('Comentário publicado com sucesso!', 'success');
        })
        console.log(`Publicar resposta para a resposta ${index}: ${texto}`);
        this.mostrarAvisoTemporario('Resposta publicada com sucesso!', 'success');
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
      this.mostrarAvisoTemporario('Resposta cancelada.', 'error');
    }
    }

    mostrarAvisoTemporario(mensagem: string, tipo: string) {
      if (this.mostrarAviso) {
        clearTimeout(this.timeoutAviso);
      }
      this.mensagemAviso = mensagem;
      this.tipoAviso = tipo;
      this.mostrarAviso = true;
      this.sumirAviso = false;
      console.log("chegou")
      this.timeoutAviso = setTimeout(() => {
        this.sumirAviso = true;
        setTimeout(() => {
          this.mostrarAviso = false;
          console.log("foi")
        }, 500)
      }, 3000); // Oculta o aviso após 3 segundos

    }
}
