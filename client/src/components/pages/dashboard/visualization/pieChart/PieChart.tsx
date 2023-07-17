import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const DemoPie = ({data} :any) => {
//   const data = [
//     {
//       type: 'a',
//       value: 27,
//     },
//     {
//       type: 'b',
//       value: 25,
//     },
//     {
//       type: 'c',
//       value: 18,
//     },
//     {
//       type: 'd',
//       value: 15,
//     },
//     {
//       type: 'e',
//       value: 10.2,
//     },
//     {
//       type: 'f',
//       value: 4.8,
//     },
//   ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default DemoPie;