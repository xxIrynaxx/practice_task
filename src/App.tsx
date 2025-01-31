import React from 'react';
import { DataType, EqualType, ParamsType } from './types';
import { authData } from './data';
import Header from './features/Header';
import Query from './features/Query';
import Table from './features/Table';

import './styles/common.scss';

const App = () => {
  const [data, setData] = React.useState<DataType[] | DataType>(authData);

  const [param, setParam] = React.useState<ParamsType>('url');
  const [equal, setEqual] = React.useState<EqualType>('=');

  const [paramIsVisible, setParamIsVisible] = React.useState<boolean>(false);
  const [equalIsVisible, setEqualIsVisible] = React.useState<boolean>(false);

  const isVisibleParam = () => {
    setParamIsVisible(!paramIsVisible);
  };

  const isVisibleEqual = () => {
    setEqualIsVisible(!equalIsVisible);
  };

  const handleEqual = (value: EqualType) => {
    setEqual(value);
    setEqualIsVisible(false);
  };

  const handleParam = (value: ParamsType) => {
    setParam(value);
    setParamIsVisible(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !(event.target as HTMLElement).closest('.fields') &&
        !(event.target as HTMLElement).closest('.list')
      ) {
        setParamIsVisible(false);
        setEqualIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="page">
      <Header />
      <Query
        data={data}
        setData={setData}
        authData={authData}
        param={param}
        equal={equal}
        isVisibleParam={isVisibleParam}
        isVisibleEqual={isVisibleEqual}
        paramIsVisible={paramIsVisible}
        equalIsVisible={equalIsVisible}
        handleParam={handleParam}
        handleEqual={handleEqual}
      />
      <Table data={data} />
    </div>
  );
};

export default App;
