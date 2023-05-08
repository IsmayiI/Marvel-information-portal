import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup'

import style from './Search.module.css'
import { useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

const { input, form, label, wrapper, errorStyle, text, pageSearching, textTop } = style

const Search = ({ onSearchPage }) => {
   const [char, setChar] = useState(null)
   const { getName, clearError } = useMarvelService()

   const onCharLoaded = (char) => {
      setChar(char)
      onSearchPage(char)
   }


   const updateChar = (name) => {
      clearError()
      getName(name).then(onCharLoaded)
   }

   const messageNewPage = !char ? null : char.length > 0 ? <div className={pageSearching}>
      <p className={text} >There is! Visit Thor page?</p>
      <Link className='button button__main' to={`/character/${char[0].name}`}> <div className='inner'>To page</div></Link>
   </div> : <p className={textTop} >The character was not found. Check the name and try again</p>


   return (
      <Formik
         initialValues={{ charName: '' }}
         validationSchema={Yup.object({
            charName: Yup.string().required('This field is required')
         })}
         onSubmit={({ charName }) => {
            updateChar(charName)
         }} >
         <Form className={form}>
            <label className={label} htmlFor="charName">Or find a character by name:</label>
            <div className={wrapper}>
               <Field className={input} name="charName" id="charName" type="text" placeholder="Enter name" />
               <button type='submit' className='button button__main'>
                  <div className='inner'>Find</div>
               </button>
            </div>
            <FormikErrorMessage component="div" className={errorStyle} name="charName" />
            {messageNewPage}
         </Form>
      </Formik>
   )
}

export default Search