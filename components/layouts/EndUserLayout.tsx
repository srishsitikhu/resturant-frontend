import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer';

const EndUserLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="flex flex-col">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}

export default EndUserLayout
