import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin-top: 30px;

  input {
    flex: 1;
    padding: 10px 15px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid;
    border-color: ${props => (props.notFound ? 'red' : '#eee')};
  }
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
} to {
  transform: rotate(360deg);
}
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  display: flex;
  justify-content: center;
  align-items: center;

  background: #7159c1;
  padding: 0 15px;
  margin-left: 10px;
  border: 0;
  border-radius: 4px;

  & [disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  svg {
    margin: 0;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
        margin: 0;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #eee;
    }
  }

  a {
    color: #7159c1;
    text-decoration: none;
  }
`;
