export default interface Definitions {
  CartaResponsabilidade: {
    startDate: Date;
    endDate: Date;
    homeSheet: number;
    descriptionPaging: string;
    bookNumber: number;
    checkBookNumber: boolean;
    registrationData: string;
    checkEmissionDate: boolean;
    id?: number;
    razao?: string;
    typeAdress?: string;
    adress?: string;
    number?: number;
    district?: string;
    codCounty?: number;
    county?: string;
    uf?: string;
    cep?: string;
    crc: string;
    systemGestor?: string;
    saveLocation?: string;
  };
  CompanyResponsabilityLatter: {
    razao?: string;
    endereco?: string;
    numero?: string;
    bairro?: string;
    codigoMunicipio?: string;
    municipio?: string;
    uf?: string;
    cep?: string;
  };
  ConfigIpDominio: {
    ipServer?: string;
  };
  XlsxToOfx: {
    Movimentacao?: string;
    Tipo?: string;
    Valor?: number;
    SaldoAntes?: number;
    SaldoDepois?: number;
    Tarifa?: string;
    Data?: string;
    Situacao?: string;
    Destino?: string;
    DestinoDocumento?: string;
    DestinoInstituicao?: string;
    DestinoAgencia?: string;
    DestinoConta?: string;
    Origem?: string;
    OrigemDocumento?: string;
    OrigemInstituicao?: string;
    OrigemAgencia?: string;
    OrigemConta?: string;
  };
}
