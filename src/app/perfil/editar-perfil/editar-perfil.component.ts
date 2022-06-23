import { UsuarioLogado } from './../../compartilhado/autenticacao/usuario-logado.type';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/compartilhado/autenticacao/autenticacao.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  public form: FormGroup;
  public usuarioLogado?: UsuarioLogado | null;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private servicoAutenticacao: AutenticacaoService
  ) {
    this.usuarioLogado = this.servicoAutenticacao.obterUsuarioLogado();

    this.form = this.fb.group({
      file: [null],
      nome: [
        this.usuarioLogado?.nome,
        [Validators.required, Validators.minLength(3)]
      ]
    });
  }

  ngOnInit(): void {
  }

  public obterReferenciaInput(nomeInput: string): AbstractControl {
    return this.form.controls[nomeInput];
  }

  public voltarParaHome(): void {
    this.router.navigateByUrl('/');
  }

  public async atualizarPerfil(): Promise<void> {
    // TODO: implementar a logica de integração
    console.log('atuaizar perfil');
  }

  public limparInputNome() {
    this.obterReferenciaInput('nome').setValue('');
  }
}
