import React from 'react';
import { Button } from "@taroify/core"


function IconButton(props) {
  const { icon, children, ...rest } = props
  // const { formated_text, text, title, show_template } = store;

  return (
    <Button variant="text" color="default" {...rest}>
      <div>
        <p style={{ marginBottom: '4px' }}>{icon}</p>
        {children}
      </div>
    </Button>
  );
}
export default IconButton

