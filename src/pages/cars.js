import React, { useReducer, useEffect, useMemo, useCallback } from "react"
import CarTable from '../carTable';
import Layout from '../layout';
import { useDebounce } from 'use-debounce';
import { useCdnCursorQuery } from 'gatsby-cdn-search-plugin';

const initialState = {
  loading: false,
  search: '',
  list: [],
  page: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'pageUp':
      return { ...state, page: state.page + 1 }
    case 'type':
      return { ...state, search: action.value }
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

const makeQuery = (search) => {
  if (search.length >= 4) {
    return { $ngram: search, year: { $lte: 2014 } };
  } else if (!!search.length) {
    return {
      $or: [
        { model: { $regex: new RegExp(`^${search}`, 'i'), }, },
        { make: { $regex: new RegExp(`^${search}`, 'i'), }, }
      ],
    };
  } else {
    return { year: { $lte: 2014 } };
  }
}
const IndexPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search] = useDebounce(state.search, 1000);
  const query = useMemo(() => makeQuery(search), [search]);

  const cursor = useCdnCursorQuery('cars', query, undefined, 0, 30);

  useEffect(() => {
    (async () => {
      dispatch({ type: 'load', list: await cursor.next() });
    })();
  }, [search, cursor])

  useEffect(() => {
    (async () => {
      if (await cursor.hasNext()) {
        dispatch({ type: 'loadMore', list: await cursor.next() })
      }
    })()
  }, [state.page]);
  const loadMore = useCallback(() => {
        dispatch({ type: 'pageUp'});
  });

  const onChange = useCallback((event) => {
    const { value } = event.target;
    dispatch({ type: 'type', value });
  },[]);
  return (
    <Layout title={"Cars"}>
      <div className="bg-indigo-100 py-6 md:py-12">
        <div className="container px-4 mx-auto">

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium mb-2">Demo search cars (N-Gram, Regexp, By year)</h1>
            <div className="relative text-gray-600 mt-10">
              <input value={state.search} onChange={onChange} type="search" name="serch" placeholder="Search" className="border-blue-500 border-2 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-11/12 m-4" />
            </div>
            {useMemo(() => (<>
              <CarTable list={state.list} loadMore={loadMore} />
            </>), [state.list])}
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default IndexPage;

