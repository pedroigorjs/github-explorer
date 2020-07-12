import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Container } from './Repository/styles';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return (
    <Container>
      <h1>
        Repository:
        {params.repository}
      </h1>
    </Container>
  );
};

export default Repository;
