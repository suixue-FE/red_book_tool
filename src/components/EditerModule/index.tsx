import FormateModule from './FormateModule';
import ModalMenu from "./baseModalMenu";

// Extend menu
// export default class ModalMenu extends BaseModalMenu {
//     constructor() {
//         super();
//     }


// }

export const FormateModalMenuConf = {
    key: 'FormateModalMenu',
    factory() {
        return new ModalMenu()
    }
}