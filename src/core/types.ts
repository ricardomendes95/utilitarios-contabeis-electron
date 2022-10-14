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
    idEmp?: string;
  };
  ConfigIpDominio: {
    ipServer?: string;
  };
  XlsxToOfx: {
    Movimentacao?: string;
    Tipo?: string;
    Valor?: string;
    SaldoAntes?: string;
    SaldoDepois?: string;
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
  BillsToPay: {
    codi_FOR?: number;
    qry_forn?: string;
    nume_ENT?: string;
    qry_emissao?: string;
    qry_entrada?: string;
    qry_vencmto?: string;
    VBRU?: number;
  };

  BillsToPayRequest: {
    ipDominio: string;
    date: string;
    idEmp: string;
  };
  BillsToPayRequestDoc: {
    company: Definitions['CompanyResponsabilityLatter'];
    date: string;
    billsToPays: Definitions['BillsToPay'][];
    typeDoc: string;
    saveLocation: string;
  };
  getCompany: {
    id: string;
  };
}
