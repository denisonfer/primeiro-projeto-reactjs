import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
    color: #7159c1;
    font-size: 16px;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  list-style: none;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;
      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #eee;
        color: #333;
        border-radius: 3px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }

    .state {
      margin: 5px 0 0 0;
      text-align: center;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
`;

export const State = styled.span.attrs(props => ({
  closed: props.closed,
}))`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 15px;
  color: #fff;
  border-radius: 4px;
  text-transform: capitalize;

  ${props =>
    props.closed
      ? css`
          & {
            background: #cb2431;
          }
        `
      : css`
          & {
            background: #2cbe4e;
          }
        `}
`;

export const FilterList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  border-bottom: 1px solid #eee;
  padding: 15px 0;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  select {
    width: 150px;
    border: 1px solid #eee;
    background: #fff;
    color: #7159c1;
    font-size: 16px;
    height: 40px;
    padding: 10px 15px;
    margin-left: 10px;
    cursor: pointer;
  }

  button {
    width: 30px;
    height: 30px;
    background-color: #7159c1;
    border-radius: 50%;
    border: none;
    margin: 0 15px;
    &[disabled] {
      cursor: not-allowed;
      background-color: #7159c173;
    }
  }
  svg {
    margin: 0;
  }
`;
