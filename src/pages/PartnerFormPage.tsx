import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { partnerSchema } from "../utils/validation";
import {
  cnpjCpfMaskByPersonality,
  cepMask,
  phoneMask,
  removeMask,
} from "../utils/masks";
import {
  fetchCepData,
  fetchCnpjData,
  createPartner,
  checkServerHealth,
} from "../services/api";
import type { PartnerFormData } from "../types/partners";
import { Input, Select, TextArea, Button } from "../components/ui";
import {
  ButtonGroup,
  Card,
  Column,
  Container,
  ErrorCard,
  FormGroup,
  Row,
  Subtitle,
  SuccessMessage,
  Title,
} from "./styled";

const partnerTypeOptions = [
  { value: "Agente Logística", label: "Agente Logística" },
  { value: "Cliente", label: "Cliente" },
  { value: "Despachante", label: "Despachante" },
  { value: "Fornecedor", label: "Fornecedor" },
];

const personalityTypeOptions = [
  { value: "Física", label: "Física" },
  { value: "Jurídica", label: "Jurídica" },
];

export const PartnerFormPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [serverOnline, setServerOnline] = useState(false);
  const [isCheckingCep, setIsCheckingCep] = useState(false);
  const [isCheckingCnpj, setIsCheckingCnpj] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    trigger,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: yupResolver(partnerSchema),
    defaultValues: {
      // Removido valor padrão do País - será preenchido apenas quando houver CEP
    },
  });

  const watchedCep = watch("ZipCode");
  const watchedCnpj = watch("CnpjCpf");
  const watchedPersonalityType = watch("PersonalityType");

  useEffect(() => {
    const checkServer = async () => {
      const isOnline = await checkServerHealth();
      setServerOnline(isOnline);
    };
    checkServer();
  }, []);

  useEffect(() => {
    const loadCepData = async () => {
      if (watchedCep && removeMask(watchedCep).length === 8) {
        setIsCheckingCep(true);
        try {
          const cepData = await fetchCepData(watchedCep);
          if (cepData) {
            setValue("Street", cepData.logradouro || "");
            setValue("District", cepData.bairro || "");
            setValue("City", cepData.localidade || "");
            setValue("State", cepData.uf || "");
            setValue("Country", "Brasil");

            await trigger(["Street", "District", "City", "State", "Country"]);
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
        } finally {
          setIsCheckingCep(false);
        }
      }
    };

    const debounceTimer = setTimeout(loadCepData, 500);
    return () => clearTimeout(debounceTimer);
  }, [watchedCep, setValue, trigger]);

  useEffect(() => {
    const loadCnpjData = async () => {
      if (
        watchedPersonalityType === "Jurídica" &&
        watchedCnpj &&
        removeMask(watchedCnpj).length === 14
      ) {
        setIsCheckingCnpj(true);
        try {
          const cnpjData = await fetchCnpjData(watchedCnpj);

          if (cnpjData) {
            setValue("CompanyName", cnpjData.companyName || "");
            setValue(
              "TradeName",
              cnpjData.tradeName || cnpjData.companyName || ""
            );
            if (cnpjData.email) setValue("Email", cnpjData.email);
            if (cnpjData.phone) setValue("Phone", cnpjData.phone);

            // Dispara validação para todos os campos preenchidos
            await trigger(["CompanyName", "TradeName"]);
            if (cnpjData.email) await trigger("Email");
            if (cnpjData.phone) await trigger("Phone");
          }
        } catch (error) {
          console.error("Erro ao buscar CNPJ:", error);
        } finally {
          setIsCheckingCnpj(false);
        }
      }
    };

    const debounceTimer = setTimeout(loadCnpjData, 1000);
    return () => clearTimeout(debounceTimer);
  }, [watchedCnpj, watchedPersonalityType, setValue, trigger]);

  // Limpa o campo CNPJ/CPF quando a personalidade muda
  useEffect(() => {
    if (watchedPersonalityType) {
      setValue("CnpjCpf", "");
      // Limpa o erro do campo também
      trigger("CnpjCpf");
    }
  }, [watchedPersonalityType, setValue, trigger]);

  const onSubmit = async (data: PartnerFormData) => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const cleanData = {
        ...data,
        CnpjCpf: removeMask(data.CnpjCpf),
        ZipCode: removeMask(data.ZipCode),
        Phone: removeMask(data.Phone),
        MobilePhone: data.MobilePhone ? removeMask(data.MobilePhone) : "",
      };

      const response = await createPartner(cleanData);

      if (response.success) {
        setSuccessMessage("Parceiro cadastrado com sucesso!");
        reset();
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setErrorMessage(response.message || "Erro ao cadastrar parceiro");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Erro inesperado"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setSuccessMessage("");
    setErrorMessage("");
  };

  if (!serverOnline) {
    return (
      <Container>
        <Card>
          <ErrorCard>
            Servidor não está respondendo. Verifique se o backend está rodando
            na porta 3000.
          </ErrorCard>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Title>Cadastro de Parceiros Comerciais</Title>

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorCard>{errorMessage}</ErrorCard>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Subtitle>Informações Básicas</Subtitle>

          <Row>
            <Column width="1">
              <FormGroup>
                <Controller
                  name="PartnerType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Tipo de Parceiro"
                      required
                      options={partnerTypeOptions}
                      value={partnerTypeOptions.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(option) =>
                        field.onChange((option as { value: string })?.value)
                      }
                      placeholder="Selecione..."
                      error={errors.PartnerType?.message}
                    />
                  )}
                />
              </FormGroup>
            </Column>

            <Column width="1">
              <FormGroup>
                <Controller
                  name="PersonalityType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Personalidade"
                      required
                      options={personalityTypeOptions}
                      value={personalityTypeOptions.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(option) =>
                        field.onChange((option as { value: string })?.value)
                      }
                      placeholder="Selecione..."
                      error={errors.PersonalityType?.message}
                    />
                  )}
                />
              </FormGroup>
            </Column>
          </Row>

          <Row>
            <Column width="2">
              <FormGroup>
                <Input
                  {...register("CompanyName")}
                  label="Razão Social"
                  required
                  placeholder="Digite a razão social"
                  error={errors.CompanyName?.message}
                />
              </FormGroup>
            </Column>

            <Column width="2">
              <FormGroup>
                <Input
                  {...register("TradeName")}
                  label="Nome Fantasia"
                  required
                  placeholder="Digite o nome fantasia"
                  error={errors.TradeName?.message}
                />
              </FormGroup>
            </Column>
          </Row>

          <Row>
            <Column width="1">
              <FormGroup>
                <Input
                  label={
                    watchedPersonalityType === "Física"
                      ? "CPF"
                      : watchedPersonalityType === "Jurídica"
                      ? "CNPJ"
                      : "CPF/CNPJ"
                  }
                  required
                  placeholder={
                    watchedPersonalityType === "Física"
                      ? "000.000.000-00"
                      : watchedPersonalityType === "Jurídica"
                      ? "00.000.000/0000-00"
                      : "000.000.000-00 ou 00.000.000/0000-00"
                  }
                  value={watch("CnpjCpf") || ""}
                  onChange={async (e) => {
                    const maskedValue = cnpjCpfMaskByPersonality(
                      e.target.value,
                      watchedPersonalityType
                    );
                    setValue("CnpjCpf", maskedValue);
                    // Dispara a validação para limpar o erro
                    await trigger("CnpjCpf");
                  }}
                  error={errors.CnpjCpf?.message}
                  isLoading={isCheckingCnpj}
                />
              </FormGroup>
            </Column>

            <Column width="1">
              <FormGroup>
                <Input
                  {...register("Segment")}
                  label="Segmento"
                  required
                  placeholder="Digite o segmento"
                  error={errors.Segment?.message}
                />
              </FormGroup>
            </Column>

            <Column width="1">
              <FormGroup>
                <Input
                  {...register("Category")}
                  label="Categoria"
                  required
                  placeholder="Digite a categoria"
                  error={errors.Category?.message}
                />
              </FormGroup>
            </Column>
          </Row>

          <Subtitle>Endereço</Subtitle>

          <Row>
            <Column width="1">
              <FormGroup>
                <Input
                  label="CEP"
                  required
                  placeholder="00000-000"
                  value={watch("ZipCode") || ""}
                  onChange={async (e) => {
                    const maskedValue = cepMask(e.target.value);
                    setValue("ZipCode", maskedValue);
                    await trigger("ZipCode");
                  }}
                  error={errors.ZipCode?.message}
                  isLoading={isCheckingCep}
                />
              </FormGroup>
            </Column>

            <Column width="1">
              <FormGroup>
                <Input
                  {...register("Country")}
                  label="País"
                  placeholder="Brasil"
                  error={errors.Country?.message}
                />
              </FormGroup>
            </Column>

            <Column width="1">
              <FormGroup>
                <Input
                  {...register("State")}
                  label="UF"
                  required
                  placeholder="SP"
                  maxLength={2}
                  style={{ textTransform: "uppercase" }}
                  onChange={async (e) => {
                    setValue("State", e.target.value.toUpperCase());
                    await trigger("State");
                  }}
                  error={errors.State?.message}
                />
              </FormGroup>
            </Column>
          </Row>

          <Row>
            <Column width="2">
              <FormGroup>
                <Input
                  {...register("City")}
                  label="Município"
                  required
                  placeholder="Digite o município"
                  error={errors.City?.message}
                />
              </FormGroup>
            </Column>

            <Column width="2">
              <FormGroup>
                <Input
                  {...register("Street")}
                  label="Logradouro"
                  required
                  placeholder="Digite o logradouro"
                  error={errors.Street?.message}
                />
              </FormGroup>
            </Column>
          </Row>

          <Row>
            <Column width="1">
              <FormGroup>
                <Input
                  {...register("Number")}
                  label="Número"
                  required
                  placeholder="123"
                  error={errors.Number?.message}
                />
              </FormGroup>
            </Column>

            <Column width="1">
              <FormGroup>
                <Input
                  {...register("District")}
                  label="Bairro"
                  required
                  placeholder="Digite o bairro"
                  error={errors.District?.message}
                />
              </FormGroup>
            </Column>

            <Column width="2">
              <FormGroup>
                <Input
                  {...register("AddressComplement")}
                  label="Complemento"
                  placeholder="Apto, Sala, etc."
                  error={errors.AddressComplement?.message}
                />
              </FormGroup>
            </Column>
          </Row>

          <Subtitle>Contato</Subtitle>

          <Row>
            <Column width="2">
              <FormGroup>
                <Input
                  {...register("Email")}
                  label="Email"
                  required
                  type="email"
                  placeholder="email@exemplo.com"
                  error={errors.Email?.message}
                />
              </FormGroup>
            </Column>

            <Column width="1">
              <FormGroup>
                <Input
                  label="Telefone"
                  required
                  placeholder="(11) 1234-5678"
                  value={watch("Phone") || ""}
                  onChange={async (e) => {
                    const maskedValue = phoneMask(e.target.value);
                    setValue("Phone", maskedValue);
                    await trigger("Phone");
                  }}
                  error={errors.Phone?.message}
                />
              </FormGroup>
            </Column>

            <Column width="1">
              <FormGroup>
                <Input
                  label="Celular"
                  placeholder="(11) 91234-5678"
                  value={watch("MobilePhone") || ""}
                  onChange={async (e) => {
                    const maskedValue = phoneMask(e.target.value);
                    setValue("MobilePhone", maskedValue);
                    await trigger("MobilePhone");
                  }}
                  error={errors.MobilePhone?.message}
                />
              </FormGroup>
            </Column>
          </Row>

          <Row>
            <Column>
              <FormGroup>
                <TextArea
                  {...register("Notes")}
                  label="Observações"
                  placeholder="Digite observações adicionais..."
                  rows={4}
                  error={errors.Notes?.message}
                />
              </FormGroup>
            </Column>
          </Row>

          <ButtonGroup>
            <Button
              variant="secondary"
              type="button"
              size="medium"
              onClick={handleReset}
            >
              Limpar
            </Button>
            <Button type="submit" size="medium" isLoading={isLoading}>
              Cadastrar Parceiro
            </Button>
          </ButtonGroup>
        </form>
      </Card>
    </Container>
  );
};
