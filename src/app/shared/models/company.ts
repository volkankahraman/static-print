export class Company {
  uid: string;
  constructor(public name: string) {}

  getInstance(){
      return {
          name:this.name,
      }
  }
}
