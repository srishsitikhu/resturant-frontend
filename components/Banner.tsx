import React from 'react'

const Banner = () => {
    return (
        <section className='pt-20'>
            <div className="container">
                <div className="relative mb-12">
                    <div className="bg-amber-600 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-lg">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find the Perfect Restaurant</h1>
                            <p className="text-lg mb-8">Discover amazing dining experiences in your area</p>
                            <form className="bg-white p-4 rounded-lg shadow-md">
                                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                                    <div className="w-full"><div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search h-5 w-5">
                                                <circle cx="11" cy="11" r="8"></circle>
                                                <path d="m21 21-4.3-4.3"></path>
                                            </svg>
                                        </div>
                                        <input className="pl-10 block px-4 py-2 bg-white text-black border border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 text-sm w-full" placeholder="Search restaurants..."/>
                                    </div>
                                    </div>
                                    <div className="w-[200px]">
                                        <select className="block px-4 py-2 bg-white text-black border border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm focus:outline-none focus:ring-2 text-sm w-full">
                                            <option disabled>All Cuisines</option>
                                            <option value="Italian">Italian</option>
                                            <option value="Japanese">Japanese</option>
                                            <option value="American">American</option>
                                            <option value="Thai">Thai</option>
                                            <option value="Mediterranean">Mediterranean</option>
                                            <option value="Mexican">Mexican</option>
                                            <option value="Chinese">Chinese</option>
                                            <option value="Steakhouse">Steakhouse</option>
                                            <option value="Seafood">Seafood</option>
                                            <option value="Vegan">Vegan</option>
                                            <option value="Indian">Indian</option>
                                            <option value="French">French</option>
                                        </select>
                                    </div>
                                    <div className="w-full md:w-1/4">
                                        <div className="relative rounded-md shadow-sm">
                                            <input className="pl-4 block px-4 py-2 text-black bg-white border border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 text-sm w-full" placeholder="Location"/>
                                        </div>
                                    </div>
                                    <button type="submit" className="inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500 text-base py-2 px-4  md:self-end">Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
