import React from 'react';

import './index.scss';
import { DataType } from '@/types';

type TableProps = {
  data: DataType[] | DataType;
};

const Table: React.FC<TableProps> = ({ data }) => {
  const arrayData = Array.isArray(data) ? data : [data];

  return (
    <div className="table-section">
      <table className="table">
        <thead>
          <tr>
            <th>Url</th>
            <th>Domain</th>
            <th>UserName</th>
            <th>Password</th>
            <th>SHA256</th>
          </tr>
        </thead>
        <tbody>
          {arrayData.map(({ url, domain, user, password, sha256 }) => (
            <tr key={sha256}>
              <td>{url}</td>
              <td>{domain}</td>
              <td>{user}</td>
              <td>{password}</td>
              <td>{sha256}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
