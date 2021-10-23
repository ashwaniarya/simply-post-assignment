import React from 'react'


const Box = ({ children, className, ...rest  }) => {
  
    return <div className={className} {...rest}>
        {children}
    </div>
}

export default Box