import { portfolioVariant } from '@/utils/motion'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from 'react-scroll'
import NextLink from 'next/link'

import { Button } from '@/components/ui/button'
import DetailPorto from './DetailPorto'
import { IPorto } from '../../../../types'

interface Props {
  porto: IPorto
  handleShowPorto: (porto: IPorto) => void
}

export default function PortfolioCard({ porto, handleShowPorto }: Props) {
  return (
    <motion.div
      variants={portfolioVariant}
      className="bg w-full flex flex-col justify-between rounded-xl bg-slate-300/50 p-2 dark:bg-slate-700/50"
    >
      <div>
        <Image
          width={1000}
          height={1000}
          src={porto.image}
          alt={porto.title}
          className="aspect-video w-full rounded-md"
        />
        <h3 className={`font-semibold text-slate-700 dark:text-slate-300 my-3 px-2  `}>{porto.title}</h3>
        <div className="my-3 flex flex-wrap gap-2 px-2">
          {porto.tools.map((tool, index) => {
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
      </div>

      <button
        onClick={() => handleShowPorto(porto)}
        className="block bg-indigo-500 mx-auto mt-5 w-[95%] rounded-lg py-3 text-center text-white cursor-pointer"
      >
        Detail
      </button>
    </motion.div>
  )
}
