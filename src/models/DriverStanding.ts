import Constructors from './Constructors';
import Driver from './Driver';

class DriverStanding {
  position: number;
  positionText: number;
  points: number;
  wins: number;
  driver: Driver;
  constructors: Constructors;

  static fromJson(data: any) {
    const item = new DriverStanding();

    item.position = data.position;
    item.positionText = data.positionText;
    item.points = data.points;
    item.wins = data.wins;
    item.driver = Driver.fromJson(data.Driver);
    item.constructors = Constructors.fromJson(data.Constructors);

    return item;
  }
}

export default DriverStanding;
