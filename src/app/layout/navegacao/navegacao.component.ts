import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemMenu } from './item-menu.type';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent implements OnInit {

  private mapaDeRotas: ItemMenu = {
    home: {
      img: 'home',
      rotas: ['/']
    },
    publicacao: {
      img: 'publicacao',
      rotas: []
    },
    perfil: {
      img: 'usuario',
      rotas: []
    }
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public obterImagem(menu: string): string {
    const rotaMenu = this.mapaDeRotas[menu];
    const icone = rotaMenu.rotas.includes(this.router.url)
      ? `${rotaMenu.img}Ativo`
      : rotaMenu.img;

    return `assets/imagens/${icone}.svg`;
  }
}
