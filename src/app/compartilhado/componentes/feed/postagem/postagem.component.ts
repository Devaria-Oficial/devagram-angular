import { FeedService } from './../feed.service';
import { UsuarioLogado } from '../../../autenticacao/usuario-logado.type';
import { Postagem } from './../postagem.type';
import { Component, Input, OnInit } from '@angular/core';

const limiteCaracteresDescricaoPadrao = 90;

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.scss']
})
export class PostagemComponent implements OnInit {

  @Input() postagem: Postagem = {} as Postagem;
  @Input() usuarioLogado: UsuarioLogado | null = null;

  public quantidadeLinhasTextarea: number = 1;
  public comentarioAtual: string = '';
  public deveExibirCaixaComentario: boolean = false;
  public limiteCaracteresDescricao: number = limiteCaracteresDescricaoPadrao;
  public estaFazendoRequisicaoParaBackend: boolean = false;

  constructor(
    private servicoFeed: FeedService
  ) { }

  ngOnInit(): void {
  }

  public exibirDescricaoCompleta() {
    this.limiteCaracteresDescricao = 99999999;
  }

  public obterImagemCurtida() {
    const iconeBase = this.postagem.estaCurtido
      ? 'descurtir'
      : 'curtir';

    return `assets/imagens/${iconeBase}.svg`;
  }

  public obterImagemComentario() {
    const iconeBase = this.deveExibirCaixaComentario
      ? 'comentarioAtivo'
      : 'comentario';

    return `assets/imagens/${iconeBase}.svg`;
  }

  public alternarExibicaoCaixaDeComentario() {
    this.deveExibirCaixaComentario = !this.deveExibirCaixaComentario;
  }

  public async fazerComentario() {
    if (!this.validarComentario()) {
      return;
    }

    this.estaFazendoRequisicaoParaBackend = true;

    try {
      await this.servicoFeed.adicionarComentario(
        this.postagem._id,
        this.comentarioAtual
      );

      this.postagem.comentarios.push({
        comentario: this.comentarioAtual,
        nome: this.usuarioLogado?.nome!
      });

      this.comentarioAtual = '';
      this.alternarExibicaoCaixaDeComentario();
    } catch (e: any) {
      alert(e.error?.erro || 'Erro ao realizar o comentario!');
    }

    this.estaFazendoRequisicaoParaBackend = false;
  }

  public verificarQuantidadeLinhas() {
    this.quantidadeLinhasTextarea = this.comentarioAtual.length > 0
      ? 2
      : 1;
  }

  public async manipularCurtida(): Promise<void> {
    try {
      await this.servicoFeed.alternarCurtida(this.postagem._id);

      if (this.postagem.estaCurtido) {
        this.postagem.quantidadeCurtidas!--;
      } else {
        this.postagem.quantidadeCurtidas!++;
      }

      this.postagem.estaCurtido = !this.postagem.estaCurtido;
    } catch (e: any) {
      alert(e.error?.erro || 'Erro ao curtir/descurtir o post!');
    }
  }

  public validarComentario(): boolean {
    return (
      !this.estaFazendoRequisicaoParaBackend
      && this.comentarioAtual.trim().length >= 3
    );
  }
}
