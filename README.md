# ACTI Frontend - Cadastro de Parceiros Comerciais

Este é o frontend da aplicação de cadastro de parceiros comerciais, desenvolvido com React, TypeScript, Vite e Styled Components.

## Tecnologias Utilizadas

- **React 18** - Biblioteca para construção da interface
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Ferramenta de build e desenvolvimento
- **Styled Components** - CSS-in-JS para estilização
- **React Hook Form** - Gerenciamento de formulários
- **Yup** - Validação de esquemas
- **Axios** - Cliente HTTP para requisições
- **React Input Mask** - Máscaras para campos de entrada

## Funcionalidades

### Formulário Completo

- Todos os campos obrigatórios conforme especificação
- Validações em tempo real
- Máscaras aplicadas automaticamente
- Feedback visual para erros e sucessos

### Máscaras Implementadas

- **CNPJ/CPF**: Máscara automática baseada no tamanho
- **CEP**: Formato 00000-000
- **Telefone/Celular**: Formatos (11) 1234-5678 e (11) 91234-5678

### Validações

- Campos obrigatórios
- Formato de email válido
- CNPJ/CPF com dígitos verificadores
- CEP com 8 dígitos
- Mensagens de erro específicas por campo

### Consumo de APIs Externas

- **ViaCEP**: Auto-preenchimento de endereço por CEP
- **ReceitaWS**: Auto-preenchimento de dados da empresa por CNPJ (apenas PJ)

### Feedback Visual

- Destaque vermelho para campos com erro
- Mensagens de sucesso em verde
- Mensagens de erro em vermelho
- Indicadores de carregamento para consultas de API

## Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para execução

1. **Clone o repositório** (se ainda não foi feito):

   ```bash
   git clone git@github.com:breno-aredes/ACTI-FrontEnd.git
   cd ACTI-FrontEnd
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Execute o projeto**:

   ```bash
   npm run dev
   ```

4. **Acesse no navegador**:
   ```
   http://localhost:5173
   ```

## Scripts Disponíveis

- `npm run dev` - Executa o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção

## Estrutura do Projeto

```
src/
├── components/
│   └── PartnerForm.tsx      # Componente principal do formulário
├── services/
│   └── api.ts               # Serviços para APIs externas e backend
├── styles/
│   └── GlobalStyles.ts      # Estilos globais e componentes styled
├── types/
│   └── partners.ts          # Tipos TypeScript
├── utils/
│   ├── masks.ts             # Funções para máscaras e validações
│   └── validation.ts        # Schema de validação Yup
├── App.tsx                  # Componente raiz
└── main.tsx                 # Ponto de entrada
```

## APIs Utilizadas

### API Externas

- **ViaCEP**: `https://viacep.com.br/ws/{cep}/json/`

### API Local

- **Backend**: `http://localhost:3000`
- **Endpoint**: `POST /partners` - Cadastro de parceiros
- **Endpoint**: `GET /partners/cnpj/:cnpj` - Consulta dados de parceiro pelo CNPJ

## Responsividade

O formulário é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop**: Layout em colunas
- **Tablet**: Layout adaptado
- **Mobile**: Layout em coluna única

## Validações Implementadas

### Campos Obrigatórios

- Tipo de Parceiro
- Personalidade (Física/Jurídica)
- Razão Social
- Nome Fantasia
- CNPJ/CPF
- Segmento
- Categoria
- CEP
- UF
- Município
- Logradouro
- Número
- Bairro
- Email
- Telefone

### Validações Específicas

- **Email**: Formato válido
- **CNPJ/CPF**: Dígitos verificadores
- **CEP**: 8 dígitos numéricos
- **UF**: Exatamente 2 caracteres
- **Telefone**: Mínimo 10 dígitos

## Tratamento de Erros

- Validação em tempo real
- Mensagens de erro específicas
- Destaque visual para campos inválidos
- Tratamento de erros de API
- Verificação de conectividade com o backend

## Design

- Interface limpa e moderna
- Paleta de cores consistente
- Feedback visual intuitivo
- Experiência do usuário otimizada
- Design responsivo

## Observações

1. **Dependência do Backend**: O frontend verifica se o backend está rodando na porta 3000
2. **APIs Externas**: As consultas de CEP têm debounce para otimizar performance
3. **Máscaras Dinâmicas**: A máscara de CNPJ/CPF se adapta automaticamente
4. **Auto-preenchimento**: Funciona apenas para pessoa jurídica (CNPJ)
