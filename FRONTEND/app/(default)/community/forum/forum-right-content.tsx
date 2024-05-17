import Image from 'next/image'
import UserImage01 from '@/public/avatar-01.jpg'
import UserImage02 from '@/public/avatar-02.jpg'
import UserImage03 from '@/public/avatar-03.jpg'
import UserImage04 from '@/public/avatar-04.jpg'
import UserImage05 from '@/public/avatar-05.jpg'
import UserImage06 from '@/public/avatar-06.jpg'

export default function ForumRightContent() {
/*                       I built and sold 2 small SaaS products and quit my job in the last two years — AMA
 markusj
2d   312
*/
  let story = (titl:string,usr:string,old:number,commnt:number)=>{
    return(
                <li>
                  <div className="text-sm mb-1">
                    <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">
                      {titl}
                    </a>
                  </div>
                  <div className="text-xs text-slate-500">
                    <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">
                      {usr}
                    </a>{' '}
                    · {old} · {commnt} comments
                  </div>
                </li>
    )
  }


  return (
    <div className="w-full hidden xl:block xl:w-[18rem]">
      <div className="lg:sticky lg:top-16 lg:h-[calc(100dvh-64px)] lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar">
        <div className="md:py-8">
          {/* Button */}
          <div className="mb-6">
            <button className="btn w-full bg-indigo-500 hover:bg-indigo-600 text-white">Create Post</button>
          </div>

          {/* Blocks */}
          <div className="space-y-4">
            
          </div>
        </div>
      </div>
    </div>
  )
}