'use client'

import { useFlyoutContext } from '@/app/flyout-context'
import Image from 'next/image'
import ProfileBg from '@/public/profile-bg.jpg'
import UserAvatar from '@/public/user-128-01.jpg'
import DragDrop from "@/components/utils/dragdrop"
import { useContext, useEffect, useState } from 'react'
import {publicClient} from "@/configzWeb3"
import { useWalletClient, useAccount } from 'wagmi'
import {
  useConnectModal
} from '@rainbow-me/rainbowkit';
//TODO PRENDI SE ADDRESS E' LOGGATO
const isAddy = true //test 

import  {AppContext}  from '@/app/app-provider'

export default function ProfileBody() {
    const { openConnectModal } = useConnectModal();
    const { data: walletClient } = useWalletClient()
    const useacc = useAccount()
    const addyUsr = useacc.address
  const { flyoutOpen, setFlyoutOpen } = useFlyoutContext();
  const [showDragDrop, setShowDragDrop] = useState(false);
  const [linkzImg, setLinkzImg] = useState("");
  const [avatar, setAvatar] = useState(UserAvatar);
  const [loadNft, setLoadNft] = useState(false)
  const [nftaddy, setNftAddy] = useState("")
  const [nftId, setNftId] = useState("")
  const { sidebarOpen, setSidebarOpen, authenticated, username } = useContext(AppContext);
useEffect(() => {
    //TODO prendi avatar da db
  })


  const contractAddress = '0x9AE63fBe78B7B6F3eA1F2c9428cb7446BBb1d634';
  const contractABI = [
    {
      name: 'mintAvatar',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'uri', type: 'string' },
      ],
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

useEffect(() => {
  getNft()
},[nftaddy,nftId])

  async function getNft() {
    
    if(!nftaddy || !nftId) return
    if (!addyUsr || !walletClient) { openConnectModal && openConnectModal(); return }
    try {
      const res = await publicClient.readContract({
        address: `0x${nftaddy.split("x")[1]}`,
        abi: contractABI,
        functionName: 'tokenURI',
        args: [nftId],
      });
      console.log(res)
      setLinkzImg(res as string)
      
    } catch (error) {
      console.error('Error minting avatar:', error);
    }
  }

  async function mintAvatar(uri: string) {
    if (!addyUsr || !walletClient) { openConnectModal && openConnectModal(); return }
    try {
      const res = await walletClient.writeContract({
          account: addyUsr,
          address: contractAddress,
          abi: contractABI,
          functionName: 'mintAvatar',
          args: [uri],
        
      });
  
    } catch (error) {
      console.error('Error minting avatar:', error);
    }
  }

  const handleAvatarClick = () => {
    setShowDragDrop(!showDragDrop);
  };

  return (
    <div
      className={`grow bg-white dark:bg-slate-900 flex flex-col md:translate-x-0 transition-transform duration-300 ease-in-out ${
        flyoutOpen ? 'translate-x-1/3' : 'translate-x-0'
      }`}
    >
      {/* Profile background */}
      <div className="relative h-56 bg-slate-200 dark:bg-slate-900">
        <Image className="object-cover h-full w-full" src={ProfileBg} width={979} height={220} alt="Profile background" />
        {/* Close button */}
        <button
          className="md:hidden absolute top-4 left-4 sm:left-6 text-white opacity-80 hover:opacity-100"
          onClick={() => setFlyoutOpen(!flyoutOpen)}
          aria-controls="profile-sidebar"
          aria-expanded={flyoutOpen}
        >
          <span className="sr-only">Close sidebar</span>
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="relative px-4 sm:px-6 pb-8">
        {/* Pre-header */}
        <div className="-mt-16 mb-6 sm:mb-3">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-end">
            {/* Avatar */}
            <div className="inline-flex -ml-1 -mt-1 mb-4 sm:mb-0">
        <Image
          className="rounded-full border-4 border-white dark:border-slate-900"
          src={avatar}
          width={128}
          height={128}
          alt="Avatar"
          onClick={handleAvatarClick}
        />
        
        {showDragDrop && (
          <div style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}} className='absolute ml-[15%] w-[45vw] h-[35vh] ml-3 flex justify-center items-center flex-col gap-1 border border-slate-200 dark:border-slate-700 w-[30%] h-[30%]'>
            <DragDrop setimg={setLinkzImg} avatar={true} />
            {isAddy ? 
              <button onClick={()=>mintAvatar(linkzImg)} className="mt-1 h-[15%] w-[25%] text-center ml-2 text-sm shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm">  
                <p className='gap-1'>Mint avatar</p>
              </button>
            :null
          }


          <div className='flex flex-row justify-center items-center mt-2'>
            <input className='ml-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-70 focus:bg-white dark:focus:bg-slate-800 placeholder-slate-500' type='checkbox' onClick={()=>setLoadNft(!loadNft)} />
            <label>Load NFT</label>
          </div>
          {loadNft ?     
          <div className='flex flex-col justify-center items-center'>

            <div className=' flex flex-row justify-center items-center w-[95%]'>
              <input className='w-[80%] h-[90%] border rounded-l-md bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-70 focus:bg-white dark:focus:bg-slate-800 placeholder-slate-500' onClick={()=>setNftAddy(nftaddy)} type='text' placeholder='NFT address' />
              <input className='w-[20%] h-[90%] border rounded-r-md bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-70 focus:bg-white dark:focus:bg-slate-800 placeholder-slate-500' onClick={()=>setNftId(nftId)} type='text' placeholder='NFT id'  />
            </div>
              <button className='mt-1 text-center ml-2 text-sm shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm'>Set Avatar</button>
          </div>
          :null}
          </div>
          
          
          
          
        )}
      </div>

            {/* Actions */}
            <div className="flex space-x-2 sm:mb-2">
              <button className="p-1.5 shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm">
                <svg className="w-4 h-1 fill-current text-slate-400" viewBox="0 0 16 4">
                  <circle cx="8" cy="2" r="2" />
                  <circle cx="2" cy="2" r="2" />
                  <circle cx={14} cy="2" r="2" />
                </svg>
              </button>
              <button className="p-1.5 shrink-0 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm">
                <svg className="w-4 h-4 fill-current text-indigo-500" viewBox="0 0 16 16">
                  <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7Zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8Z" />
                </svg>
              </button>
              <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg className="fill-current shrink-0" width="11" height="8" viewBox="0 0 11 8">
                  <path d="m.457 4.516.969-.99 2.516 2.481L9.266.702l.985.99-6.309 6.284z" />
                </svg>
                <span className="ml-2">Following</span>
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <header className="text-center sm:text-left mb-6">
          {/* Name */}
          <div className="inline-flex items-start mb-2">
            <h1 className="text-2xl text-slate-800 dark:text-slate-100 font-bold">{authenticated?username:""}</h1>
            <svg className="w-4 h-4 fill-current shrink-0 text-amber-500 ml-2" viewBox="0 0 16 16">
              <path d="M13 6a.75.75 0 0 1-.75-.75 1.5 1.5 0 0 0-1.5-1.5.75.75 0 1 1 0-1.5 1.5 1.5 0 0 0 1.5-1.5.75.75 0 1 1 1.5 0 1.5 1.5 0 0 0 1.5 1.5.75.75 0 1 1 0 1.5 1.5 1.5 0 0 0-1.5 1.5A.75.75 0 0 1 13 6ZM6 16a1 1 0 0 1-1-1 4 4 0 0 0-4-4 1 1 0 0 1 0-2 4 4 0 0 0 4-4 1 1 0 1 1 2 0 4 4 0 0 0 4 4 1 1 0 0 1 0 2 4 4 0 0 0-4 4 1 1 0 0 1-1 1Z" />
            </svg>
          </div>
          {/* Bio */}
          <div className="text-sm mb-3">{"fromAPI?"}</div>
          {/* Meta */}
          <div className="flex flex-wrap justify-center sm:justify-start space-x-4">
            
             <div className="flex items-center">
              <svg className="w-4 h-4 fill-current shrink-0 text-slate-400 dark:text-slate-500" viewBox="0 0 16 16">
                <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
              </svg>
              <a className="text-sm font-medium whitespace-nowrap text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 ml-2" href="#0">
                {username}
              </a>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="relative mb-6">
          <div className="absolute bottom-0 w-full h-px bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>
          <ul className="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
            <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
              <a className="block pb-3 text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500" href="#0">
                General
              </a>
            </li>
            <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
              <a className="block pb-3 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap">
                Connections
              </a>
            </li>
          </ul>
        </div>

        {/* Profile content */}
        <div className="flex flex-col xl:flex-row xl:space-x-16">
          {/* Main content */}
          <div className="flex-1 space-y-5 mb-8 xl:mb-0">
            {/* //About Me 
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 font-semibold mb-2">About Me</h2>
              <div className="text-sm space-y-2">
                <p>
                </p>
              </div>
            </div>*/}

            {/* Departments */}
            
            {/* Work History */}
            <div>
              <h2 className="text-slate-800 dark:text-slate-100 font-semibold mb-2">Posts</h2>
              <div className="bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 rounded-sm shadow-sm">
                <ul className="space-y-3">
                  {/* Item */}
                  {"fromAPI"}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="xl:min-w-[14rem] xl:w-[14rem] space-y-3">
            {/* <div className="text-sm">
              <h3 className="font-medium text-slate-800 dark:text-slate-100">Title</h3>
              <div>Senior Product Designer</div>
            </div>
            <div className="text-sm">
              <h3 className="font-medium text-slate-800 dark:text-slate-100">Location</h3>
              <div>Milan, IT - Remote</div>
            </div> */}
            
            {/*<div className="text-sm">
              <h3 className="font-medium text-slate-800 dark:text-slate-100">Joined Acme</h3>
              <div>7 April, 2017</div>
            </div> */}
          </aside>
        </div>
      </div>
    </div>
  )
}