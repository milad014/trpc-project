import React from 'react'
import Header from './Header'
import Footer from './Footer'

export interface Props {
    children: React.ReactNode
}

export default function Layout(props: Props) {
    return (
        <div className="h-100vh flex flex-col justify-between ">
            <Header />
            <main className="flex-1 p-5">{props.children}</main>
            <Footer />
        </div>
    )
}
