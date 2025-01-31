import React from 'react';
import { DataType, equalList, EqualType, paramsList, ParamsType } from '@/types';
import Fields from './components/Fields';
import DropDownList from './components/DropDownList';

import './index.scss';

type QueryProps = {
  data: DataType[] | DataType;
  setData: React.Dispatch<React.SetStateAction<DataType[] | DataType>>;
  authData: DataType[];
  param: ParamsType;
  equal: EqualType;
  isVisibleParam: () => void;
  isVisibleEqual: () => void;
  paramIsVisible: boolean;
  equalIsVisible: boolean;
  handleParam: (value: ParamsType) => void;
  handleEqual: (value: EqualType) => void;
};

const Query: React.FC<QueryProps> = ({
  data,
  setData,
  authData,
  param,
  equal,
  isVisibleParam,
  isVisibleEqual,
  paramIsVisible,
  equalIsVisible,
  handleParam,
  handleEqual,
}) => {
  const [searchText, setSearchText] = React.useState<string>('');
  const [queries, setQueries] = React.useState<
    { param: ParamsType; equal: EqualType; value: string; logic?: 'AND' | 'OR' }[]
  >([]);

  const handleSearch = () => {
    if (!searchText.trim() && queries.length === 0) {
      setData(authData);
      return;
    }

    const updatedQueries = [...queries];
    if (searchText.trim()) {
      updatedQueries.push({
        param,
        equal,
        value: searchText.trim(),
      });
    }

    const filteredData = authData.filter(item => {
      return updatedQueries.reduce((acc, { param, equal, value, logic }, index) => {
        const itemValue = String(item[param as keyof DataType]).toLowerCase();
        const inputValue = value.toLowerCase();

        let condition = false;

        switch (equal) {
          case '=':
            condition = itemValue === inputValue;
            break;
          case '!=':
            condition = itemValue !== inputValue;
            break;
          case '<':
          case '>':
          case '<=':
          case '>=':
            const lengthItem = itemValue.length;
            const lengthInput = Number(inputValue);

            if (isNaN(lengthInput)) {
              condition = false;
            } else {
              if (equal === '<') condition = lengthItem < lengthInput;
              if (equal === '>') condition = lengthItem > lengthInput;
              if (equal === '<=') condition = lengthItem <= lengthInput;
              if (equal === '>=') condition = lengthItem >= lengthInput;
            }
            break;
          case 'contains':
            condition = itemValue.includes(inputValue);
            break;
          case 'starts with':
            condition = itemValue.startsWith(inputValue);
            break;
          case 'in':
            condition = inputValue
              .split(',')
              .map(v => v.trim())
              .includes(itemValue);
            break;
          case 'not in':
            condition = !inputValue
              .split(',')
              .map(v => v.trim())
              .includes(itemValue);
            break;
        }

        if (index === 0) return condition;
        return logic === 'OR' ? acc || condition : acc && condition;
      }, false);
    });

    setData(filteredData);
    setQueries([]);
    setSearchText('');
  };

  return (
    <div className="query">
      <Fields
        param={param}
        equal={equal}
        isVisibleParam={isVisibleParam}
        isVisibleEqual={isVisibleEqual}
        queries={queries}
        setQueries={setQueries}
        searchValue={searchText}
        setSearchValue={setSearchText}
        handleSearch={handleSearch}
        data={data}
      />

      {paramIsVisible ? (
        <DropDownList
          optionList={paramsList}
          classStyle="list-small"
          currentValue={param}
          onSelectParam={handleParam}
        />
      ) : (
        ''
      )}

      {equalIsVisible ? (
        <DropDownList
          optionList={equalList}
          classStyle="list-large"
          currentValue={equal}
          onSelectEqual={handleEqual}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Query;
