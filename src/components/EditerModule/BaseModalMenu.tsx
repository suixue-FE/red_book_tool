import ReactDOM from "react-dom/client";
import FormateModule from "./FormateModule";

export default class ModalMenu {
    id: string = `modal-${Math.random().toString(36).slice(2)}`
    title: string
    tag: string
    $ele: HTMLDivElement;
    $root: any
    ifInit: boolean = false;
    controlShow: (i: boolean) => void = Function.prototype as any;
    
    constructor() {
        this.title = 'My Modal';
        // this.iconSvg = '<svg >...</svg>'; icon
        this.tag = 'button';
        this.$ele = document.createElement('div');
        this.$ele.id = this.id;
        document.body.appendChild(this.$ele);
        this.$root = ReactDOM.createRoot(this.$ele!);
    }

    modalInit = (method) => {

        // 这里把控制react的方法透出
        this.controlShow = method;
    }


    isActive(editor) {
        return false // or false
    }

    isDisabled(editor) {
        return false // or true
    }
    getValue(editor) {
        return <FormateModule onInit={this.modalInit} editor={editor} />
    }
    
    exec(editor, value) {

        if (this.ifInit) {
            this.controlShow(true);
            return;
        }
        // editor.insertText(value)
        this.$root.render(
            value,
        );
        this.ifInit = true;
    }
}