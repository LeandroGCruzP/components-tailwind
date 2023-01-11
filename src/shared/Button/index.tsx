import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
  variant?: 'filled' | 'outline'
}

export function Button ({ name, variant = 'filled', ...rest }: ButtonProps) {
  return (
    <button
      className={`
        w-full h-10 text-slate-50 rounded transition font-medium
        hover:brightness-110
        ${variant === 'filled' && 'bg-sky-500'}
        ${variant === 'outline' && 'border border-sky-500 text-sky-500'}
      `}
      {...rest}
    >
      {name}
    </button>
  )
}
