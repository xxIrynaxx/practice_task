import { DataType, EqualType, ParamsType } from '@/types';
import React from 'react';

import './index.scss';

type FieldsProps = {
  param: ParamsType;
  equal: EqualType;
  isVisibleParam: () => void;
  isVisibleEqual: () => void;
  queries: { param: ParamsType; equal: EqualType; value: string; logic?: 'AND' | 'OR' }[];
  setQueries: React.Dispatch<
    React.SetStateAction<
      { param: ParamsType; equal: EqualType; value: string; logic?: 'AND' | 'OR' }[]
    >
  >;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  data: DataType[] | DataType;
};

const Fields: React.FC<FieldsProps> = ({
  param,
  equal,
  isVisibleParam,
  isVisibleEqual,
  queries,
  setQueries,
  searchValue,
  setSearchValue,
  handleSearch,
  data,
}) => {
  const arrayData = Array.isArray(data) ? data : [data];

  const addCondition = (logic: 'AND' | 'OR') => {
    if (searchValue.trim()) {
      setQueries([...queries, { param, equal, value: searchValue, logic }]);
      setSearchValue('');
    }
  };

  const addOrCondition = () => addCondition('OR');
  const addAndCondition = () => addCondition('AND');

  return (
    <div className="fields">
      <div className="fields__title">Query:</div>
      <div className="fields__params" onClick={isVisibleParam}>
        <input className="fields__params-input" value={param} readOnly />
        <span className="fields__params-input-checkmark"></span>
      </div>
      <div className="fields__equal" onClick={isVisibleEqual}>
        <input className="fields__equal-input" value={equal} readOnly />
        <span className="fields__equal-input-checkmark"></span>
      </div>
      <button className="fields__or-btn" onClick={addOrCondition}>
        + Or
      </button>
      <button className="fields__and-btn" onClick={addAndCondition}>
        + And
      </button>
      <input
        className="fields__input"
        type="text"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <button className="fields__search-btn" onClick={handleSearch}>
        Search
      </button>
      <div className="fields__records">{`${arrayData.length} records found`}</div>
    </div>
  );
};

export default Fields;
