export interface dbAccessResponse {
    ok:boolean,
    msg?:string,
    uid?:string,
    nombre?:string
}

export interface saboresHelado{
    nombre: string;
    check?:false;
}

export interface precio{
    name:string;
    precio:number;
    cant: number;
    sabores: string;
    salsas:string;
    desc:string;
    check:boolean;
    totalSalsas:number;
}

export interface salsa{
    nombre:string;
    desc:string
}

export interface saborAlf{
    nombre:string;
    desc:string
}

