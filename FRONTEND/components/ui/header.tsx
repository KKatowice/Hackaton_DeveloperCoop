'use client'

import { useContext, useState } from 'react'
import  {AppContext}  from '@/app/app-provider'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Notifications from '@/components/dropdown-notifications'
import ThemeToggle from '@/components/theme-toggle'
import DropdownProfile from '@/components/dropdown-profile'
import { useWalletClient, useAccount } from 'wagmi'
export default function Header() {

  const { sidebarOpen, setSidebarOpen, authenticated, username } = useContext(AppContext);
  
  console.log("yepyp",authenticated, username)
  const { data: walletClient } = useWalletClient()
  const useacc = useAccount()
  const addyUsr = useacc.address
  console.log("ao ??", addyUsr)
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false)
  //TODO fetch db for user infos
  return (
    <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => { setSidebarOpen(!sidebarOpen) }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <div>
{/*               <SearchModal isOpen={searchModalOpen} setIsOpen={setSearchModalOpen} />
 */}            </div>
            {/* <Notifications align="right" /> */}
            {/* <DropdownHelp align="right" /> */}
            {
              true ? <ConnectButton />:null
            }
            <ThemeToggle />
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            <DropdownProfile align="right" username={authenticated?username:undefined} avatar={authenticated?"fromAPI":undefined} />

          </div>

        </div>
      </div>
    </header>
  )
}
