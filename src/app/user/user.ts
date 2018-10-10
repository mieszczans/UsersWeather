export class User {
  constructor(
    public firstname: string,
    public surname: string,
    public city: string,
    public country: string,
    public gender: 'male' | 'female',
    public id?: number
    ) {}
}
