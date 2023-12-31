import Image from 'next/image'
import { getUserData } from '@/lib/user'
import { IPorto, ISkill, IUser } from '../../types'
import About from './components/About'
import HomePage from './components/Home'
import Skill from './components/skill'
import { getSkillData } from '@/lib/skill'
import { getPortoData } from '@/lib/porto'
import Portfolio from './components/portfolio'
import Contact from './components/Contact'
import Theme from './components/Theme'

export default async function Home() {
  const getUser = await getUserData()
  const user: IUser = getUser.data
  const getSkills = await getSkillData()
  const skills: ISkill[] = getSkills.data
  const getPortos = await getPortoData()
  const portos: IPorto[] = getPortos.data
  return (
    <main className="overflow-x-hidden lg:px-36">
      <HomePage user={user} />
      <About user={user} />
      <Skill skills={skills} />
      <Portfolio portofolios={portos} />
      <Contact user={user} />
      <Theme />
    </main>
  )
}
