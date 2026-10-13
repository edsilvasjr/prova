export function validarTitulo(valor: string): string | null {
  const titulo = valor?.trim() ?? '';

  if (titulo.length < 5 || titulo.length > 80) {
    return 'O título deve ter entre 5 e 80 caracteres.';
  }

  return null;
}

export function validarData(valor: string): string | null {
  if (!valor) {
    return 'A data é obrigatória.';
  }

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  const dataHoje = `${ano}-${mes}-${dia}`;

  if (valor < dataHoje) {
    return 'A data não pode estar no passado.';
  }

  return null;
}

export function validarLocal(valor: string): string | null {
  if (!valor) {
    return 'O local não pode ficar em branco.';
  }

  return null;
}

export function validarEmail(valor: string): string | null {
  if (!valor?.trim()) {
    return 'O e-mail do responsável é obrigatório.';
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
    ? null
    : 'E-mail em formato inválido.';
}

export function validarVagas(valor: number | null): string | null {
  if (
    valor === null ||
    !Number.isInteger(valor) ||
    valor < 1 ||
    valor > 200
  ) {
    return 'As vagas devem ser um número inteiro de 1 a 200.';
  }

  return null;
}