import Createpad from '@/components/createpad'
import Dialogcustom from '@/components/customdialog'
import Gridform from '@/components/gridform'
import Ratiocard from '@/components/ratiocard'
import { ViewIcon } from 'lucide-react'

export default function Page() {
  return (
    <div className='md:ml-20 md:mr-20 ml-10 mr-10'>
      <div className='flex flex-col gap-7'>
        <div className='w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          <Ratiocard className={'shadow-md shadow-blue-600'} value={''} helperText={''}>
            <ViewIcon />
          </Ratiocard>
          <Ratiocard className={'shadow-md shadow-blue-600'} value={''} helperText={''}>
            <ViewIcon />
          </Ratiocard>
          <Ratiocard className={'shadow-md shadow-blue-600'} value={''} helperText={''}>
            <ViewIcon />
          </Ratiocard>
          <Ratiocard className={'shadow-md shadow-blue-600'} value={''} helperText={''}>
            <ViewIcon />
          </Ratiocard>
        </div>
        <Dialogcustom child={<Createpad />} />
      </div>

      <Gridform/>
    </div>
  )
}
