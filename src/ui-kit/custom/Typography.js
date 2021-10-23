import React from 'react'

const Typography = ({ type, className, children, ...rest}) => {    
    const CustomTag = `${type}`;
    return <CustomTag children={children} className={className} {...rest}></CustomTag>
}

export default Typography