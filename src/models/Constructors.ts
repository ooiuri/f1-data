class Constructors {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;

  static fromJson(data: any) {
    const item = new Constructors();

    item.constructorId = data.constructorId;
    item.url = data.url;
    item.name = data.name;
    item.nationality = data.nationality;

    return item;
  }
}

export default Constructors;
