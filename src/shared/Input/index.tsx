import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes, useState } from 'react'
import { IconType } from 'react-icons'
import { Icon } from '../../assets'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password'
  label: string
  name: string
  LeftIcon?: IconType
  RightIcon?: IconType
  error?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const { label, name, LeftIcon, RightIcon, error, type = 'text', ...rest } = props

  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  function handleInputFocus () {
    setIsFocused(true)
  }

  function handleInputBlur () {
    setIsFocused(false)
    setIsFilled(!!value)
  }

  return (
    <div className='flex flex-col gap-2'>
      <div>
        <div className='flex'>
          {!!LeftIcon && (
            <div
              className={`
                flex items-center justify-end w-6 min-w-[1.5rem] h-10 rounded-l cursor-text border-y border-l bg-slate-50 text-stone-400
                ${isFocused || isFilled ? 'border-sky-500' : 'border-stone-200'}
                ${error && 'border-red-600'}
              `}
            >
              <LeftIcon
                size={20}
                className={`
                  ${isFocused || isFilled ? 'fill-sky-500' : 'fill-stone-400'}
                  ${error && 'fill-red-600'}
                `}
              />
            </div>
          )}

          <input
            id={name}
            name={name}
            type={type}
            autoComplete='off'
            className={`
              w-full h-10 px-2 outline-none text-gray-900 bg-slate-50
              ${LeftIcon && !RightIcon && 'border-y border-r rounded-r'}
              ${RightIcon && !LeftIcon && 'border-y border-l rounded-l'}
              ${!LeftIcon && !RightIcon && 'border rounded'}
              ${LeftIcon && RightIcon && 'border-y rounded-none'}
              ${isFilled || isFocused ? 'border-sky-500' : 'border-stone-200'}
              ${error && 'border-red-600'}
            `}
            onChange={e => setValue(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            ref={ref}
            {...rest}
          />

          {!!RightIcon && (
            <div
              className={`
                flex items-center justify-center w-8 min-w-[2rem] h-10 rounded-r cursor-pointer border-y border-r bg-slate-50 text-stone-400
                ${isFilled || isFocused ? 'border-sky-500' : 'border-stone-200'}
                ${error && 'border-red-600'}
              `}
            >
              <RightIcon size={20} className='fill-stone-400' />
            </div>
          )}
        </div>

        <label
          htmlFor={name}
          className={`
            flex absolute cursor-text -translate-y-[2rem] transition
            ${LeftIcon && 'ml-[1.915rem]'}
            ${!LeftIcon && 'ml-2'}
            ${isFilled || isFocused
              ? `text-sky-500 -translate-y-[4rem] ${LeftIcon && '-translate-x-[1.45rem]'}`
              : 'text-stone-400'}
            ${error && 'text-red-600'}
          `}
        >
          {label}
        </label>
      </div>

      {!!error &&
        <div className='flex items-center gap-1'>
          <Icon.Error size={15} className='fill-red-600' />

          <label htmlFor={name} className='text-xs text-red-600'>
            {error}
          </label>
        </div>}
    </div>
  )
}

export const Input = forwardRef(InputBase)
