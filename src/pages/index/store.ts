import { makeAutoObservable, runInAction } from 'mobx';


class EmployeeResignStore {
  formated_text?: string = '';
  text: string = '1';
  constructor() {
    makeAutoObservable(this);
  }
  formatText(text: string) {
    this.formated_text = text
  }
}

export default new EmployeeResignStore();
