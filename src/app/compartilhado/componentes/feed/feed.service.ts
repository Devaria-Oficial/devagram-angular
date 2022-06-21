import { Postagem } from './postagem.type';
import { DevagramApiService } from './../../servicos/devagram-api.service';
import { Injectable } from '@angular/core';
import { RespostaApiDevagram } from '../../tipos/resposta-api-devagram.type';

@Injectable({
  providedIn: 'root'
})
export class FeedService extends DevagramApiService {
  async carregarPostagens(idUsuario?: string): Promise<Array<Postagem>> {
    return this.get(
      'feed' + (idUsuario ? `?id=${idUsuario}` : '')
    );
  }

  async alternarCurtida(idPostagem: string): Promise<RespostaApiDevagram> {
    return this.put(`like?id=${idPostagem}`, {});
  }

  async adicionarComentario(idPostagem: string, comentario: string): Promise<RespostaApiDevagram> {
    return this.put(
      `comentario?id=${idPostagem}`,
      {
        comentario
      }
    );
  }
}
