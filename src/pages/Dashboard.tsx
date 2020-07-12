import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import {
  Container,
  Title,
  Form,
  Repositories,
  Error,
} from './Dashboard/styles';
import logo from '../assets/logo.svg';
import api from '../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepository, setNewRepository] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepository) {
      setInputError('Digite o autor/nome do repositório.');
      return;
    }

    try {
      const { data } = await api.get<Repository>(`repos/${newRepository}`);

      setRepositories([data, ...repositories]);
      setNewRepository('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por este repositório');
    }
  }

  return (
    <Container>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore repositórios no Github.</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="Digite o nome do repositório"
          value={newRepository}
          onChange={(event) => setNewRepository(event.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {!!inputError && <Error>{inputError}</Error>}

      <Repositories>
        {!!repositories &&
          repositories.map((repository) => (
            <Link
              key={repository.full_name}
              to={`/repository/${repository.full_name}`}
            >
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{`@${repository.full_name}`}</strong>
                <p>{repository.description}</p>
              </div>
              <FiChevronRight color="#cbcbd6" size={28} />
            </Link>
          ))}
      </Repositories>
    </Container>
  );
};

export default Dashboard;
