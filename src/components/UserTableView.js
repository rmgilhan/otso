import {Row, Col, Table, Form} from 'react-bootstrap'
import SetUserAsAdmin from '../components/SetUserAsAdmin';

export default function UserTableView({userProps, searchTerm, handleSearchChange, currentUser}){
	//const [loading, setLoading] = useState(true);
	return(
	  <>
	  <Row>
        <Col md={{ span: 6, offset: 3 }} className="my-5">
          <Form.Control
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>
        <Table fluid striped bordered hover responsive="sm" size="sm" className="table-fluid mb-4">
          <thead className="text-center py-5 fs-7 admin-header">
            <tr>
              <th className="py-3 text-light d-none d-md-table-cell">User ID</th>
              <th className="py-3">Name</th>
              <th className="py-3">Email</th>
              <th className="py-3 text-light d-none d-md-table-cell">Mobile Number</th>
              <th className="py-3">Admin</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {userProps.map((user) => (
              <tr key={user._id}>
                <td className="d-none d-md-table-cell">{user._id}</td>
                <td>{`${user.firstName} ${user.lastName}`}</td>
                <td>{user.email}</td>
                <td className="d-none d-md-table-cell">{user.mobileNo}</td>
                <td className={`fw-bold ${user.isAdmin ? 'text-success' : 'text-danger'}`}>
                  {user.isAdmin ? "Yes" : "No"}
                </td>
                <td className="text-center py-1">
                  {!user.isAdmin && currentUser.isAdmin && (
                    <SetUserAsAdmin user={user} margin={'0'} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
	  </>
	)
}