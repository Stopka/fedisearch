import React, { ReactElement } from 'react'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): ReactElement {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  )
}
