class Season {
  season: string;

  url: string;

  static fromJson(data: any) {
    const item = new Season();
    item.season = data.season;
    item.url = data.round;
    
    return item;
  }
}

export default Season;
