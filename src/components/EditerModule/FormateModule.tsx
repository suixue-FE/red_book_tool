import { Button, Dialog } from '@taroify/core';
import { useEffect, useState } from 'react';

export default function FormateModule(props) {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const close = () => {
        setIsModalVisible(false);
    }
    
    useEffect(() => {
        props?.onInit(setIsModalVisible); 
    }, []);
    
    return <Dialog open={isModalVisible} onClose={close}>
    <Dialog.Header>格式化文本</Dialog.Header>
    <Dialog.Content>代码是写出来给人看的，附带能在机器上运行</Dialog.Content>
    <Dialog.Actions>
      <Button onClick={() =>close()}>取消</Button>
      <Button onClick={() => close()}>确认</Button>
    </Dialog.Actions>
  </Dialog>
}