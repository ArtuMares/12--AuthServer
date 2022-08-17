export interface AuthResponse{
    ok: boolean,
    uid?:string,
    name?:string,
    email?:string,
    registro?:string,
    carrera?:string,
    role?:string,
    token?:string,
    msg?:string
}
export interface Usuario{
    uid: string,
    email:string,
    name:string,
    registro:string,
    carrera:string,
    role:string
}