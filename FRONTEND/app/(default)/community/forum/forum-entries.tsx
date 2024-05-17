"use client"
import Link from 'next/link'
import Image from 'next/image'
import UserAvatar from '@/public/user-avatar-32.png'
import { useState } from 'react'

export default function ForumEntries({ entries }: any) {
  const [fklike, setFklike] = useState(0)
  return (
    <>
      {/* Post 1 */}
      <article className="bg-white dark:bg-slate-800 shadow-md rounded border border-slate-200 dark:border-slate-700 p-5">
        <div className="flex flex-start space-x-4">
          {/* Avatar */}
          <div className="shrink-0 mt-1.5">
            <Image className="w-8 h-8 rounded-full" src={UserAvatar} width={32} height={32} alt="User avatar" />
          </div>
          {/* Content */}
          <div className="grow">
            {/* Title */}
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              <Link href="/community/forum/post">{entries.title}</Link>
            </h2>
            {/* Footer */}
            <footer className="flex flex-wrap text-sm">
              <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
                <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.686 5.708 10.291.313c-.4-.4-.999-.4-1.399 0s-.4 1 0 1.399l.6.6-6.794 3.696-1-1C1.299 4.61.7 4.61.3 5.009c-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 14.001 2 15.4l3.696-3.697L9.692 15.7c.5.5 1.199.2 1.398 0 .4-.4.4-1 0-1.4l-.999-.998 3.697-6.695.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499Zm-7.193 6.095L4.196 7.507l6.695-3.697 1.298 1.299-3.696 6.694Z" />
                    </svg>
                    {entries.user}
                  </div>
                </a>
              </div>
              <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
                <span className="text-slate-500">{entries.date}</span>
              </div>
              <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
                <span className="text-slate-500">{entries.comments} Comments</span>
              </div>
            </footer>
          </div>
          {/* Upvote button */}
          <div className="shrink-0">
            <button onClick={() => setFklike(fklike + 1)} className="text-xs font-semibold text-center h-12 w-12 border border-indigo-400 rounded-sm flex flex-col justify-center items-center outline outline-2 outline-indigo-100 dark:outline-indigo-500/10">
              <svg className="inline-flex fill-indigo-500 mt-1.5 mb-1.5" width="12" height="6" xmlns="http://www.w3.org/2000/svg">
                <path d="m0 6 6-6 6 6z" />
              </svg>
              <div>{fklike}</div>
            </button>
          </div>
        </div>
      </article>

      

    </>
  )
}
