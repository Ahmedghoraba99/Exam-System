import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserResults, resultsSelectors } from '../store/slices/resultSlice.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/results.css';

export function Results() {
  const dispatch = useDispatch();
  const results = useSelector(resultsSelectors.selectAllResults);
  const loading = useSelector(resultsSelectors.selectResultsLoading);
  const error = useSelector(resultsSelectors.selectResultsError);

  useEffect(() => {
    dispatch(fetchUserResults(localStorage.getItem('id')));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (results.length === 0) {
    return <div>No results found for this user.</div>;
  }

  return (
    <>
    <div className="results-container">
      <h1 className="text-center m-5">Exam Results</h1>
      <a href="/home" className="btn btn-primary fw-bold fs-5 mb-1">
        <i className="fas fa-home"></i>
      </a>
      <table className="table table-hover table-striped">
        <thead className="table-dark text-light text-center">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Exam Name</th>
            <th scope="col">Score</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={result._id}>
              <td>{index + 1}</td>
              <td>{result.exam.name}</td>
              <td>{result.score}</td>
              <td>{new Date(result.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
