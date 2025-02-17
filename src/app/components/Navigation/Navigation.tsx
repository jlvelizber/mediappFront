import React from 'react'
import Link from 'next/link'
import { navigation } from '@/app/routes/routes'
import { UserRoleEnum } from '@/app/Enums'
import { NavigationOption } from '@/app/intefaces'

interface NavigationProps {
  role: UserRoleEnum;
}

export const Navigation: React.FC<NavigationProps> = ({ role }) => {

  const menuRole = navigation.find((item) => item.role === role)

  if (!menuRole) return null

  const { options } = menuRole

  return (
    <ul className="space-y-4">
      {options.map(({ label, route, icon : Icon }: NavigationOption, index: number) => (
        <li key={index}>
          <Link className="flex items-center space-x-3 px-2 py-1 rounded-lg transition-all hover:bg-white/20 focus:bg-white/30" href={route}>
            {Icon && <Icon className='mr-1'/>} {label}
          </Link>
        </li>
      ))}
    </ul>
  )

}
