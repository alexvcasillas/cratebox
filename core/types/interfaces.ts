export interface baseType {
  name: string;
  checker(v: any): boolean;
}

export interface arrayType {
  name: string;
  type: baseType;
  checker(v: any[]): boolean;
}
