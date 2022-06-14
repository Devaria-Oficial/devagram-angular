import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuarioDevagram } from 'src/app/compartilhado/tipos/usuario-devagram.type';
import { DevagramUsuarioApiService } from 'src/app/compartilhado/servicos/devagram-usuario-api.service';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {

  public termoPesquisado: string = '';
  public resultadoDaPesquisa: Array<UsuarioDevagram> =  [];
  constructor(
    private router: Router,
    private apiUsuarioDevagram: DevagramUsuarioApiService,
    private servicoAutenticacao: AutenticacaoService
  ) { }

  ngOnInit(): void {
  }

  public irParaHome() {
    this.router.navigateByUrl('/');
  }

  public async pesquisarUsuarios(): Promise<void> {
    if (this.termoPesquisado.length < 3) {
      return;
    }

    try {
      const usuariosRetornados = await this.apiUsuarioDevagram.pesquisarUsuarios(
        this.termoPesquisado
      );

      const usuarioLogado = this.servicoAutenticacao.obterUsuarioLogado();
      // this.resultadoDaPesquisa = usuariosRetornados.filter(ur => ur._id !== usuarioLogado?.id);
      this.resultadoDaPesquisa = [
        {
          _id: '93284098324',
          nome: 'Nome Fulano',
          email: 'email@email.com'
        } as UsuarioDevagram,
        {
          _id: '932840983242',
          nome: 'Nome Fulano 2',
          email: 'email@email2.com'
        } as UsuarioDevagram
      ]
      console.log(usuariosRetornados);
    } catch (e: any) {
      if (e?.status !== 400) {
        alert(e?.error.erro || 'Erro ao pesquisar usuarios!');
      }
    }
  }

  public irParaOPerfilDoUsuario(idUsuario: string): void {
    console.log({idUsuario});
  }
}
