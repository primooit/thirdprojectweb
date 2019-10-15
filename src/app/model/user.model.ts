export class User {
    constructor(
        public id: string,
        public email: string,
        public password: string,
        public profile: string,
        public phone: string,
        public cpf: string,
        public adress: string
    ){}
}