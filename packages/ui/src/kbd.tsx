import { cn } from '@tszhong0411/utils'

/**
 * Inspired by: https://github.com/nextui-org/nextui/blob/93f68727c1cef10d8745d22099cf27011fd4dce3/packages/components/kbd/src/utils.ts
 */
type KbdKey =
  | 'command'
  | 'shift'
  | 'ctrl'
  | 'option'
  | 'enter'
  | 'delete'
  | 'escape'
  | 'tab'
  | 'capsLock'
  | 'up'
  | 'right'
  | 'down'
  | 'left'
  | 'pageup'
  | 'pagedown'
  | 'home'
  | 'end'
  | 'help'
  | 'space'

const kbdKeysMap: Record<KbdKey, string> = {
  command: '⌘',
  shift: '⇧',
  ctrl: '⌃',
  option: '⌥',
  enter: '↵',
  delete: '⌫',
  escape: '⎋',
  tab: '⇥',
  capsLock: '⇪',
  up: '↑',
  right: '→',
  down: '↓',
  left: '←',
  pageup: '⇞',
  pagedown: '⇟',
  home: '↖',
  end: '↘',
  help: '?',
  space: '␣'
}

const kbdKeysLabelMap: Record<KbdKey, string> = {
  command: 'Command',
  shift: 'Shift',
  ctrl: 'Control',
  option: 'Option',
  enter: 'Enter',
  delete: 'Delete',
  escape: 'Escape',
  tab: 'Tab',
  capsLock: 'Caps Lock',
  up: 'Up',
  right: 'Right',
  down: 'Down',
  left: 'Left',
  pageup: 'Page Up',
  pagedown: 'Page Down',
  home: 'Home',
  end: 'End',
  help: 'Help',
  space: 'Space'
}

type KbdProps = {
  keys?: KbdKey[]
} & React.ComponentProps<'kbd'>

export const Kbd = (props: KbdProps) => {
  const { children, keys, className, ...rest } = props

  return (
    <kbd
      className={cn(
        'bg-muted inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-sm shadow-sm',
        className
      )}
      {...rest}
    >
      {keys?.map((key) => (
        <abbr key={key} title={kbdKeysLabelMap[key]} className='no-underline'>
          {kbdKeysMap[key]}
        </abbr>
      ))}
      {children}
    </kbd>
  )
}