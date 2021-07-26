export class RechazoParams {

  public FechaInicial :  String;
  public FechaFinal :  String;
  public CodTxn : String;
  public CodRecha : String;
  public vFolio : String;
  constructor(FechaInicial : string, FechaFinal: string, CodTxn: string, CodRecha: String, vFolio : String){
    this.FechaInicial = FechaInicial;
    this.FechaFinal =  FechaFinal;
    this.CodTxn =  CodTxn;
    this.CodRecha = CodRecha;
    this.vFolio = vFolio;
}
}