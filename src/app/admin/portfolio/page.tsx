import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getPortoData } from '@/lib/porto'
import { IPorto } from '../../../../types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DeleteButton from './components/DeleteButton'

export default async function TableDemo() {
  const getPortos = await getPortoData()
  const portos: IPorto[] = getPortos.data
  return (
    <section className="p-10">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-xl mb-5">List portfolio</h2>
        <Button asChild>
          <Link href="/admin/portfolio/create">Add portfolio</Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your portfolio.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {portos.map((porto) => (
            <TableRow key={porto._id}>
              <TableCell className="font-medium">{porto.title}</TableCell>
              <TableCell>{porto.link}</TableCell>
              <TableCell>{porto.description}</TableCell>
              <TableCell className="flex items-center gap-3">
                <Button asChild variant="secondary" className="bg-sky-700">
                  <Link href={`/admin/portfolio/${porto._id}`}>Detail</Link>
                </Button>
                <DeleteButton id={porto._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
