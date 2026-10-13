import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Pessoa } from './pessoa/pessoa';
import { Padrao } from './padrao/padrao';
import { NaoEncontrada } from './nao-encontrada/nao-encontrada';
import { CadastroEvento } from './pages/cadastro-evento/cadastro-evento';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home },
  { path: 'pessoa', component: Pessoa },
  { path: 'padrao', component: Padrao },
  { path: 'eventos/novo', component: CadastroEvento },
  // Cadastro de evento: precisa ficar antes do curinga!
  

  // Curinga: sempre a última rota
  { path: '**', component: NaoEncontrada }
];