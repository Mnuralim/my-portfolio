'use client'
import React from 'react'
import { motion } from 'framer-motion'
import PortfolioCard from './PortfolioCard'
import { IPorto } from '../../../../types'
import { portfolioContainerVariant } from '@/utils/motion'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

interface Props {
  portofolios: IPorto[]
}
export default function Portfolio({ portofolios }: Props) {
  return (
    <section className="relative mt-10 min-h-screen p-5 lg:px-16" id="portfolio">
      <h1 className="mt-10 mb-5 text-4xl font-bold text-center text-slate-700 lg:text-5xl  dark:text-slate-50">
        My <span className="text-indigo-500">Portfolio</span>
      </h1>
      <motion.div
        variants={portfolioContainerVariant}
        initial="hidden"
        whileInView="show"
        className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <Drawer>
          {portofolios.map((portfolio) => {
            return (
              <PortfolioCard
                key={portfolio.title}
                title={portfolio.title}
                imgUrl={portfolio.image}
                tools={portfolio.tools}
                link={portfolio.link}
                backendCode={portfolio.backendCode}
                frontendCode={portfolio.frontendCode}
                description={portfolio.description}
              />
            )
          })}
        </Drawer>
      </motion.div>
    </section>
  )
}
