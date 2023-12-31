import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getSkillData } from '@/lib/skill'
import { ISkill } from '../../../../types'
import DeleteButton from './components/DeleteButton'

export default async function TableDemo() {
  const getSkills = await getSkillData()
  const skills: ISkill[] = getSkills.data
  return (
    <section className="p-10">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl mb-5">List skills</h2>
        <Button asChild>
          <Link href="/admin/skill/create">Add Skill</Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your skills.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Logo</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills.map((skill) => (
            <TableRow key={skill._id}>
              <TableCell className="font-medium">{skill.title}</TableCell>
              <TableCell>{skill.type}</TableCell>
              <TableCell>{skill.logo}</TableCell>
              <TableCell className="flex items-center gap-3">
                <Button asChild variant="secondary" className="bg-sky-700">
                  <Link href={`/admin/skill/${skill._id}`}>Detail</Link>
                </Button>
                <DeleteButton id={skill._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
