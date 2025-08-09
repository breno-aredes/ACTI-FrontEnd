import axios from "axios";
import type {
  ViaCepResponse,
  CnpjResponse,
  PartnerFormData,
  ApiResponse,
} from "../types/partners";

const viaCepApi = axios.create({
  baseURL: "https://viacep.com.br/ws",
  timeout: 10000,
});

const localApi = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCepData = async (
  cep: string
): Promise<ViaCepResponse | null> => {
  try {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      throw new Error("CEP deve ter 8 dígitos");
    }

    const response = await viaCepApi.get<ViaCepResponse>(`/${cleanCep}/json/`);

    if (response.data && !("erro" in response.data)) {
      return response.data;
    } else {
      throw new Error("CEP não encontrado");
    }
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    throw new Error("Erro ao consultar CEP. Verifique se o CEP está correto.");
  }
};

export const fetchCnpjData = async (
  cnpj: string
): Promise<CnpjResponse | null> => {
  try {
    const cleanCnpj = cnpj.replace(/\D/g, "");

    if (cleanCnpj.length !== 14) {
      throw new Error("CNPJ deve ter 14 dígitos");
    }

    const response = await localApi.get<{
      success: boolean;
      data: CnpjResponse;
      message?: string;
    }>(`/cnpj/${cleanCnpj}`);

    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "CNPJ não encontrado");
    }
  } catch (error) {
    console.error("Erro ao buscar CNPJ:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error("Muitas consultas. Tente novamente em alguns minutos.");
      } else if (error.response?.status === 400) {
        throw new Error("CNPJ inválido.");
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
    }
    throw new Error("Erro ao consultar CNPJ. Tente novamente mais tarde.");
  }
};

export const createPartner = async (
  partnerData: PartnerFormData
): Promise<ApiResponse> => {
  try {
    const response = await localApi.post<ApiResponse>("/partners", partnerData);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar parceiro:", error);
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status === 400) {
        throw new Error(
          "Dados inválidos. Verifique os campos e tente novamente."
        );
      } else if (error.response?.status === 500) {
        throw new Error(
          "Erro interno do servidor. Tente novamente mais tarde."
        );
      }
    }
    throw new Error(
      "Erro ao cadastrar parceiro. Verifique sua conexão e tente novamente."
    );
  }
};

export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await localApi.get("/health");
    return response.status === 200;
  } catch (error) {
    console.error("Servidor não está respondendo:", error);
    return false;
  }
};
