import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Image, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'react-virtualized/styles.css';
import './UserList.css';
import { useUserList } from './useUserList';

export function UserList() {
  const { loading, hasMore, fetchedData, loadMore } = useUserList();

  if (!fetchedData.length && loading)
    return (
      <h4 className='p-2'>
        <span className='mr-2'>Loading...</span>
        <Spinner animation='border' variant='light' />
      </h4>
    );

  return (
    <Container>
      <Row>
        <Col className='border border-right-0'>ID</Col>
        <Col className='border border-right-0'>Name</Col>
        <Col className='border border-right-0'>Short bio</Col>
        <Col className='border border-right-0'>Verified</Col>
        <Col className='border' />
      </Row>

      <Row>
        <Col className='p-0'>
          <InfiniteScroll
            dataLength={fetchedData.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <h4 className='p-2'>
                <span className='m-1'>Loading...</span>
                <Spinner animation='border' variant='light' />
              </h4>
            }
          >
            {fetchedData.map((User) => (
              <Row className='m-0' key={User.id}>
                <Col className='border border-right-0 border-top-0 p-0 d-flex justify-content-center align-items-center'>
                  {User.id}
                </Col>
                <Col className='border border-right-0 border-top-0 p-0 d-flex justify-content-center align-items-center'>
                  {User.name}
                </Col>
                <Col className='border border-right-0 border-top-0 p-0 d-flex justify-content-center align-items-center'>
                  <OverlayTrigger placement='bottom' overlay={<Tooltip id='button-tooltip-2'>{User.shortBio}</Tooltip>}>
                    <div className='p-1 truncate'>{User.shortBio}</div>
                  </OverlayTrigger>
                </Col>
                <Col className='border border-right-0 border-top-0 p-0 d-flex justify-content-center align-items-center'>
                  {User.isVerified ? (
                    <FontAwesomeIcon className='text-success' icon='check' size='2x' />
                  ) : (
                    <FontAwesomeIcon className='text-danger' icon='times' size='2x' />
                  )}
                </Col>
                <Col className='border border-top-0 p-0 d-flex justify-content-center align-items-center'>
                  <Image src={User.avatar} style={{ height: '140px', width: '140px' }} />
                </Col>
              </Row>
            ))}
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
}
