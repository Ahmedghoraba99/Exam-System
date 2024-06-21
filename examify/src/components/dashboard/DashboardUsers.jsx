
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function DashboardUsers () {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4 p-3">
      <h2>Users</h2>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

