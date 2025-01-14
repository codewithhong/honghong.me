'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '@tszhong0411/utils'
import { type VariantProps } from 'class-variance-authority'
import { createContext, useContext } from 'react'

import { toggleVariants } from './toggle'

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default'
})

type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>

export const ToggleGroup = (props: ToggleGroupProps) => {
  const { className, variant, size, children, ...rest } = props

  return (
    <ToggleGroupPrimitive.Root
      className={cn('flex items-center justify-center gap-1', className)}
      {...rest}
    >
      <ToggleGroupContext value={{ variant, size }}>{children}</ToggleGroupContext>
    </ToggleGroupPrimitive.Root>
  )
}

type ToggleGroupItemProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>

export const ToggleGroupItem = (props: ToggleGroupItemProps) => {
  const { className, children, variant, size, ...rest } = props

  const context = useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        toggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size
        }),
        className
      )}
      {...rest}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}