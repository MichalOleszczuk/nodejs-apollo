import React, { memo, useContext } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { UsersContext } from '../../context/users/users-context';
import './FilterForm.css';

function FilterForm() {
  const {
    usersFilter,
    onChangeUsersFilter,
    isUserVerified,
    includeVerify,
    onChangeIncludeVerify,
    onChangeUserVerified,
    onFiltersSubmit,
  } = useContext(UsersContext);

  return (
    <Form>
      <Form.Row className='align-items-center'>
        <Col xs='auto'>
          <Form.Control
            className='mb-2'
            placeholder='Filter for name and bio'
            value={usersFilter}
            onChange={onChangeUsersFilter}
          />
        </Col>
        <Col xs='auto'>
          <Form.Check
            type='checkbox'
            className='mb-2 filterFormCheck'
            label='Is verified included'
            checked={includeVerify}
            onChange={onChangeIncludeVerify}
          />
        </Col>
        <Col xs='auto'>
          <Form.Check
            type='checkbox'
            className='mb-2 filterFormCheck'
            label='Is verified'
            checked={isUserVerified}
            onChange={onChangeUserVerified}
          />
        </Col>
        <Col xs='auto'>
          <Button className='mb-2' onClick={onFiltersSubmit}>
            Submit
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default memo(FilterForm);
