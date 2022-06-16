import { UsuarioLogado } from './../../../autenticacao/usuario-logado.type';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Postagem } from './postagem.type';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public usuarioLogado: UsuarioLogado | null;
  public postagens: Array<Postagem> = [
    {
      quantidadeCurtidas: 32,
      descricao: 'Olá mundo! Eu sou o Daniel Castello. Aqui pra vocês, Dani! A minha carreira foi sempre focada',
      comentarios: [
        {
          nome: 'Rafael Mazzucato',
          comentario: 'is weeeee'
        },
        {
          nome: 'Kaique Jesus',
          comentario: 'Salveeee'
        }
      ],
      usuario: {
        nome: 'Daniel Castello'
      },
      foto: 'https://www.petz.com.br/blog/wp-content/uploads/2020/04/diferenca-entre-aves-e-passaros.jpg'
    } as Postagem,
    {
      quantidadeCurtidas: 32,
      descricao: 'Olá mundo! Eu sou o Kaique Jesus, aqui pra vocês, Ka! Bllablalba blablabla 2 blablabla 3 blablabla 4',
      usuario: {
        nome: 'Kaique Jesus'
      },
      foto: 'https://www.petz.com.br/blog/wp-content/uploads/2020/01/passaros-domesticos.jpg'
    } as Postagem
  ];

  constructor(private servicoAutenticacao: AutenticacaoService) {
    this.usuarioLogado = this.servicoAutenticacao.obterUsuarioLogado();
  }

  ngOnInit(): void {
  }

 
}
