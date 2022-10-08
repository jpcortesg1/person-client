export enum DocumentTypes {
  CC = "Cédula de Ciudadanía",
  CE = "Cédula de Extranjería",
  TI = "Tarjeta de Identidad",
  RC = "Registro Civil",
  PA = "Pasaporte",
  MS = "Menor Sin Identificación",
  AS = "Adulto Sin Identificación",
  NI = "NIT",
  NU = "Número Único de Identificación",
  OT = "Otro",
}

export interface DocumentType {
  document_type: DocumentTypes;
}
