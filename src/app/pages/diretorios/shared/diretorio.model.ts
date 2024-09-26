import { BaseResourceModel } from "../../../shared/models/base-resource.model";

export class Diretorio extends BaseResourceModel {

  constructor(
    public override id?: number,
    public nome?: string,
    public diretorioPai?: Diretorio,
    public subDiretorios?: Diretorio[],
    // public arquivos?: Arquivos[];

  ) {
    super();
  }

  static fromJson(jsonData: any): Diretorio {
    return Object.assign(new Diretorio(), jsonData);
  }

}
