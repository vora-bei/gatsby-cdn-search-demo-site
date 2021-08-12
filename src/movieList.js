// You can import any component you want as a named export from 'react-virtualized', eg
import React, { useCallback } from "react";
import { List, InfiniteLoader, AutoSizer } from "react-virtualized";


const MovieList = ({ list, loadMore }) => {

  const rowRenderer = useCallback(function ({ key, index, style }) {
    return (
      <div
        key={key}
        style={{...style, width: '97%'}}
        className={'border list-none rounded-sm px-3 py-3 ml-3 mr-3 box-border bg-white'}
      >
        {list[index].name}
      </div>
    )
  }, [list])
  return (
    <div style={{height: 500}}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            rowCount={1000000}
            isRowLoaded={({ index }) => {
              return !!list[index]
            }}
            loadMoreRows={loadMore}
          >
            {({ onRowsRendered, registerChild }) => (
              <List
                ref={registerChild}
                height={height}
                onRowsRendered={onRowsRendered}
                rowRenderer={rowRenderer}
                rowCount={list.length}
                rowHeight={60}
                width={width}
                rowGetter={({ index }) => list[index]}
              />
            )}

          </InfiniteLoader>)}
      </AutoSizer>
    </div>
  );
};

export default MovieList;
