export class User {
  constructor(
    public id: number,
    public firstname: string,
    public surname: string,
    public city: string,
    public country: string,
    public gender: 'male' | 'female',
    ) {}
}
