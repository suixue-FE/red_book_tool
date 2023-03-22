import { makeAutoObservable, runInAction } from 'mobx';
import MintFilter from 'mint-filter'
import sensitive from '@static/sensitive.json'


class EmployeeResignStore {
  formated_text?: string = '';
  text: string = '';
  title: string = '';
  show_template: boolean = false;
  constructor() {
    makeAutoObservable(this);

  }
  formatText(text: string) {
    this.text = text
  }

}

export const normal_mint = new MintFilter(sensitive.normal)
export const makeups_mint = new MintFilter(sensitive.makeups)
export const medical_mint = new MintFilter(sensitive.medical)

export default new EmployeeResignStore();

