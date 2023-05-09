export interface DireccionesAPI {
    error?:         boolean;
    message?:       string;
    codigo_postal?: CodigoPostal;
}

export interface CodigoPostal {
    estado?:             string;
    estado_abreviatura?: string;
    municipio?:          string;
    centro_reparto?:     string;
    codigo_postal?:      string;
    colonias?:           string[];
}
