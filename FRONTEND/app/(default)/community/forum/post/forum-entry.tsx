import Link from 'next/link'
import Image from 'next/image'
import UserAvatar from '@/public/user-40-02.jpg'
import UserImage01 from '@/public/user-28-01.jpg'
import UserImage02 from '@/public/user-28-02.jpg'
import UserImage05 from '@/public/user-28-05.jpg'
import UserImage09 from '@/public/user-28-09.jpg'
import UserImage10 from '@/public/user-28-10.jpg'

export default function ForumEntry() {
  return (
    <article className="bg-white dark:bg-slate-800 shadow-md rounded border border-slate-200 dark:border-slate-700 p-5">
      {/* Breadcrumbs */}
      <div className="mb-2">
        <ul className="inline-flex flex-wrap text-sm font-medium">
          <li className="flex items-center">
            <Link className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-500" href="/community/forum">
              Home
            </Link>
            <svg className="h-4 w-4 fill-current text-slate-400 dark:text-slate-500 mx-2" viewBox="0 0 16 16">
              <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
            </svg>
          </li>
          <li className="flex items-center">
            <a className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-500" href="#0">
              Discussione
            </a>
          </li>
        </ul>
      </div>
      {/* Header */}
      <header className="pb-4">
        {/* Title */}
        <div className="flex items-start space-x-3 mb-3">
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold">{/* TITOLO DEL POST */}</h2>
          {/* Upvote button */}
          <div className="shrink-0">
            <button className="text-xs font-semibold text-center h-12 w-12 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-sm flex flex-col justify-center items-center">
              <svg className="inline-flex fill-slate-400 dark:fill-slate-500 mt-1.5 mb-1.5" width="12" height="6" xmlns="http://www.w3.org/2000/svg">
                <path d="m0 6 6-6 6 6z" />
              </svg>
              <div>{/* NUMERO DI LIKE DEL POST */}</div>
            </button>
          </div>
        </div>
        {/* Meta */}
        <div className="flex flex-wrap text-sm">
          <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
            <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">
              {/* NOME UTENTE */}
            </a>
          </div>
          <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
            <span className="text-slate-500">{/* TIMESTAMP */}</span>
          </div>
          <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
            <span className="text-slate-500">{/* NUMERO COMMENTI */}</span>
          </div>
        </div>
      </header>
      {/* Content */}
      <div className="space-y-4 mb-6">
        {/* CONTENUTO DEL POST */}
      </div>
      {/* Comment form */}
      <div>
        <div className="flex items-start space-x-3 mb-3">
          <Image className="rounded-full shrink-0" src={UserAvatar} width={40} height={40} alt="User 02" />
          <div className="grow">
            <label htmlFor="comment" className="sr-only">
              Write a comment…
            </label>
            <textarea
              id="comment"
              className="form-textarea w-full focus:border-slate-300"
              rows={4}
              placeholder="Scrivi un commento..."
              defaultValue={''}
            />
          </div>
        </div>
        <div className="text-right">
          <button type="submit" className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">
            Pubblica -&gt;
          </button>
        </div>
      </div>
      {/* Comments */}
      <div className="mt-4">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Commenti</h3>
        <ul className="space-y-5">
          {/* Comment */}
          <li className="relative pl-9 space-y-5">
            {/* Comment wrapper */}
            <div className="flex items-start">
              {/* Comment upvote */}
              <div className="absolute top-0 left-0">
                <button className="text-xs font-semibold text-left w-6 rounded-sm flex flex-col justify-center items-center text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-500">
                  <svg className="inline-flex fill-slate-400 dark:fill-slate-500 mt-1.5 mb-1.5" width="12" height="6" xmlns="http://www.w3.org/2000/svg">
                    <path d="m0 6 6-6 6 6z" />
                  </svg>
                  <div>44</div>
                </button>
              </div>
              {/* Comment content */}
              <div>
                {/* Comment text */}
                <div className="grow text-sm text-slate-800 dark:text-slate-100 space-y-2 mb-2">
                  <p>Testo del commento</p>
                </div>
                {/* Comment footer */}
                <div className="flex flex-wrap text-xs">
                  <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
                    <a className="block mr-2" href="#0">
                      <Image className="rounded-full" src={UserImage02} width={24} height={24} alt="User 02" />
                    </a>
                    <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">
                      Nome utente qui
                    </a>
                  </div>
                  <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
                    <a className="font-medium text-slate-500 hover:text-slate-600 dark:hover:text-slate-400" href="#0">
                      Rispondi
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Nested comments */}
            <ul className="space-y-5">
              {/* Comment */}
              <li className="relative pl-9 space-y-5">
                {/* Comment wrapper */}
                <div className="flex items-start">
                  {/* Comment upvote */}
                  <div className="absolute top-0 left-0">
                    <button className="text-xs font-semibold text-left w-6 rounded-sm flex flex-col justify-center items-center text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-500">
                      <svg className="inline-flex fill-slate-400 dark:fill-slate-500 mt-1.5 mb-1.5" width="12" height="6" xmlns="http://www.w3.org/2000/svg">
                        <path d="m0 6 6-6 6 6z" />
                      </svg>
                      <div>2</div>
                    </button>
                  </div>
                  {/* Comment content */}
                  <div>
                    {/* Comment text */}
                    <div className="grow text-sm text-slate-800 dark:text-slate-100 space-y-2 mb-2">
                      <p>
                        Testo della risposta
                      </p>
                    </div>
                    {/* Comment footer */}
                    <div className="flex flex-wrap text-xs">
                      <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
                        <a className="block mr-2" href="#0">
                          <Image className="rounded-full" src={UserImage05} width={24} height={24} alt="User 05" />
                        </a>
                        <a className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="#0">
                          Nome utente qui
                        </a>
                      </div>
                      <div className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 dark:after:text-slate-600 after:px-2">
                        <a className="font-medium text-slate-500 hover:text-slate-600 dark:hover:text-slate-400" href="#0">
                          Rispondi
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        {/* View more link */}
        <div className="text-center mt-5">
          <button className="text-sm font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">Carica più commenti</button>
        </div>
      </div>
    </article>
  )
}
