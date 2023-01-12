import { SubmitHandler, useForm } from 'react-hook-form'
import { Icon } from '../assets'
import { Button } from '../shared/Button'
import { Input } from '../shared/Input'
import { Select } from '../shared/Select'

export default function Home () {
  const { register, handleSubmit } = useForm()

  const onSubmit: SubmitHandler<any> = data => {
    console.log(data)
  }

  return (
    <div className='bg-gray-900 h-screen flex justify-center pt-4'>
      <div className='w-80 pt-4'>
        <form
          className='flex flex-col gap-6'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            idName='username'
            label='Username'
            LeftIcon={Icon.User}
            // error='Custom error message'
            {...register('username')}
          />

          <Input
            type='password'
            idName='password'
            label='Password'
            LeftIcon={Icon.Lock}
            RightIcon={Icon.EyeOpen}
            // error='Custom error message'
            {...register('password')}
          />

          <Select
            label='Select User'
            labelSecondary='User'
            LeftIcon={Icon.Mail}
            // maxCharacters={10}
            // error='Custom error message'
            {...register('user')}
          />

          <Button type='submit' name='Create' />
        </form>
      </div>
    </div>
  )
}
