import React, { ReactElement } from 'react'
import Footer from '../components/layout/Footer'
import NavBar from '../components/layout/NavBar'
import '../styles/global.scss'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): ReactElement {
  return (
        <html>
        <body>
            <div className="container">
                <NavBar/>
                <main>
                    {children}
                </main>
                <Footer/>
            </div>
        </body>
        </html>
  )
}
