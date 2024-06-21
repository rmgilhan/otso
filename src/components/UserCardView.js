import {Row, Col, Form ,Card} from 'react-bootstrap'
import SetUserAsAdmin from '../components/SetUserAsAdmin';

export default function UserCardView({userProps, searchTerm, handleSearchChange, currentUser}){
	return (
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
			<Card className="pt-3 border border-2 rounded-3">
			{userProps.map((user) =>(
				<Card.Body className="ps-5 second">

					<Card.Subtitle className="d-inline px-5">Email:</Card.Subtitle>
					<Card.Text className="d-inline">{`${user.email}`}</Card.Text>
					<p/>
					<Card.Subtitle className="d-inline px-5">Name:</Card.Subtitle>
					<Card.Text className="d-inline">{`${user.firstName} ${user.lastName}`}</Card.Text>
					<p/>
					<Card.Subtitle className="d-inline px-5">MobileNo:</Card.Subtitle>
					<Card.Text className="d-inline" style={{marginLeft:"-1.8rem"}} >{`${user.mobileNo}`}</Card.Text>
					<p/>
					<Card.Subtitle className="d-inline px-5">Admin</Card.Subtitle>
					<Card.Text className="d-inline">{`${user.isAdmin}`}</Card.Text>
					<p/>
					 {!user.isAdmin && currentUser.isAdmin && (
                    <SetUserAsAdmin user={user} margin={'5'} />
                  )}
					 <hr/>
				</Card.Body>

			))}
			</Card>
		</>
	)
}