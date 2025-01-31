import { EqualType, paramsList, ParamsType } from '@/types';
import React from 'react';

import './index.scss';

type DropDownListProps = {
  optionList: ParamsType[] | EqualType[];
  currentValue: ParamsType | EqualType;
  classStyle?: string;
  onSelectParam?: (value: ParamsType) => void;
  onSelectEqual?: (value: EqualType) => void;
};

const DropDownList: React.FC<DropDownListProps> = ({
  optionList,
  classStyle,
  currentValue,
  onSelectParam,
  onSelectEqual,
}) => {
  return (
    <ul className={`list ${classStyle}`}>
      {optionList.map(el => (
        <li
          key={el}
          className="list__item"
          onClick={() => {
            if (onSelectParam && typeof el === 'string') {
              onSelectParam(el as ParamsType);
            } else if (onSelectEqual && typeof el === 'string') {
              onSelectEqual(el as EqualType);
            }
          }}
        >
          {currentValue === el ? (
            <img src="/assets/icon/checkmark.svg" className="list__checkmark"></img>
          ) : (
            ''
          )}
          {el}
        </li>
      ))}
    </ul>
  );
};

export default DropDownList;
