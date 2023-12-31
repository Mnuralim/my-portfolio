'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PortfolioCard from './PortfolioCard'
import { IPorto } from '../../../../types'
import { portfolioContainerVariant } from '@/utils/motion'
import DetailPorto from './DetailPorto'

interface Props {
  portofolios: IPorto[]
}
export default function Portfolio({ portofolios }: Props) {
  const [showModal, setShowModal] = useState(false)
  const [selectPorto, setSelectPorto] = useState<IPorto | null>(null)

  const handleShowModal = (porto: IPorto) => {
    setSelectPorto(porto)
    setShowModal(true)
  }

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [showModal])

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
        {portofolios.map((portfolio) => {
          return <PortfolioCard key={portfolio.title} porto={portfolio} handleShowPorto={handleShowModal} />
        })}
      </motion.div>
      {showModal ? <DetailPorto porto={selectPorto as IPorto} setShowModal={setShowModal} /> : null}
    </section>
  )
}
