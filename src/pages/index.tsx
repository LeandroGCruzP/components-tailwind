import { Icon } from '../assets'
import { Button } from '../shared/Button'
import { Input } from '../shared/Input'

export default function Home () {
  return (
    <div className='bg-gray-900 h-screen flex justify-center pt-4'>
      <div className='w-60 pt-4'>
        <form className='flex flex-col gap-6'>
          <Input
            name='name'
            label='Name'
            LeftIcon={Icon.User}
            // error='Custom error message'
          />

          <Input
            type='email'
            name='email'
            label='Email'
            LeftIcon={Icon.Mail}
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

          <Button name='Create' />
        </form>
      </div>
    </div>
  )
}
