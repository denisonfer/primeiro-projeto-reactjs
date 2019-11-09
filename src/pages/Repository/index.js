import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Proptype from 'prop-types';
import { GoIssueOpened, GoIssueClosed } from 'react-icons/go';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import api from '../../services/api';
import Container from '../../components/Container';

import { Loading, Owner, IssueList, State, FilterList } from './styles';

export default class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      issues: [],
      loading: true,
      filters: [
        {
          state: 'all',
          label: 'Todas',
        },
        {
          state: 'open',
          label: 'Abertas',
        },
        {
          state: 'closed',
          label: 'Fechadas',
        },
      ],
      filterSelected: 'all',
      page: 1,
      totalPage: '',
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { filterSelected } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filterSelected,
          per_page: 5,
        },
      }),
    ]);

    const countIssues = await api.get(`/repos/${repoName}/issues`);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      totalPage: countIssues.data.length / 5,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { filters, filterSelected, page } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters.find(f => f.label === filterSelected).state,
        per_page: 5,
        page,
      },
    });
    this.setState({
      issues: response.data,
    });
  };

  handleFilter = async e => {
    await this.setState({ filterSelected: e.target.value });
    this.loadIssues();
  };

  handlPage = async action => {
    const { page } = this.state;
    await this.setState({ page: action !== 'back' ? page + 1 : page - 1 });

    this.loadIssues();
  };

  static Proptype = {
    match: Proptype.shape({
      params: Proptype.shape({
        repository: Proptype.string,
      }),
    }).isRequired,
    filters: Proptype.func,
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      page,
      totalPage,
    } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <FilterList>
            <div>
              <h3>
                Issues:
                <select onChange={this.handleFilter}>
                  {filters.map(filter => (
                    <option key={filter.label} value={filter.label}>
                      {filter.label}
                    </option>
                  ))}
                </select>
              </h3>
            </div>
            <div>
              <h3>Páginas:</h3>
              <button
                type="button"
                disabled={page < 2}
                onClick={() => this.handlPage('back')}
              >
                <MdNavigateBefore color="#fff" size={20} />
              </button>
              {page} / {Math.round(totalPage)}
              <button type="button" onClick={() => this.handlPage('next')}>
                <MdNavigateNext color="#fff" size={20} />
              </button>
            </div>
          </FilterList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
                <div className="state">
                  {issue.state === 'closed' ? (
                    <State closed>
                      <GoIssueClosed />
                      {issue.state}
                    </State>
                  ) : (
                    <State closed={false}>
                      <GoIssueOpened />
                      {issue.state}
                    </State>
                  )}
                </div>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
