import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ItemMenu } from './item-menu.type';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent implements OnInit {

  private rotaAtiva: string = 'home';
  private mapaDeRotas: ItemMenu = {
    home: {
      img: 'home',
      rotas: ['/']
    },
    publicacao: {
      img: 'publicacao',
      rotas: ['/publicacao']
    },
    perfil: {
      img: 'usuario',
      rotas: ['/perfil/pessoal']
    }
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public redirecionarPara(menu: string): void {
    const rotaMenu = this.mapaDeRotas[menu];
    this.router.navigateByUrl(rotaMenu.rotas[0]);
  }

  public obterImagem(menu: string): string {
    const rotaMenu = this.mapaDeRotas[menu];

    let icone = rotaMenu.img;
    if (rotaMenu.rotas.includes(this.router.url)
      || this.rotaAtiva === menu) {
      icone = `${rotaMenu.img}Ativo`;
      this.rotaAtiva = menu;
    }

    return `assets/imagens/${icone}.svg`;
  }
}
