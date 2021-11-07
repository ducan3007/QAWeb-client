import React from 'react'


import TagsInput from 'react-tagsinput'


import styles from './tag-input.module.css'

const FormInput = ({
  label,
  inputInfo,
  hasError = false,
  errorMessage,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      {inputInfo && <p className={styles.inputInfo}>{inputInfo}</p>}
      <div className={styles.inputContainer}>
        <TagsInput
          onlyUnique
          className='react-tagsinput'
          focusedClassName={styles.inputFocused}
          {...props}
        />
      </div>
    </div>
  )
}

export default FormInput
