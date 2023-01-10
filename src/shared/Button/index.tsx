import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
}

export function Button ({ name, ...rest }: ButtonProps) {
  return (
    <button
      className='
        w-full h-10 text-slate-50 bg-sky-500 rounded transition font-medium
        hover:bg-sky-400
      '
      {...rest}
    >
      {name}
    </button>
  )
}
