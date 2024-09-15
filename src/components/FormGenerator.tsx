import {
  FC,
  FocusEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { BaseFormField, FormData, HandleChangeParams } from '../types'
import { cn, generateFormDataList, validateField } from '../utils'
import { FormSubmitButton } from './FormSubmitButton'
import { InputList } from './InputList'

type FormGeneratorProps = {
  BaseFormFields: BaseFormField[]
  className?: string
}

export const FormGenerator: FC<FormGeneratorProps> = ({
  BaseFormFields,
  className,
}) => {
  const [formDataList, setFormDataList] = useState<FormData[]>([])
  const [isFormValid, setIsFormValid] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  useEffect(() => {
    const formDataList = generateFormDataList(BaseFormFields)
    setFormDataList(formDataList)
  }, [BaseFormFields])

  const handleChange = useCallback(
    ({
      id,
      event,
    }: HandleChangeParams<HTMLInputElement | HTMLSelectElement>): void => {
      const updatedValue = event.target.value.trim()
      const validatedBaseFormField = validateField({
        id,
        value: updatedValue,
        BaseFormFields,
        formDataList,
      })

      setFormDataList((prevValues: any) => {
        return prevValues.map((v: any) => {
          if (v.id === id) {
            return {
              ...v,
              ...validatedBaseFormField,
            }
          }

          return v
        })
      })
    },
    [BaseFormFields, formDataList],
  )

  const resetFormData = useCallback((): void => {
    setFormDataList((prevValues) => {
      return prevValues.map((field) => ({
        ...field,
        value: '',
        isValid: false,
        isTouched: false,
        errorMessage: '',
      }))
    })
  }, [])

  const checkIfFormValid = useCallback((formDataList: FormData[]): void => {
    const isValid = formDataList.every((field) => field.isValid)
    setIsFormValid(isValid)
  }, [])

  const handleOnBlur = useCallback(
    (e: FocusEvent<HTMLFormElement>) => {
      if (isSubmitting) return

      const id = parseInt(e.target.id, 10)
      const validatedField = validateField({
        id,
        BaseFormFields,
        formDataList,
      })

      setFormDataList((prevValues) => {
        return prevValues.map((v: any) => {
          if (v.id === id && !v.isTouched) {
            return validatedField
          }

          return v
        })
      })

      checkIfFormValid(formDataList)
    },
    [BaseFormFields, formDataList, isSubmitting, checkIfFormValid],
  )

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)

      setTimeout(() => {
        resetFormData()
        setIsSubmitting(false)
        alert('Form has been submitted')
      }, 1500)
    },
    [resetFormData],
  )

  return formDataList.length ? (
    <form
      className={cn('flex flex-col gap-6', className)}
      onBlur={handleOnBlur}
      onSubmit={handleSubmit}
    >
      <InputList
        BaseFormFields={BaseFormFields}
        handleChange={handleChange}
        formDataList={formDataList}
      />
      <FormSubmitButton
        title={isSubmitting ? 'Submitting form...' : 'Submit'}
        isDisabled={!isFormValid}
      />
    </form>
  ) : (
    <h2>Building form...</h2>
  )
}
