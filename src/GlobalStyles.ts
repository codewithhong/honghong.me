import { CSSObject, MantineThemeBase } from '@mantine/core'

export const GlobalStyles: (theme: MantineThemeBase) => CSSObject = (
  theme
) => ({
  html: {
    scrollBehavior: 'smooth',
  },

  'img, video': {
    maxWidth: '100%',
    height: 'auto',
  },

  '::selection': {
    background: 'rgb(249, 6, 6, 0.05)',
    color: '#f90606',
  },

  '::-webkit-scrollbar': {
    width: 7,
    height: 5,
  },

  '::-webkit-scrollbar-thumb': {
    background: '#ef4444',
    transition: '0.25s',
    borderRadius: 2,
  },

  '::-webkit-scrollbar-track': {
    background: '0 0',
  },

  'input:-webkit-autofill, input:-webkit-autofill:focus': {
    transition: 'backgroundColor 600000s 0s, color 600000s 0s',
  },

  // Syntax highlighting
  'div[data-rehype-pretty-code-fragment]': {
    overflow: 'hidden',
    borderRadius: '0.5rem',
  },

  'div[data-rehype-pretty-code-fragment] pre': {
    overflowX: 'auto',
    padding: '0.5rem 0',
    fontSize: '0.875rem',
    lineHeight: '1.5rem',
    margin: 0,
    display: 'none',
  },

  'div[data-rehype-pretty-code-fragment] pre, div[data-rehype-pretty-code-fragment] code, span[data-rehype-pretty-code-fragment] code':
    {
      fontFamily: 'Fira Code, Noto Sans TC, Inter',
    },

  'span[data-rehype-pretty-code-fragment] code': {
    lineHeight: '1.45rem',
    borderRadius: 8,
    padding: '2px 8px',
    display: 'none',
  },

  'div[data-rehype-pretty-code-title]': {
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    display: 'none',
  },

  "div[data-rehype-pretty-code-title][data-theme='dark']": {
    backgroundColor: '#1d1e22',
    color: '#fff',
  },

  "div[data-rehype-pretty-code-title][data-theme='light']": {
    backgroundColor: '#e7ecf1',
    color: '#000',
  },

  'div[data-rehype-pretty-code-fragment] .line': {
    paddingLeft: '0.5rem',
    paddingRight: '0.75rem',
    borderLeft: '4px solid transparent',
  },

  'div[data-rehype-pretty-code-fragment] .line:hover': {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },

  'div[data-rehype-pretty-code-fragment] .line--highlighted': {
    borderLeftColor: 'rgba(239, 68, 68, 0.4)',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },

  'div[data-rehype-pretty-code-fragment] .word': {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: '0 3.5px',
    borderRadius: 4,
  },

  'div[data-rehype-pretty-code-fragment] code': {
    display: 'grid',
  },

  'code[data-line-numbers]': {
    counterReset: 'lineNumber',
  },

  'code[data-line-numbers] .line::before': {
    counterIncrement: 'lineNumber',
    content: 'counter(lineNumber)',
    display: 'inline-block',
    textAlign: 'right',
    marginRight: '0.75rem',
    width: '1rem',
  },

  "code[data-line-numbers][data-theme='light'] .line::before": {
    color: 'rgb(0 0 0 / 0.5)',
  },

  "code[data-line-numbers][data-theme='dark'] .line::before": {
    color: 'rgb(255 255 255 / 0.2)',
  },

  'div[data-rehype-pretty-code-title] ~ pre': {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  [`div[data-rehype-pretty-code-fragment] pre[data-theme='${theme.colorScheme}'], div[data-rehype-pretty-code-title][data-theme='${theme.colorScheme}']`]:
    {
      display: 'block',
    },

  [`span[data-rehype-pretty-code-fragment] code[data-theme='${theme.colorScheme}']`]:
    {
      display: 'inline',
    },
})
