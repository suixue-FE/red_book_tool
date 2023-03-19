import { makeAutoObservable, runInAction } from 'mobx';


class EmployeeResignStore {
  formated_text?: string = '';
  text: string = '';
  title: string = ''
  constructor() {
    makeAutoObservable(this);
  }
  formatText(text: string) {
    this.text = text
  }
}

export default new EmployeeResignStore();
