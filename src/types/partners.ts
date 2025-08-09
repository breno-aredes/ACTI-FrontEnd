export interface PartnerFormData {
  PartnerType: "Agente Logística" | "Cliente" | "Despachante" | "Fornecedor";
  PersonalityType: "Física" | "Jurídica";
  CompanyName: string;
  TradeName: string;
  CnpjCpf: string;
  Segment: string;
  Category: string;
  ZipCode: string;
  Country: string;
  State: string;
  City: string;
  Street: string;
  Number: string;
  District: string;
  Email: string;
  Phone: string;
  AddressComplement?: string;
  MobilePhone?: string;
  Notes?: string;
}

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface CnpjResponse {
  companyName: string;
  tradeName?: string;
  email: string;
  phone: string;
  logradouro: string;
  numero: string;
  municipio: string;
  bairro: string;
  uf: string;
  cep: string;
  situacao: string;
  status: string;
  abertura: string;
  tipo: string;
  porte: string;
  natureza_juridica: string;
  atividade_principal: Array<{
    code: string;
    text: string;
  }>;
  atividades_secundarias?: Array<{
    code: string;
    text: string;
  }>;
  qsa: Array<{
    nome: string;
    qual: string;
  }>;
  capital_social: string;
  data_situacao: string;
  cnpj: string;
  ultima_atualizacao: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
