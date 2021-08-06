import React, { useReducer, useEffect, useMemo } from "react"
import { restoreDb } from 'gatsby-cdn-search-plugin'
import CarTable from './carTable';

// styles

const searchFetch = async (search, skip = 0, limit = 30) => {
  const db = await restoreDb('cars');
  let result;
  if (search.length >= 3) {
    result = await db.find({ $ngram: search, year: { $gte: 2014 } }, undefined, skip, limit);
  } else if (!!search.length) {
    result = await db.find({
      $or: [
        { model: { $regex: new RegExp(`^${search}`, 'i'), }, },
        { make: { $regex: new RegExp(`^${search}`, 'i'), }, }
      ],
    }, undefined, skip, limit);
  } else {
    result = await db.find({ year: { $gte: 2014 } }, undefined, skip, limit);
  }
  return result;
}

const initialState = {
  loading: false,
  search: '',
  searchTemp: '',
  list: [],
  page: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'pageUp':
      return { ...state, page: state.page + 1 }
    case 'type':
      return { ...state, searchTemp: action.value }
    case 'enter':
      return { ...state, search: state.searchTemp }
    case 'loading':
      return { ...state, loading: true }
    case 'load':
      return { ...state, loading: false, list: action.list, page: 0 };
    case 'loadMore':
      return { ...state, loading: false, list: [...state.list, ...action.list] };
    default:
      throw new Error();
  }
}

const IndexPage = ({ classes }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      let list = await searchFetch(state.search);
      dispatch({ type: 'load', list });
    })();
  }, [state.search])
  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch({ type: 'enter' });

    }
  }

  const loadMore = useMemo(() => {
    (async () => {
      let list = await searchFetch(state.search, 30 * (state.page + 1));
      dispatch({ type: 'loadMore', list });
    })()
  }, [state.search, state.page])
  const onChange = (event) => {
    const { value } = event.target;
    dispatch({ type: 'type', value });
  }
  return (
    <main>
      <title>Cars</title>
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
              <a href="#" className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:text-gray-200 transition-colors duration-300">Docs</a>
              <a href="#" className="p-2 lg:px-4 md:mx-2 text-white bg-indigo-600 rounded hover:text-gray-700">Cars search demo</a>
              <a href="#" className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Films search demo</a>
              <a href="#" className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300">Contact</a>
            </div>
          </div>
        </nav>

        <div className="bg-indigo-100 py-6 md:py-12">
          <div className="container px-4 mx-auto">

            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-medium mb-2">Demo search cars (N-Gram, Regexp, By year)</h1>
              <div className="relative text-gray-600 mt-10">
                <input value={state.searchTemp} onChange={onChange} onKeyPress={onKeyPress} type="search" name="serch" placeholder="Search" className="border-blue-500 border-2 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-11/12 m-4" />
              </div>
              {useMemo(() => (<>
                <CarTable list={state.list} loadMore={() => dispatch({ type: "pageUp" })} />
              </>), [state.list, state.loading])}
            </div>

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

          </div>
        </div>

      </div>
    </main>
  )
}

export default IndexPage;

