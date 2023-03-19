import React from 'react';


function Footer(props) {
  const { children } = props
  // const { formated_text, text, title, show_template } = store;

  return (
    <div style={{ padding: '8px', position: 'fixed', bottom: '0', left: '0', right: '0' }}>

      {children}

    </div>
  );
}
export default Footer

