import styled from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Container = styled.div``;

export const Title = styled.h1`
  font-size: 48px;
  color: #3e3e3e;
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;

  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border-radius: 5px 0 0 5px;
    border: 2px solid ${(props) => (props.hasError ? '#c53030' : '#fff')};
    border-right: 0;

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    border-radius: 0 5px 5px 0;
    border: none;
    background-color: #04d361;
    font-weight: 700;
    color: #fff;
    transition: background 0.2s ease-in;

    &:hover {
      background-color: ${shade(0.05, '#04d361')};
    }
  }
`;

export const Repositories = styled.div`
  margin: 80px 0;
  max-width: 700px;

  a {
    background-color: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    text-decoration: none;
    transition: transform 0.2s ease-in;

    display: flex;
    align-items: center;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      flex: 1;
      margin: 0 16px;

      strong {
        font-size: 20px;
        color: #3d3d4d;
        text-transform: lowercase;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;
