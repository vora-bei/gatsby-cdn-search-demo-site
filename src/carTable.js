// You can import any component you want as a named export from 'react-virtualized', eg
import React from "react";
import { Column, Table, InfiniteLoader, AutoSizer } from "react-virtualized";

const renderHeader = ({ dataKey }) => {
  return <div className="text-left">{dataKey}</div>;
};


const getRowClassName = ({ index }) => {
  const basicRow = "hover:bg-blue-300 ";
  if (index < 0) return "bg-blue-100";
  return basicRow + (index % 2 === 0 ? "bg-white" : "bg-blue-100");
};

const CarTable = ({ list, loadMore }) => {
  return (
    <div className="bg-white" style={{ height: 500 }}>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isRowLoaded={({ index }) => !!list[index]}
            loadMoreRows={loadMore}
            rowCount={1000000}
          >
            {({ onRowsRendered, registerChild }) => (
              <Table
                ref={registerChild}
                headerHeight={40}
                height={height}
                onRowsRendered={onRowsRendered}
                rowCount={list.length}
                rowHeight={60}
                width={width}
                className={"table-auto"}
                rowClassName={getRowClassName}
                rowGetter={({ index }) => list[index]}
              >
                <Column
                  headerRenderer={renderHeader}
                  label="Make"
                  cellRenderer={({ cellData }) => cellData}
                  dataKey="make"
                  width={200}
                />
                <Column
                  headerRenderer={renderHeader}
                  label={"Model"}
                  dataKey="model"
                  width={200}
                  className="text-left"
                  cellRenderer={({ cellData }) => cellData}
                />
                <Column
                  headerRenderer={renderHeader}
                  label="Color"
                  dataKey="color"
                  width={200}
                  className="text-left"
                  cellRenderer={({ cellData }) => cellData}
                />
                <Column
                  headerRenderer={renderHeader}
                  label="Year"
                  dataKey="year"
                  width={200}
                  className="text-left"
                  cellRenderer={({ cellData }) => cellData}
                />
                <Column
                  headerRenderer={renderHeader}
                  label="Seller"
                  dataKey="seller"
                  width={200}
                  className="text-left"
                  cellRenderer={({ cellData }) => cellData}
                />
                <Column
                  headerRenderer={renderHeader}
                  label="Price"
                  dataKey="sellingprice"
                  width={200}
                  className="text-left"
                  cellRenderer={({ cellData }) => cellData}
                />
              </Table>
            )}

          </InfiniteLoader>)
        }</AutoSizer>
    </div>
  );
};

export default CarTable;
