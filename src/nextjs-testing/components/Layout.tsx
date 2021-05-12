import Head from 'next/head'
import Link from 'next/link'

interface TITLE {
  title: string
}

const Layout: React.FC<TITLE> = ({ children, title = 'Nextjs' }) => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen font-mono">
      <Head>
        <title>{title}</title>
      </Head>

      <header>
        {/* 上部のタブ */}
        <nav className="bg-gray-800 w-screen">
          {/* タブ全体の定義 */}
          <div className="flex items-center pl-8 h-14">
            {/* 各タブの定義 */}
            <div className="flex space-x-4">
              {/* Homeタブ */}
              <Link href="/">
                {/* index.tsx */}
                <a
                  data-testid="home-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Home
                </a>
              </Link>
              {/* Blogタブ */}
              <Link href="/blog-page">
                {/* blog-page.tsx */}
                <a
                  data-testid="blog-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Blog
                </a>
              </Link>
              {/* Commentタブ */}
              <Link href="/comment-page">
                {/* comment-page.tsx */}
                <a
                  data-testid="comment-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Comment
                </a>
              </Link>
              {/* Contextタブ */}
              <Link href="/context-page">
                {/* context-page.tsx */}
                <a
                  data-testid="context-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Context
                </a>
              </Link>
              {/* Todosタブ */}
              <Link href="/task-page">
                {/* task-page.tsx */}
                <a
                  data-testid="task-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Todos
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="flex flex-1 justify-center items-center flex-col w-screen">
        {children}
      </main>

      {/* footer */}
      <footer className="w-full h-12 flex justify-center items-center border-t">
        <a
          className="flex items-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powerd by
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  )
}

export default Layout
