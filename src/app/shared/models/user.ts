export class User {
  constructor(
    public uid: string,
    public email: string,
    public username: string,
    public displayName: string,
  ) {}

  getInstance() {
    return {
      displayName: this.displayName,
      email: this.email,
      username: this.username,
    };
  }

  getInstanceWithID(){
    return{
      ...this.getInstance(),
      uid: this.uid,
    }
  }
}
