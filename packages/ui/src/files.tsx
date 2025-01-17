/**
 * Adapted from: https://github.com/fuma-nama/fumadocs/blob/cff6273b7d66377877d3d9d5ef6b6fd4ac20bac3/packages/ui/src/components/files.tsx
 */
'use client'

import { cn } from '@tszhong0411/utils'
import { cva } from 'class-variance-authority'
import { FolderIcon, FolderOpenIcon } from 'lucide-react'
import { useState } from 'react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'
import { getIconByFilename } from './utils/get-icon-by-filename'

const item = cva(
  'hover:bg-accent hover:text-accent-foreground flex flex-row items-center gap-2 rounded-md px-2 py-1.5 text-sm'
)

type FilesProps = React.ComponentProps<'div'>

const Files = (props: FilesProps) => {
  const { children, className, ...rest } = props

  return (
    <div className={cn('not-prose bg-card rounded-lg border p-2', className)} {...rest}>
      {children}
    </div>
  )
}

type FileProps = {
  name: string
  icon?: React.ReactNode
} & React.ComponentProps<'div'>

const File = (props: FileProps) => {
  const { name, className, ...rest } = props

  const Icon = getIconByFilename(name)

  return (
    <div className={cn(item({ className }))} {...rest}>
      <Icon className='size-4' />
      {name}
    </div>
  )
}

type FolderProps = {
  name: string
  defaultOpen?: boolean
} & React.ComponentProps<'div'>

const Folder = (props: FolderProps) => {
  const { children, name, defaultOpen = false, ...rest } = props
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Collapsible open={open} onOpenChange={setOpen} {...rest}>
      <CollapsibleTrigger className={cn(item({ className: 'w-full' }))}>
        {open ? <FolderOpenIcon className='size-4' /> : <FolderIcon className='size-4' />}
        {name}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className='ml-2 flex flex-col border-l pl-2'>{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { File, Files, Folder }
