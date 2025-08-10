# ACTI Frontend - Cadastro de Parceiros Comerciais

Este é o frontend da aplicação de cadastro de parceiros comerciais, desenvolvido com React, TypeScript, Vite e Styled Components.

## Tecnologias Utilizadas

- **React 18** - Biblioteca para construção da interface
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Ferramenta de build e desenvolvimento
- **Styled Components** - CSS-in-JS para estilização dos componentes
- **React Hook Form** - Gerenciamento de formulários com performance otimizada
- **Yup** - Validação de esquemas e formulários
- **Axios** - Cliente HTTP para requisições às APIs
- **@hookform/resolvers** - Integração entre React Hook Form e Yup

## Funcionalidades

### Formulário Completo de Parceiros

- Cadastro de parceiros comerciais com todos os campos obrigatórios
- Validações em tempo real com Yup e React Hook Form
- Máscaras aplicadas automaticamente conforme o tipo de campo
- Feedback visual imediato para erros e sucessos
- Verificação de conectividade com o backend

### Máscaras Inteligentes

- **CNPJ/CPF**: Máscara automática baseada na personalidade selecionada
- **CEP**: Formato 00000-000 com busca automática
- **Telefone/Celular**: Formatos (11) 1234-5678 e (11) 91234-5678

### Validações Avançadas

- Campos obrigatórios com mensagens específicas
- Validação de formato de email
- CNPJ/CPF com verificação de dígitos apenas quando completo
- CEP com 8 dígitos e consulta automática na ViaCEP
- UF com exatamente 2 caracteres em maiúsculo

### Integração com APIs

- **ViaCEP**: Auto-preenchimento de endereço completo por CEP
- **Consulta CNPJ**: Auto-preenchimento de dados da empresa (apenas PJ)
- **Health Check**: Verificação automática da disponibilidade do backend

### Interface Responsiva

- Design adaptativo para desktop, tablet e mobile
- Componentes UI reutilizáveis e estilizados
- Feedback visual com cores e estados distintos
- Indicadores de carregamento para operações assíncronas

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
│   └── ui/                  # Componentes de interface reutilizáveis
│       ├── Button/          # Componente de botão
│       ├── Input/           # Componente de input
│       ├── Select/          # Componente de select
│       ├── TextArea/        # Componente de textarea
│       └── index.ts         # Barrel exports dos componentes
├── pages/
│   ├── PartnerFormPage.tsx  # Página principal do formulário de cadastro
│   ├── index.ts             # Exports das páginas
│   └── styled.ts            # Estilos específicos da página
├── services/
│   └── api.ts               # Serviços para APIs externas e backend
├── types/
│   └── partners.ts          # Tipos TypeScript
├── utils/
│   ├── masks.ts             # Funções para máscaras e validações
│   └── validation.ts        # Schema de validação Yup
├── assets/                  # Recursos estáticos
├── App.tsx                  # Componente raiz
├── main.tsx                 # Ponto de entrada
├── index.css                # Estilos globais
└── vite-env.d.ts           # Tipos do Vite
```

## APIs Utilizadas

### APIs Externas

- **ViaCEP**: `https://viacep.com.br/ws/{cep}/json/` - Auto-preenchimento de endereço por CEP

### API Local (Backend)

- **Base URL**: `http://localhost:3000`
- **Health Check**: `GET /health` - Verificação de status do servidor
- **Cadastro de Parceiros**: `POST /partners` - Cadastro de novos parceiros
- **Consulta CNPJ**: `GET /cnpj/:cnpj` - Consulta dados de empresa por CNPJ

## Arquitetura e Design

### Componentes Reutilizáveis

O projeto utiliza uma arquitetura de componentes bem estruturada:

- **Componentes UI**: Button, Input, Select, TextArea com estilos consistentes
- **Páginas**: Separação clara entre lógica de apresentação e de negócio
- **Styled Components**: Estilização modular e temática

### Responsividade

O formulário é totalmente responsivo com layout adaptativo:

- **Desktop**: Layout em colunas otimizado para telas grandes
- **Tablet**: Layout adaptado com espaçamento adequado
- **Mobile**: Layout em coluna única para melhor usabilidade

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

## Melhorias Implementadas

### Validação Inteligente

- **CPF/CNPJ**: Validação apenas quando o campo está completo (11 ou 14 dígitos)
- **CEP**: Auto-preenchimento apenas de campos com dados válidos
- **Máscaras Condicionais**: Adapta-se automaticamente ao tipo de personalidade

### Performance

- **Debounce**: Implementado nas consultas de CEP (500ms) e CNPJ (1000ms)
- **Lazy Validation**: Validação de CPF/CNPJ apenas quando necessário
- **Componentes Otimizados**: Re-renders minimizados com React Hook Form

### Tratamento de Erros

- Verificação de conectividade com o backend
- Mensagens de erro específicas para cada situação
- Fallback quando APIs externas falham
- Limpeza automática de erros quando dados são corrigidos

## Observações Técnicas

1. **Dependência do Backend**: Verifica automaticamente se o backend está rodando na porta 3000
2. **APIs Externas**: Consultas com timeout e tratamento de falhas
3. **Tipagem Completa**: TypeScript em todo o projeto para maior segurança
4. **Validação Progressive**: Não mostra erros até que seja apropriado
5. **Auto-preenchimento Seguro**: Só preenche campos quando há dados válidos das APIs
