import { AnimatePresence, motion } from 'framer-motion'
import { cardVariant, containerVariant } from '@/utils/motion'
import { ISkill } from '../../../../types'
import Image from 'next/image'

interface Props {
  data: ISkill[]
  filter: string
}

export default function CardList({ data, filter }: Props) {
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="show"
      className="xl:px-18 mx-auto grid w-full grid-cols-2 gap-2 py-5 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4"
    >
      <AnimatePresence>
        {data.map(
          (d, index) =>
            d.type === filter && (
              <motion.div
                key={d._id}
                variants={cardVariant(index * 0.15)}
                className=" flex flex-col items-center justify-center rounded-md bg-slate-300/30 px-5 py-10 shadow-md dark:bg-slate-700/30 sm:py-14 md:py-20 group cursor-pointer"
              >
                <Image
                  src={d?.logo}
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="h-20 w-20 group-hover:scale-125 transform transition-all ease-in-out duration-300"
                  priority
                />
                <h1 className="mt-5 font-medium text-slate-500 dark:text-slate-300">{d.title}</h1>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </motion.div>
  )
}
