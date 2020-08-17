import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const Hello: React.FC<RouteComponentProps<{ name: string }>> = ({
  match: {
    params: { name },
  },
}) => <div>Hello {name}!</div>;

export default Hello;
