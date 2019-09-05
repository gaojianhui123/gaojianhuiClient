import {LienPersonnel} from './LienPersonnel';
import {HandlingPerson} from './HandlingPerson';

export class LienPersonnelTHDto extends LienPersonnel {
  lpId: string;
  bumen: string;
  tianbaoren: string;
  tianBaoTime: Date;
  renyuan = new Array<string>();
  thId: string;
  shenpiStatus: string;

  label: string;
  value: string;

}
