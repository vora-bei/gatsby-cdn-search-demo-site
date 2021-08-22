import React, { useReducer, useEffect, useMemo, useCallback } from "react"
import { useCdnCursorQuery, log } from 'gatsby-cdn-search-plugin'
import Layout from "../layout";
import { useDebounce } from 'use-debounce';
import MovieList from '../movieList';
log.enableAll();

const makeQuery = (search, type) => {
  if (search.length >= 3 && type === 'ngram') {
    return { $ngram: search };
  } if (!!search.length && type === 'lex') {
    return { $lex: search };
  } else if (!!search.length && type === 'regexp') {
    return { name: { $regex: new RegExp(`^${search}`, 'i'), } };
  } else {
    return {};
  }
}

const initialState = {
  loading: false,
  search: '',
  list: [],
  page: 0,
  indice: 'ngram'
};
function reducer(state, action) {
  switch (action.type) {
    case 'pageUp':
      return { ...state, page: state.page + 1 }
    case 'type':
      return { ...state, search: action.value }
    case 'indice':
      return { ...state, indice: action.value }
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
const IndexPage = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [search] = useDebounce(state.search, 1000);
  const query = useMemo(() => makeQuery(search, state.indice), [search, state.indice]);

  const cursor = useCdnCursorQuery('movies', query, undefined, 0, 30);

  useEffect(() => {
    (async () => {
      dispatch({ type: 'load', list: await cursor.next() });
    })();
  }, [cursor])

  useEffect(() => {
    (async () => {
      const hasNext = await cursor.hasNext();
      if (hasNext) {
        dispatch({ type: 'loadMore', list: await cursor.next() })
      }
    })()
  }, [state.page]);

  const onChange = useCallback((event) => {
    const { value } = event.target;
    dispatch({ type: 'type', value });
  }, []);
  const onChangeType = useCallback((event) => {
    const { value } = event.target;
    dispatch({ type: 'indice', value });
  }, []);
  return (
    <Layout title={"Movies"}>
      <div className="bg-indigo-100 py-6 md:py-12">
        <div className="container px-4 mx-auto">

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-medium mb-2">Demo search cars (N-Gram, Regexp, By year)</h1>
            <div className="relative text-gray-600 mt-10">
              <input value={state.search} onChange={onChange} type="search" name="search" placeholder="Search" className="border-blue-500 border-2 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-11/12 m-4" />
            </div>
            <div className="flex justify-around mb-10">
              <label className="inline-flex items-center mt-4 ">
                <input
                  name="type"
                  value="ngram"
                  type="radio"
                  checked={state.indice === "ngram"}
                  onChange={onChangeType}
                  className="form-radio h-5 w-5 text-gray-600" />
                <span className="ml-2 text-gray-700">NGRAM</span>
              </label>

              <label className="inline-flex items-center mt-4">
                <input
                  name="type"
                  value="lex"
                  type="radio"
                  className="form-radio h-5 w-5 text-red-600"
                  checked={state.indice === "lex"}
                  onChange={onChangeType}
                /><span className="ml-2 text-gray-700">LEX</span>
              </label>

              <label className="inline-flex items-center mt-4">
                <input
                  name="type"
                  value="regexp"
                  type="radio"
                  className="form-radio h-5 w-5 text-red-600"
                  checked={state.indice === "regexp"}
                  onChange={onChangeType}
                /><span className="ml-2 text-gray-700">REGEXP</span>
              </label>
            </div>
            {useMemo(() => (<>
              <MovieList list={state.list} loadMore={() => dispatch({ type: "pageUp" })} />
            </>), [state.list])}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
