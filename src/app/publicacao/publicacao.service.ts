import { RespostaApiDevagram } from './../compartilhado/tipos/resposta-api-devagram.type';
import { DevagramApiService } from './../compartilhado/servicos/devagram-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService extends DevagramApiService {

  public publicar(dadosPublicacao: FormData): Promise<RespostaApiDevagram> {
    return this.post('publicacao', dadosPublicacao);
  }
}
