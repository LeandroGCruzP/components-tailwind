import { forwardRef, ForwardRefRenderFunction, useState } from 'react'
import { IconType } from 'react-icons'
import { GrClose } from 'react-icons/gr'
import { BiErrorCircle, BiCopy, BiUser, BiMailSend } from 'react-icons/bi'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock } from 'react-icons/ai'

const Icon = {
  User: BiUser,
  Mail: BiMailSend,
  EyeOpen: AiOutlineEye,
  EyeClose: AiOutlineEyeInvisible,
  Error: BiErrorCircle,
  Copy: BiCopy,
  Lock: AiOutlineLock,
  Close: GrClose
}

interface InputProps {
  label: string
  name: string
  LeftIcon?: IconType
  RightIcon?: IconType
  error?: string
  type?: 'text' | 'email' | 'password'
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, name, LeftIcon, RightIcon, error, type = 'text' },
  ref
) => {
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
                className={`
                  w-5
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
          />

          {!!RightIcon && (
            <div
              className={`
                flex items-center justify-center w-8 min-w-[2rem] h-10 rounded-r cursor-pointer border-y border-r bg-slate-50 text-stone-400
                ${isFilled || isFocused ? 'border-sky-500' : 'border-stone-200'}
                ${error && 'border-red-600'}
              `}
            >
              <RightIcon className='w-5 fill-stone-400' />
            </div>
          )}
        </div>

        <label
          htmlFor={name}
          className={`
            flex absolute cursor-text -translate-y-[2rem] transition
            ${LeftIcon && 'ml-[1.915rem]'}
            ${!LeftIcon && 'ml-2'}
            ${isFilled || isFocused ? `text-sky-500 -translate-y-[4rem] ${LeftIcon && '-translate-x-[1.45rem]'}` : 'text-stone-400'}
            ${error && 'text-red-600'}
          `}
        >
          {label}
        </label>
      </div>

      {!!error &&
        <div className='flex items-center gap-1'>
          <Icon.Error className='text-sm fill-red-600' />

          <label htmlFor={name} className='text-xs text-red-600'>
            {error}
          </label>
        </div>}
    </div>
  )
}

const Input = forwardRef(InputBase)

export function Form () {
  return (
    <div className='w-60 pt-4'>
      <form>
        <Input
          name='password'
          label='Password'
        />
      </form>
    </div>
  )
}
