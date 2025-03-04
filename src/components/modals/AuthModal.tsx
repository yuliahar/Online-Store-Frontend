'use client'
import Button from '@/components/ui/Button'
import { useState, useEffect } from 'react'
import LoginForm from './forms/LoginForm'
import RegistrationForm from './forms/RegistrationForm'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type LoginModalProps = {
  onCloseModal?: () => void
}

enum SwitchType {
  Login = 'LOGIN',
  Registration = 'REGISTRATION',
}

export function AuthModal({ onCloseModal }: Readonly<LoginModalProps>) {
  const [switchForm, setSwitchForm] = useState<SwitchType>(SwitchType.Login)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [pathname])

  if (pathname === '/') return null

  const handleClickSwitchFrom = () => {
    setSwitchForm(
      switchForm === SwitchType.Login
        ? SwitchType.Registration
        : SwitchType.Login,
    )
  }

  return (
    <div className={'fixed bottom-0 right-0 top-14 z-30 flex w-full sm:top-24'}>
      <Link
        href="/"
        className={'grow-0 bg-gray-500 bg-opacity-75 min-[440px]:grow'}
        onClick={onCloseModal}
      ></Link>
      <div className="flex h-full w-full flex-col overflow-y-scroll bg-white py-6 shadow-xl min-[440px]:w-[500px]">
        <div className="px-4 sm:px-6">
          <h2 className="text-4XL">Welcome back</h2>
        </div>
        <div className="relative flex-1 px-4 sm:px-6">
          {switchForm === SwitchType.Login ? (
            <LoginForm />
          ) : (
            <Link href="/auth/login">
              <Button
                onClick={handleClickSwitchFrom}
                className="mt-6 w-full hover:bg-brand-solid-hover"
              >
                Login
              </Button>
            </Link>
          )}
          {switchForm === SwitchType.Login && (
            <Link href="/" className="flex items-center justify-center">
              <Button className="mt-6 bg-transparent text-focus">
                Forgot password
              </Button>
            </Link>
          )}
          <div className="mb-8 mt-6 h-[1px] w-full bg-brand-second" />
          {switchForm === SwitchType.Registration ? (
            <RegistrationForm />
          ) : (
            <>
              <h2 className="text-4XL">I’m new here</h2>
              <Link href="/auth/registration">
                <Button
                  onClick={handleClickSwitchFrom}
                  className="mt-6 w-full hover:bg-brand-solid-hover"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
          {switchForm === SwitchType.Registration && (
            <p className="text-text-tertiary mt-4 text-xs font-medium">
              By registering for an account, you agree to our{' '}
              <a
                className="text-text-tertiary text-xs font-medium underline"
                href="/"
              >
                Terms of Use.
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
