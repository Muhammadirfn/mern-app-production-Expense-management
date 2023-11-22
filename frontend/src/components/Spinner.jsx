import React from 'react';
import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spin size="large" />
    </div>
  );
}

export default Spinner;
