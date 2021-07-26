export class fuentepapelParam {
    public fechaArribo :  string;
    public NumAutoriza :  string;
    public codigoTransaccion: string;
    constructor(fechaArribo : string, NumAutoriza: string, codigoTransaccion: string){
        this.fechaArribo = fechaArribo;
        this.NumAutoriza =  NumAutoriza;
        this.codigoTransaccion =  codigoTransaccion;
    }
}