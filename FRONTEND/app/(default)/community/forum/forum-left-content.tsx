export default function ForumLeftContent() {
  return (
    <div className="w-full md:w-[15rem] mb-8 md:mb-0">
      <div className="md:sticky md:top-16 md:h-[calc(100dvh-64px)] md:overflow-x-hidden md:overflow-y-auto no-scrollbar">
        <div className="md:py-8">
          <div className="flex justify-between items-center md:block">
            {/* Title */}
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Forum ✨</h1>
            </header>

            {/* Button */}
            <div className="xl:hidden mb-6">
              <button className="btn md:w-full bg-indigo-500 hover:bg-indigo-600 text-white">Create Post</button>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-4 md:space-y-3 -mx-4">
            {/* Group 1 */}
            <div>
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-3 md:sr-only">Menu</div>
              <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
                <li className="mr-0.5 md:mr-0 md:mb-0.5">
                  <a className="flex items-center px-2.5 py-2 rounded whitespace-nowrap bg-white dark:bg-slate-800" href="#0">
                    <svg className="w-4 h-4 shrink-0 fill-current text-indigo-500 mr-2" viewBox="0 0 16 16">
                      <path d="M10 16h4c.6 0 1-.4 1-.998V6.016c0-.3-.1-.6-.4-.8L8.6.226c-.4-.3-.9-.3-1.3 0l-6 4.992c-.2.2-.3.5-.3.799v8.986C1 15.6 1.4 16 2 16h4c.6 0 1-.4 1-.998v-2.996h2v2.996c0 .599.4.998 1 .998Zm-4-5.99c-.6 0-1 .399-1 .998v2.995H3V6.515L8 2.32l5 4.194v7.488h-2v-2.995c0-.6-.4-.999-1-.999H6Z" />
                    </svg>
                    <span className="text-sm font-medium text-indigo-500">Home</span>
                  </a>
                </li>
                <li className="mr-0.5 md:mr-0 md:mb-0.5">
                  <a className="flex items-center px-2.5 py-2 rounded whitespace-nowrap" href="#0">
                    <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 mr-2" viewBox="0 0 16 16">
                      <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                    </svg>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Reading List</span>
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}