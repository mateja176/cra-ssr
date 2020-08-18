import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';

const Hello: React.FC<RouteComponentProps<{ name: string }>> = ({
  match: {
    params: { name },
  },
}) => {
  const history = useHistory();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    ({ target: { value } }) => {
      history.push(value);
    },
    [history],
  );

  return (
    <div>
      <div>Hello {name}!</div>
      <input type="text" value={name} onChange={handleChange} />
    </div>
  );
};

export default Hello;
