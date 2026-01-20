import { format } from 'date-fns';
import Practice from './Practice';

class Race {
  season: string;

  round: string;

  raceName: string;

  url: string;

  date: Date;

  dateFormatted: string;

  FirstPractice?: Practice;

  SecondPractice?: Practice;

  ThirdPractice?: Practice;

  Qualifying?: Practice;

  static fromJson(data: any) {
    const race = new Race();
    race.season = data.season;
    race.round = data.round;
    race.raceName = data.raceName;
    race.url = data.url;
    race.date = new Date(data.date);
    race.dateFormatted = data.date ? format(data.date, 'dd/MM/yyyy') : '';
    race.FirstPractice = data.FirstPractice ? Practice.fromJson(data.FirstPractice) : undefined;
    race.SecondPractice = data.SecondPractice ? Practice.fromJson(data.SecondPractice) : undefined;
    race.ThirdPractice = data.ThirdPractice ? Practice.fromJson(data.ThirdPractice) : undefined;
    race.Qualifying = data.Qualifying ? Practice.fromJson(data.Qualifying) : undefined;
    return race;
  }
}

export default Race;
