import { AutenticacaoService } from 'src/app/compartilhado/autenticacao/autenticacao.service';
import { Router } from '@angular/router';
import { UsuarioDevagram } from './../../compartilhado/tipos/usuario-devagram.type';
import { Component, Input, OnInit } from '@angular/core';
import { DevagramUsuarioApiService } from 'src/app/compartilhado/servicos/devagram-usuario-api.service';

@Component({
  selector: 'app-cabecalho-perfil',
  templateUrl: './cabecalho-perfil.component.html',
  styleUrls: ['./cabecalho-perfil.component.scss']
})
export class CabecalhoPerfilComponent implements OnInit {

  @Input() usuario: UsuarioDevagram | null = null;
  public estaPerfilPessoal: boolean = false;

  constructor(
    private router: Router,
    private servicoUsuario: DevagramUsuarioApiService,
    private servicoAutenticacao: AutenticacaoService
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/perfil/pessoal') {
      this.estaPerfilPessoal = true;
    }
  }

  public async manipularCliqueBotaoPrincipal(): Promise<void> {
    if (this.estaPerfilPessoal) {
      this.redirecionarParaTelaDeEdicaoDePerfil();
      return;
    }

    await this.alternarSeguir();
  }

  public redirecionarParaTelaDeEdicaoDePerfil(): void {
    this.router.navigateByUrl('/perfil/pessoal/editar');
  }

  private async alternarSeguir() {
    // TODO: atualizar a quantidade de seguidores
    
    if (!this.usuario) {
      return;
    }

    try {
      await this.servicoUsuario.alternarSeguir(this.usuario._id);
      this.usuario.segueEsseUsuario = !this.usuario.segueEsseUsuario;
    } catch (e: any) {
      alert(e.error?.erro || 'Erro ao seguir/deixar de seguir o usuário!');
    }
  }

  public voltarParaHome() {
    this.router.navigateByUrl('/');
  }

  public obterCorBotaoPrincipal(): string {
    if (this.usuario?.segueEsseUsuario || this.estaPerfilPessoal) {
      return 'outline';
    }

    return 'primaria';
  }

  public obterTextoBotaoPrincipal(): string {
    // TODO: corrigir bug da exibição do texto errado do botão
    if (this.estaPerfilPessoal) {
      return 'Editar perfil';
    }

    if (this.usuario?.segueEsseUsuario) {
      return 'Deixar de seguir';
    }

    return 'Seguir';
  }

  public logout(): void {
    this.servicoAutenticacao.logout();
  }
}
