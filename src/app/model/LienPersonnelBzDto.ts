import {LienPersonnel} from './LienPersonnel';

export  class  LienPersonnelBzDto extends LienPersonnel {
  lpId: string;
  bumen: string;
  chengbanbumen: string;
  tianBaoTime: Date;
  matter: string;
  apply: string;
  applyStatus: string;
  remark: string;
  bzId: string;
}
