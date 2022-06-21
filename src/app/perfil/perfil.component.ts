import { UsuarioDevagram } from './../compartilhado/tipos/usuario-devagram.type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevagramUsuarioApiService } from '../compartilhado/servicos/devagram-usuario-api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public usuario: UsuarioDevagram | null = null;

  constructor(
    private servicoRotaAtual: ActivatedRoute,
    private servicoUsuario: DevagramUsuarioApiService
  ) { }

  ngOnInit(): void {
    this.servicoRotaAtual.params.subscribe(params => {
      this.carregarPerfilDoUsuario(params['idUsuario']);
    });
  }

  async carregarPerfilDoUsuario(idUsuario?: string) {
    try {
      if (!idUsuario) {
        return;
      }

      this.usuario = await this.servicoUsuario.obterInformacoesDoPerfil(idUsuario);
    } catch (e: any) {
      alert(e.error?.erro || 'Erro ao carrear o perfil!');
    }
  }
}
