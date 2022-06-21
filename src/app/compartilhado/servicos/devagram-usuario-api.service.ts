import { DevagramApiService } from './devagram-api.service';
import { Injectable } from '@angular/core';
import { UsuarioDevagram } from '../tipos/usuario-devagram.type';

@Injectable({
  providedIn: 'root'
})
export class DevagramUsuarioApiService extends DevagramApiService {
  public buscarDadosUsuario(): Promise<UsuarioDevagram> {
    return this.get('usuario');
  }

  public pesquisarUsuarios(filtro: string): Promise<Array<UsuarioDevagram>> {
    return this.get('pesquisa?filtro=' + filtro);
  }

  public obterInformacoesDoPerfil(idUsuario: string): Promise<UsuarioDevagram> {
    return this.get('pesquisa?id=' + idUsuario);
  }
}
