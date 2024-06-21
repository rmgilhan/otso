import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserTableView from '../components/UserTableView'
import UserCardView from '../components/UserCardView'
import UserContext from '../UserContext';
import useViewport from '../components/useViewport';


export default function Users() {
  const { user: currentUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const viewport = useViewport();
 
   useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Error fetching users: ' + error.message);
        setUsers([]);
      } 
    };

    fetchUsers();
  }, [currentUser, navigate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <Container className="mt-5">
        {viewport !== 'xs' ?
          <UserTableView 
            userProps={filteredUsers} 
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            currentUser={currentUser}
         />
          : 
          <UserCardView 
            userProps={filteredUsers} 
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            currentUser={currentUser}
          />
        }
      {error && <div className="text-danger mt-3">{error}</div>}
    </Container>
  );
}