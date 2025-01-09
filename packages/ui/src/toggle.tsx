'use client'

import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'class-variance-authority'

export const toggleVariants = cva(
  'hover:bg-muted hover:text-muted-foreground focus-visible:ring-ring data-[state=on]:bg-accent data-[state=on]:text-accent-foreground inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border-input hover:bg-accent hover:text-accent-foreground border bg-transparent shadow-sm'
      },
      size: {
        default: 'h-9 min-w-9 px-2',
        sm: 'h-8 min-w-8 px-1.5',
        lg: 'h-10 min-w-10 px-2.5'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>

export const Toggle = (props: ToggleProps) => {
  const { className, variant, size, ...rest } = props

  return (
    <TogglePrimitive.Root className={cn(toggleVariants({ variant, size, className }))} {...rest} />
  )
}