import React, { useCallback, useMemo } from "react"
import { Link } from "gatsby"
export default function Layout({ children, title }) {
    const isActive = useCallback(({ isPartiallyCurrent }) => {
        return isPartiallyCurrent
            ? { className: 'bg-indigo-600  hover:text-gray-200 text-white p-2 lg:px-4 md:mx-2 rounded transition-colors duration-300' }
            : { className: 'hover:bg-gray-200 hover:text-gray-700 p-2 lg:px-4 md:mx-2 rounded transition-colors duration-300' }
    }, []);
    return (
        <main>
            <title>{title}</title>
            <div className="header-2">

                <nav className="bg-white py-2 md:py-4">
                    <div className="container px-4 mx-auto md:flex md:items-center">

                        <div className="flex justify-between items-center">
                            <a href="#" className="font-bold text-xl text-indigo-600">Gatsby cdn search</a>
                            <button className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
                                <i className="fas fa-bars"></i>
                            </button>
                        </div>

                        <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                            {/* <Link to="/docs" getProps={isActive}>Docs</Link> */}
                            <Link to="/cars" getProps={isActive}>Cars search demo</Link>
                            <Link to="/movies" getProps={isActive}>Films search demo</Link>
                            {/* <Link to="/contacts" getProps={isActive}>Contact</Link> */}
                        </div>
                    </div>
                </nav>
            </div>
            {children}

            <div className="md:flex md:flex-wrap md:-mx-4 mt-6 md:mt-12">

                <div className="md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
                    <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
                    <h5 className="text-xl font-medium uppercase mb-4">Cheap</h5>
                    <p className="text-gray-600">####### ########## ############## ############## ####### #########</p>
                </div>

                <div className="md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
                    <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
                    <h5 className="text-xl font-medium uppercase mb-4">Fast</h5>
                    <p className="text-gray-600">####### ########## ############## ############## ####### #########</p>
                </div>

                <div className="md:w-1/3 md:px-4 xl:px-6 mt-8 md:mt-0 text-center">
                    <span className="w-20 border-t-2 border-solid border-indigo-200 inline-block mb-3"></span>
                    <h5 className="text-xl font-medium uppercase mb-4">Simple</h5>
                    <p className="text-gray-600">####### ########## ############## ############## ####### #########</p>
                </div>

            </div>
        </main>
    )
}