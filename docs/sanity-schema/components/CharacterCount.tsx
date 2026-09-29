import React from 'react'
import {Box, Flex, Stack, Text} from '@sanity/ui'
import type {StringInputProps, TextInputProps} from 'sanity'

type CountProps = (StringInputProps | TextInputProps) & {
  /** batas aman layout */
  max: number
  /** ambang yang memblokir publish; sama dengan max untuk field strict */
  hard: number
}

function Counter({max, hard, ...props}: CountProps) {
  const value = typeof props.value === 'string' ? props.value : ''
  // Match Sanity's Rule.max, which counts UTF-16 code units.
  const length = value.length
  const remaining = max - length

  const tone: 'default' | 'caution' | 'critical' =
    length > hard ? 'critical' : length > max ? 'caution' : 'default'

  const message =
    length > hard
      ? `${length} karakter. Batas keras ${hard} terlampaui, publish akan ditolak.`
      : length > max
        ? `${length} karakter. Batas aman layout ${max}, teks bisa memanjang ke baris baru.`
        : `${length} / ${max}`

  return (
    <Stack space={2}>
      {props.renderDefault(props as never)}
      <Flex justify="space-between" align="center">
        <Box flex={1}>
          {tone !== 'default' && (
            <Text size={1} muted={false} style={{color: tone === 'critical' ? '#d13b3b' : '#9a6700'}}>
              {message}
            </Text>
          )}
        </Box>
        {tone === 'default' && (
          <Text size={1} muted align="right">
            {remaining <= Math.ceil(max * 0.1) ? `sisa ${remaining} karakter` : message}
          </Text>
        )}
      </Flex>
    </Stack>
  )
}

/**
 * Cache komponen per pasangan batas.
 *
 * Sanity membandingkan referensi komponen antar render. Tanpa cache, setiap
 * render menghasilkan komponen baru dan input akan kehilangan fokus saat
 * editor mengetik.
 */
const cache = new Map<string, React.ComponentType<StringInputProps | TextInputProps>>()

export function characterCountInput(max: number, hard: number) {
  const key = `${max}:${hard}`
  const cached = cache.get(key)
  if (cached) return cached

  const Component = (props: StringInputProps | TextInputProps) => (
    <Counter {...(props as CountProps)} max={max} hard={hard} />
  )
  Component.displayName = `CharacterCount(${key})`

  cache.set(key, Component)
  return Component
}
