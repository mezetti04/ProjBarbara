class Entrega {
  cidadeDestino: string = ''
  quilometragem: number = 0
  status: string = ''
  dataSaida: Date = new Date()

  calcularPesoTotal(): number {
    return 0
  }
}

class NotaFiscal {
  id: number = 0
  numNota: number = 0
  peso: number = 0
  cidade: string = ''
  numItens: number = 0
}

class Relatorio {
  dataInicio: Date = new Date()
  dataFinal: Date = new Date()
  entregas: Entrega[] = []

  calcularFaturamento(): number {
    return 0
  }

  calcularUso(): number {
    return 0
  }

  calcularPesoCarregado(): number {
    return 0
  }

  calculaCustoOperacional(): number {
    return 0
  }
}

class Local {
  id: number = 0
  endereco: string = ''
  tipoImovel: string = ''
  custoMensal: number = 0
  tipo: string = ''          // "ALUGUEL" ou "PROPRIO"
  valorAluguel?: number     // usado se ALUGUEL
  valorImovel?: number      // usado se PROPRIO
}

class Transportadora {
  nomeTransp: string = ''
  cnpjTransp: string = ''
  enderecoTransp: string = ''

  gerarRelatorio(): string {
    return ''
  }

  calculaPrecoEntrega(): number {
    return 0
  }
}

class Funcionario {
  id: number = 0
  nomeFunc: string = ''
  cpfFunc: string = ''
  dataNasc: Date = new Date()
  salario: number = 0
  tipo: string = '' // "MOTORISTA", "CARREGADOR", "GERENTE"
}

class Motorista extends Funcionario {
  calculaFaturamento(): number {
    return 0
  }
}

class Carregador extends Funcionario {}

class Gerente extends Funcionario {}

class Fornecedor {
  id: number = 0
  nomeFor: string = ''
  cnpjFor: string = ''
  comissao: number = 0
  endereco: string = ''
  tipo: string = ''
}

class Veiculo {
  id: number = 0
  renav: number = 0
  placa: string = ''
  modelo: string = ''
  marca: string = ''
  ano: number = 0
  capacidade: number = 0
}
