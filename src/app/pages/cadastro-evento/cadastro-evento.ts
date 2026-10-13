import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Evento } from '../../models/evento';

import {
  validarTitulo,
  validarData,
  validarLocal,
  validarEmail,
  validarVagas
} from '../../models/evento.validacao';

@Component({
  selector: 'app-cadastro-evento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-evento.html',
  styleUrl: './cadastro-evento.css'
})
export class CadastroEvento {
  titulo = '';
  data = '';
  local = '';
  emailResponsavel = '';
  vagas: number | null = null;

  eventos: Evento[] = [];

  erros: Record<string, string | null> = {
    titulo: null,
    data: null,
    local: null,
    emailResponsavel: null,
    vagas: null
  };

  tocados: Record<string, boolean> = {
    titulo: false,
    data: false,
    local: false,
    emailResponsavel: false,
    vagas: false
  };

  validarCampo(campo: string): void {
    this.tocados[campo] = true;

    switch (campo) {
      case 'titulo':
        this.erros['titulo'] = validarTitulo(this.titulo);
        break;

      case 'data':
        this.erros['data'] = validarData(this.data);
        break;

      case 'local':
        this.erros['local'] = validarLocal(this.local);
        break;

      case 'emailResponsavel':
        this.erros['emailResponsavel'] =
          validarEmail(this.emailResponsavel);
        break;

      case 'vagas':
        this.erros['vagas'] = validarVagas(this.vagas);
        break;
    }

    this.validarRegraLaboratorio();
  }

  validarRegraLaboratorio(): void {
    const erroVagas = validarVagas(this.vagas);

    if (erroVagas) {
      this.erros['vagas'] = erroVagas;
      return;
    }

    if (
      (this.local === 'Laboratório 1' ||
        this.local === 'Laboratório 2') &&
      this.vagas !== null &&
      this.vagas > 30
    ) {
      this.erros['vagas'] =
        'Nos laboratórios, o máximo é de 30 vagas.';
    } else {
      this.erros['vagas'] = null;
    }
  }

  get formularioValido(): boolean {
    return (
      validarTitulo(this.titulo) === null &&
      validarData(this.data) === null &&
      validarLocal(this.local) === null &&
      validarEmail(this.emailResponsavel) === null &&
      validarVagas(this.vagas) === null &&
      !(
        (this.local === 'Laboratório 1' ||
          this.local === 'Laboratório 2') &&
        this.vagas !== null &&
        this.vagas > 30
      )
    );
  }

  salvar(): void {
    if (!this.formularioValido) {
      return;
    }

    const evento: Evento = {
      id: Date.now(),
      titulo: this.titulo.trim(),
      data: this.data,
      local: this.local,
      emailResponsavel: this.emailResponsavel.trim(),
      vagas: this.vagas
    };

    this.eventos.push(evento);
    this.limparFormulario();
  }

  limparFormulario(): void {
    this.titulo = '';
    this.data = '';
    this.local = '';
    this.emailResponsavel = '';
    this.vagas = null;

    for (const campo of Object.keys(this.erros)) {
      this.erros[campo] = null;
      this.tocados[campo] = false;
    }
  }
}