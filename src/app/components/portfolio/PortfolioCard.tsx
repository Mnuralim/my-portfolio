import { portfolioVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from 'react-scroll'
import NextLink from 'next/link'
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import DetailPorto from './DetailPorto'

interface Props {
  title: string
  imgUrl: string
  tools: string[]
  link: string
  description: string
  frontendCode: string
  backendCode: string
}

export default function PortfolioCard({ title, imgUrl, tools, link, backendCode, description, frontendCode }: Props) {
  return (
    <motion.div variants={portfolioVariant} className="bg w-full rounded-xl bg-slate-300/50 p-2 dark:bg-slate-700/50">
      <Image width={1000} height={1000} src={imgUrl} alt={title} className=" rounded-md" />
      <div className="my-3 px-2 ">
        <h3 className={`font-semibold text-slate-700 dark:text-slate-300 `}>{title}</h3>
      </div>
      <div className="my-3 flex gap-2 px-2">
        {tools.map((tool, index) => {
          return (
            <Image
              width={1000}
              height={1000}
              src={tool}
              alt={tool}
              key={index}
              className="h-6 w-6 min-w-6"
              loading="lazy"
            />
          )
        })}
      </div>
      <DrawerTrigger className="block bg-indigo-500 mx-auto mt-5 w-[95%] rounded-lg py-3 text-center text-white cursor-pointer">
        Detail
      </DrawerTrigger>
      <DrawerContent className="z-[1000] flex items-center justify-center">
        <DetailPorto
          backendCode={backendCode}
          description={description}
          frontendCode={frontendCode}
          link={link}
          title={title}
          tools={tools}
        />
      </DrawerContent>
      {/* {link == 'home' ? (
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
          rel="noreferrer"
          className={`block bg-indigo-500 mx-auto mt-5 w-[95%] rounded-lg py-3 text-center text-white cursor-pointer`}
        >
          Demo
        </Link>
      ) : (
        <NextLink
          href={link}
          className={`block bg-indigo-500 mx-auto mt-5 w-[95%] rounded-lg py-3 text-center text-white`}
          target="_blank"
        >
          Demo
        </NextLink>
      )} */}
    </motion.div>
  )
}
