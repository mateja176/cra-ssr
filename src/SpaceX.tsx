import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Launch } from './model';
import { fetchLaunches } from './service';

const SpaceX: React.FC<RouteComponentProps<
  {},
  {},
  null | { initialLaunches: Launch[] }
>> = ({ location: { state } }) => {
  const [launches, setLaunches] = React.useState<Launch[]>(
    (globalThis as any).__PRELOADED_STATE__ ?? state?.initialLaunches ?? null,
  );

  React.useEffect(() => {
    if (!launches) {
      fetchLaunches().then(setLaunches);
    }
  }, [launches, setLaunches]);

  return launches === null ? (
    <div>Loading launches...</div>
  ) : launches.length === 0 ? (
    <div>No launches</div>
  ) : (
    <div>
      {launches.map((launch) => (
        <div key={launch.id}>
          <pre>{JSON.stringify(launch, null, 2)}</pre>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default SpaceX;
