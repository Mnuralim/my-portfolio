import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Header from './components/navigation/Header'
import Footer from './components/Footer'
import { getUserData } from '@/lib/user'
import { IUser } from '../../types'
import { ThemeContextProvider } from '../../context/theme'

const monstserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Muhamad Nur | Portfolio',
  description: 'My Portfolio website',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const getUser = await getUserData()
  const user: IUser = getUser.data
  return (
    <html lang="en">
      <body className={`${monstserrat.className} scroll-smooth bg-slate-50 dark:bg-slate-800 dark:text-slate-50`}>
        <ThemeContextProvider>
          <Header />
          <section className="relative">
            <div className="fixed bg-blue-400 rounded-full opacity-50 top-10 left-4 h-72 w-72 blur-3xl filter md:h-96 md:w-96"></div>
            <div className="fixed right-0 bg-yellow-200 rounded-full opacity-30 top-10 h-72 w-72 blur-3xl filter md:h-96 md:w-96"></div>
            <div
              className={`fixed top-96 right-20 h-72 w-72 md:h-96  md:w-96 bg-indigo-500 rounded-full  opacity-50 blur-3xl filter`}
            ></div>
          </section>
          {children}
          <Footer user={user} />
        </ThemeContextProvider>
      </body>
    </html>
  )
}
