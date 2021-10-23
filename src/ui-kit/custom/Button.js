import React from 'react'
import { flattenStyle } from 'utils';
import styles from './ui.module.css'

const variant = {
  primary: styles.buttonPrimary,
  rounded: styles.buttonRounded
}


const Button = ({ type = '', rounded, children, className = '', ...rest  }) => {

    let extraClassName = ''; 
    
    extraClassName = extraClassName + rounded ? ' '+variant['rounded'] : '';
    const typeClassName = variant[type] ? ` ${variant[type]}`: ''
    extraClassName = extraClassName+typeClassName
    const classFromRoot = className ? ' ' + className : ''
    extraClassName = extraClassName + classFromRoot

    return <button className={flattenStyle([styles.button+extraClassName])} {...rest}>
        {children}
    </button>
}

export default Button