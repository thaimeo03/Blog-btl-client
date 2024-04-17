import { ClassNameValue, twMerge } from 'tailwind-merge'
import { UseFormRegisterReturn, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn<any>
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  classCustom?: ClassNameValue
}

export default function Input({ classCustom, register, errors, ...rest }: InputProps) {
  return (
    <div className='relative'>
      <input
        className={twMerge(
          'text-sm sm:text-base placeholder-gray-500 pr-4 pl-2 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 dark:bg-white dark:text-black dark:focus:bg-slate-100',
          classCustom
        )}
        {...rest}
        {...register}
      />
      <span>
        {errors && (
          <span className='absolute bottom-0 left-0 translate-y-full text-xs text-red-600 w-full first-letter:uppercase'>
            {errors.message as string}
          </span>
        )}
      </span>
    </div>
  )
}
