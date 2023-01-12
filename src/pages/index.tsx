import { Icon } from '../assets'
import { Input } from '../shared/Input'
import { Select } from '../shared/Select'

export default function Home () {
  return (
    <div className='bg-gray-900 h-screen flex justify-center pt-4'>
      <div className='w-80 pt-4'>
        <form className='flex flex-col gap-6'>
          <Input
            name='username'
            label='Username'
            LeftIcon={Icon.User}
            // error='Custom error message'
          />

          <Input
            type='password'
            name='password'
            label='Password'
            LeftIcon={Icon.Lock}
            RightIcon={Icon.EyeOpen}
            // error='Custom error message'
          />

          <Select
            label='Select User'
            labelSecondary='User'
            LeftIcon={Icon.Mail}
            // maxCharacters={10}
            // error='Custom error message'
          />
        </form>
      </div>
    </div>
  )
}
