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
    <ul>
      {options.map((item: NavigationOption, index: number) => (
        <li key={index}><Link href={item.route}> {item.label}</Link> </li>
      ))}
    </ul>
  )

}
