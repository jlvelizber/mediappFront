import { NavigationOption } from '@/app/intefaces'
import { doctorNavigation } from '@/app/routes/routes'
import Link from 'next/link'
import React from 'react'

export const Navigation: React.FC = () => {

  return (
    <ul className="space-y-4">
      {doctorNavigation.map(({ label, route, icon : Icon }: NavigationOption, index: number) => (
        <li key={index}>
          <Link
            className={`
              flex items-center space-x-3 px-2 py-1 rounded-lg transition-all 
              hover:bg-white/20 focus:bg-white/30
              ${
                typeof window !== "undefined" && window.location.pathname === route
                  ? "bg-white/30 font-semibold"
                  : ""
              }
            `}
            href={route}
            aria-current={typeof window !== "undefined" && window.location.pathname === route ? "page" : undefined}
          >
            {Icon && <Icon className='mr-1'/>} {label}
          </Link>
        </li>
      ))}
    </ul>
  )

}
