import * as yup from "yup";
import { validateCnpjCpf, validateEmail, validateCEP } from "../utils/masks";
import type { PartnerFormData } from "../types/partners";

export const partnerSchema: yup.ObjectSchema<PartnerFormData> = yup.object({
  PartnerType: yup
    .mixed<"Agente Logística" | "Cliente" | "Despachante" | "Fornecedor">()
    .oneOf(
      ["Agente Logística", "Cliente", "Despachante", "Fornecedor"],
      "Selecione um tipo válido"
    )
    .required("Tipo de parceiro é obrigatório"),

  PersonalityType: yup
    .mixed<"Física" | "Jurídica">()
    .oneOf(["Física", "Jurídica"], "Selecione uma personalidade válida")
    .required("Personalidade é obrigatória"),

  CompanyName: yup
    .string()
    .min(2, "Razão social deve ter pelo menos 2 caracteres")
    .max(255, "Razão social deve ter no máximo 255 caracteres")
    .required("Razão social é obrigatória"),

  TradeName: yup
    .string()
    .min(1, "Nome fantasia deve ter pelo menos 1 caractere")
    .max(255, "Nome fantasia deve ter no máximo 255 caracteres")
    .required("Nome fantasia é obrigatório"),

  CnpjCpf: yup
    .string()
    .test("cnpj-cpf-valid", "CNPJ/CPF inválido", function (value) {
      if (!value) return false;
      return validateCnpjCpf(value);
    })
    .required("CNPJ/CPF é obrigatório"),

  Segment: yup
    .string()
    .min(1, "Segmento deve ter pelo menos 1 caractere")
    .max(100, "Segmento deve ter no máximo 100 caracteres")
    .required("Segmento é obrigatório"),

  Category: yup
    .string()
    .min(1, "Categoria deve ter pelo menos 1 caractere")
    .max(100, "Categoria deve ter no máximo 100 caracteres")
    .required("Categoria é obrigatória"),

  ZipCode: yup
    .string()
    .test("cep-valid", "CEP inválido", function (value) {
      if (!value) return false;
      return validateCEP(value);
    })
    .required("CEP é obrigatório"),

  Country: yup
    .string()
    .max(50, "País deve ter no máximo 50 caracteres")
    .required("País é obrigatório"),

  State: yup
    .string()
    .length(2, "UF deve ter exatamente 2 caracteres")
    .required("UF é obrigatória"),

  City: yup
    .string()
    .min(1, "Município deve ter pelo menos 1 caractere")
    .max(100, "Município deve ter no máximo 100 caracteres")
    .required("Município é obrigatório"),

  Street: yup
    .string()
    .min(1, "Logradouro deve ter pelo menos 1 caractere")
    .max(255, "Logradouro deve ter no máximo 255 caracteres")
    .required("Logradouro é obrigatório"),

  Number: yup
    .string()
    .min(1, "Número deve ter pelo menos 1 caractere")
    .max(20, "Número deve ter no máximo 20 caracteres")
    .required("Número é obrigatório"),

  District: yup
    .string()
    .min(1, "Bairro deve ter pelo menos 1 caractere")
    .max(100, "Bairro deve ter no máximo 100 caracteres")
    .required("Bairro é obrigatório"),

  Email: yup
    .string()
    .test("email-valid", "Email deve ter um formato válido", function (value) {
      if (!value) return false;
      return validateEmail(value);
    })
    .max(255, "Email deve ter no máximo 255 caracteres")
    .required("Email é obrigatório"),

  Phone: yup
    .string()
    .min(14, "Telefone deve ter pelo menos 10 dígitos")
    .max(15, "Telefone deve ter no máximo 11 dígitos")
    .required("Telefone é obrigatório"),

  AddressComplement: yup.string().optional(),
  MobilePhone: yup.string().optional(),
  Notes: yup.string().optional(),
});
