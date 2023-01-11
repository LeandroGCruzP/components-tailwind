import { useMemo, useRef, useState } from 'react'
import { IconType } from 'react-icons'
import { Icon } from '../../assets'

const users = [
  { id: 1, name: 'Leandro Cruz' },
  { id: 2, name: 'Alexandra Laroca' },
  { id: 3, name: 'Jordani Laroca' },
  { id: 4, name: 'Jaqueline Laroca' },
  { id: 5, name: 'Adriele Laroca' },
  { id: 6, name: 'Kevin Cruz' },
  { id: 7, name: 'Jonathan Cruz' },
  { id: 8, name: 'Sandro Cruz' },
  { id: 9, name: 'Samuel Cruz Lobo' },
  { id: 10, name: 'Mirela Cruz' }
]

interface SelectProps {
  label: string
  labelSecondary: string
  LeftIcon?: IconType
  error?: string
  maxCharacters?: number
}

export function Select ({ label, labelSecondary, error, LeftIcon, maxCharacters = 25 }: SelectProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [inputSearch, setInputSearch] = useState('')
  const [selected, setSelected] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const inputSearchRef = useRef<HTMLInputElement>(null)

  function toggleOpenSelect () {
    if (isOpen === false) {
      inputSearchRef.current?.focus()

      setIsOpen(true)
    } else {
      setIsOpen(false)
      setInputSearch('')
    }
  }

  function handleInputFocus () {
    setIsFocused(true)
  }

  function handleInputBlur () {
    setIsFocused(false)
  }

  const usersFiltered = useMemo(() => {
    const lowerSearch = inputSearch.toLowerCase()

    return users.filter(user => user.name.toLowerCase().includes(lowerSearch))
  }, [inputSearch])

  return (
    <div className='w-full relative text-stone-400'>
      <div className='cursor-pointer' onClick={toggleOpenSelect}>
        <div className='flex'>
          {!!LeftIcon && (
            <div
              className={`
                flex items-center justify-end w-6 min-w-[1.5rem] h-10 rounded-l border-y border-l bg-slate-50 text-stone-400
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

          <div
            className={`
              w-full h-10 px-2 outline-none text-gray-900 bg-slate-50
              ${LeftIcon && 'border-y'}
              ${!LeftIcon && 'border-y border-l rounded-l'}
              ${isFilled || isFocused ? 'border-sky-500' : 'border-stone-200'}
              ${error && 'border-red-600'}
            `}
          />

          <div
            className={`
              flex items-center justify-center w-8 min-w-[2rem] h-10 rounded-r cursor-pointer border-y border-r bg-slate-50 text-stone-400
              ${isFilled || isFocused ? 'border-sky-500' : 'border-stone-200'}
              ${error && 'border-red-600'}
            `}
          >
            <Icon.ChevronDown
              size={20}
              className={`
                transition
                ${isOpen && 'rotate-180'}
                ${isFocused || isFilled ? 'fill-sky-500' : 'fill-stone-400'}
              `}
            />
          </div>
        </div>

        <div className='flex absolute -translate-y-[2rem] cursor-pointer'>
          <label
            className={`
              transition
              ${LeftIcon && 'ml-[1.915rem]'}
              ${!LeftIcon && 'ml-2'}
              ${isFilled || isFocused
                ? `text-sky-500 -translate-y-[2rem] ${LeftIcon && '-translate-x-[1.45rem]'}`
                : 'text-stone-400'}
              ${error && 'text-red-600'}
            `}
          >
            {!isFocused && isFilled && labelSecondary}
            {isFocused && !isFilled && label}
            {!isFocused && !isFilled && label}
            {isFocused && isFilled && labelSecondary}
          </label>

          {selected && (
            <label className='transition cursor-pointer text-gray-900 -translate-x-8'>
              {selected.length > maxCharacters ? selected.substring(0, maxCharacters) + '...' : selected}
            </label>
          )}
        </div>
      </div>

      <ul
        className={`
          bg-slate-50 overflow-y-auto overflow-x-hidden mt-2 absolute w-full rounded border z-50
          ${isFocused || isFilled ? 'border-sky-500' : 'border-stone-200'}
          ${isOpen ? 'max-h-60' : 'max-h-0 border-0'}
        `}
      >
        <div className='flex items-center px-2 sticky top-0 bg-white'>
          <Icon.Search
            size={18}
            className={`
              ${isFocused ? 'fill-sky-500' : 'fill-stone-400'}
            `}
          />

          <input
            type='text'
            value={inputSearch}
            placeholder='Search person by name'
            className='text-gray-900 placeholder:text-stone-400 w-full p-2 outline-none'
            onChange={e => setInputSearch(e.target.value)}
            ref={inputSearchRef}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>

        {usersFiltered.map(user => (
          <li
            key={user.id}
            className={`
              p-2 text-sm cursor-pointer text-gray-900
              hover:bg-sky-500 hover:text-white
              ${user.name.toLowerCase() === selected.toLowerCase() && 'bg-sky-500 text-white'}
            `}
            onClick={() => {
              if (user.name.toLowerCase() !== selected.toLowerCase()) {
                setSelected(user.name)
                setIsOpen(false)
                setIsFilled(true)
                setInputSearch('')
              }
            }}
          >
            {user.name}
          </li>
        ))}
      </ul>

      {!!error &&
        <div className='flex items-center gap-1 mt-2'>
          <Icon.Error size={15} className='fill-red-600' />

          <label className='text-xs text-red-600'>
            {error}
          </label>
        </div>}
    </div>
  )
}
