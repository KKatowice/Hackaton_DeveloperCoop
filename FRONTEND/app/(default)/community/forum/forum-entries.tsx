import Link from 'next/link'
import Image from 'next/image'
import UserAvatar from '@/public/user-avatar-32.png'
import UserImage01 from '@/public/user-32-01.jpg'
import UserImage02 from '@/public/user-32-02.jpg'
import UserImage03 from '@/public/user-32-03.jpg'
import UserImage04 from '@/public/user-32-04.jpg'
import UserImage05 from '@/public/user-32-05.jpg'
import UserImage06 from '@/public/user-32-06.jpg'
import UserImage07 from '@/public/user-32-07.jpg'

export default function ForumEntries() {
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
              <Link href="/community/forum/post">Share Your Startup - December 2021 - Upvote This For Maximum Visibility!</Link>
            </h2>
            {/* Footer */}
            <footer className="flex flex-wrap text-sm">
              <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
                <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.686 5.708 10.291.313c-.4-.4-.999-.4-1.399 0s-.4 1 0 1.399l.6.6-6.794 3.696-1-1C1.299 4.61.7 4.61.3 5.009c-.4.4-.4 1 0 1.4l1.498 1.498 2.398 2.398L.6 14.001 2 15.4l3.696-3.697L9.692 15.7c.5.5 1.199.2 1.398 0 .4-.4.4-1 0-1.4l-.999-.998 3.697-6.695.6.6c.599.6 1.199.2 1.398 0 .3-.4.3-1.1-.1-1.499Zm-7.193 6.095L4.196 7.507l6.695-3.697 1.298 1.299-3.696 6.694Z" />
                    </svg>
                    ekuplu89
                  </div>
                </a>
              </div>
              <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
                <span className="text-slate-500">7d</span>
              </div>
              <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
                <span className="text-slate-500">688 Comments</span>
              </div>
            </footer>
          </div>
          {/* Upvote button */}
          <div className="shrink-0">
            <button className="text-xs font-semibold text-center h-12 w-12 border border-indigo-400 rounded-sm flex flex-col justify-center items-center outline outline-2 outline-indigo-100 dark:outline-indigo-500/10">
              <svg className="inline-flex fill-indigo-500 mt-1.5 mb-1.5" width="12" height="6" xmlns="http://www.w3.org/2000/svg">
                <path d="m0 6 6-6 6 6z" />
              </svg>
              <div>499</div>
            </button>
          </div>
        </div>
      </article>

      {/* Promoted post */}
      <article className="bg-amber-50 dark:bg-amber-400/10 shadow-md rounded border border-amber-300 dark:border-amber-400/50 p-5">
        <div className="flex flex-start space-x-4">
          {/* Avatar */}
          <div className="shrink-0 mt-1.5">
            <svg className="w-8 h-8 rounded-full" width={32} height={32} xmlns="http://www.w3.org/2000/svg">
              <path fill="#3B82F6" d="M0 0h32v32H0z" />
              <path
                d="M16.561 22c3.061 0 5.327-2.088 5.939-4.642h-3.449c-.367.69-1.04 1.5-2.449 1.5-1.612 0-2.694-1.216-2.694-2.858 0-1.622 1.082-2.94 2.694-2.858 1.408 0 2.082.81 2.449 1.581h3.429c-.572-2.757-3-4.723-6-4.723-3.388 0-5.98 2.676-5.98 5.98 0 3.344 2.633 6.02 6.061 6.02Z"
                fill="#EFF6FF"
                fillRule="nonzero"
              />
            </svg>
          </div>
          {/* Content */}
          <div className="grow">
            {/* Title */}
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              <Link href="/community/forum/post">
                💸 Trade crypto, fiat, and stablecoins with Crypto.io. Low fees and incredible performance!
              </Link>
            </h2>
            {/* Footer */}
            <footer className="flex flex-wrap text-sm">
              <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
                <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">
                  crypto.io
                </a>
              </div>
              <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
                <span className="text-slate-500 italic">Promoted</span>
              </div>
            </footer>
          </div>
        </div>
      </article>

    </>
  )
}
