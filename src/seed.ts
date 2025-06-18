import { PrismaClient} from '@prisma/client';
import argon2 from 'argon2'; //Adicionar import <---------
const prisma = new PrismaClient()

async function main() {

    console.log('Iniciando o seed...')
    const senhaHash = await argon2.hash('senha123'); 

  // Criando funcionários
  const funcionario1 = await prisma.funcionario.create({
    data: {
      nomeFunc: 'João Silva',
      cpfFunc: '12345678901',
      dataNasc: new Date('1990-01-01'),
      salario: 2500,
      tipo: 'MOTORISTA',
    },
  })

  const funcionario2 = await prisma.funcionario.create({
    data: {
      nomeFunc: 'Maria Oliveira',
      cpfFunc: '10987654321',
      dataNasc: new Date('1985-05-15'),
      salario: 3000,
      tipo: 'MOTORISTA',
    },
  })

  // Transportadora
  const transportadora = await prisma.transportadora.create({
    data: {
      nomeTransp: 'Transportadora XYZ',
      cnpjTransp: '12.345.678/0001-99',
      enderecoTransp: 'Rua das Transportadoras, 123',
    },
  })

  // Veículos
  const veiculo1 = await prisma.veiculo.create({
    data: {
      renav: 123456789,
      placa: 'ABC1234',
      modelo: 'Furgão',
      marca: 'Ford',
      ano: 2015,
      capacidade: 2000,
      senha: senhaHash, // Adicionando a senha hash
    },
  })

  const veiculo2 = await prisma.veiculo.create({
    data: {
      renav: 987654321,
      placa: 'XYZ9876',
      modelo: 'Caminhão',
      marca: 'Mercedes',
      ano: 2020,
      capacidade: 5000,
      senha: senhaHash,
    },
  })

  // Locais
  const local1 = await prisma.local.create({
    data: {
      endereco: 'Rua A, 123',
      tipoImovel: 'Armazém',
      custoMensal: 1500,
      tipo: 'ALUGUEL',
      valorAluguel: 1500,
    },
  })

  const local2 = await prisma.local.create({
    data: {
      endereco: 'Rua B, 456',
      tipoImovel: 'Escritório',
      custoMensal: 3500,
      tipo: 'PROPRIO',
      valorImovel: 500000,
    },
  })

  // Fornecedor
  const fornecedor = await prisma.fornecedor.create({
    data: {
      nomeFor: 'Fornecedor ABC',
      cnpjFor: '98.765.432/0001-01',
      comissao: 15,
      endereco: 'Rua do Fornecedor, 789',
      tipo: 'Fornecedor de Material',
    },
  })

  // Nota Fiscal
  const notaFiscal = await prisma.notaFiscal.create({
    data: {
      numNota: 12345,
      peso: 1000,
      cidade: 'São Paulo',
      numItens: 10,
    },
  })

  // Relatório
  const relatorio = await prisma.relatorio.create({
    data: {
      dataInicio: new Date('2025-01-01'),
      dataFinal: new Date('2025-01-31'),
    },
  })
  console.log('veiculo1 criado:', veiculo1)

  // Entrega vinculada a veiculo1 e relatorio criado
  const entrega = await prisma.entrega.create({
    data: {
      cidadeDestino: 'Rio de Janeiro',
      quilometragem: 500,
      status: 'Em andamento',
      dataSaida: new Date('2025-05-07'),
      veiculo: {
        connect: { id: veiculo1.id},
      },
    },
  });
  
  

  console.log('Todas as instâncias foram criadas com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
