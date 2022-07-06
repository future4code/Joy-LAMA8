export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private role: string
  ) {
    this.validateName(name);
    this.validateEmail(email);
    this.validatePass(password);
    this.validateRole(role);
  }

  validateName(name: string) {
    //TODO erro pra verificação do nome
  }
  validateEmail(email: string) {
    //TODO erro pra verificação do email
  }
  validatePass(password: string) {
    //TODO erro pra verificação da senha
  }
  validateRole(role: string) {
    //TODO erro pra verificação do role (eu não sei se precisa?)
  }
}
