import React, { Component } from 'react';
import './home.scss';
import {InfoCircleOutlined,PlusCircleOutlined, SearchOutlined  } from '@ant-design/icons';

import { Card, Col, Row, Typography, Popover } from 'antd';
const { Meta } = Card;
import { Link } from 'react-router-dom';
import { translate } from 'react-jhipster';
const { Title } = Typography;

export default class Cards extends Component {
  render() {
    return (
      <div className="homecontainer" style={{ padding: '30px' }}>
        <Title level={3} className="dashboard-header" >
          Dashboard
        </Title>
          <div className="container-fluid">
            <Row className="col-sm-12">
              <Col className="col-sm-3 ">
                <Card className="catch-card m-auto text-center"
                      cover={
                        <Link to="/entity/transaction">
                          <img
                            alt="example"
                            src="content/images/icons/administrator.png"
                            style={{ width: 150, height: 150, marginLeft: 70, marginTop: 10 }}
                          />
                        </Link>
                      }
                      actions={[
                        /* eslint react/jsx-key: 0 */
                        /* eslint no-constant-condition: "error" */
                        <Link to={{ pathname: `/entity/transaction/new`, state: { id: null ? null : null } }}>
                          <PlusCircleOutlined  type="plus" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/transaction">
                          <SearchOutlined  type="search" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Popover
                          placement="rightBottom"
                          title="Info"
                          content={translate('global.menu.admin.main')}
                          trigger="click">
                          <InfoCircleOutlined  type="info-circle" />
                        </Popover>
                      ]}>
                  <Meta style={{ fontSize: 24 }} description={translate('global.menu.admin.main')} />
                </Card>
              </Col>
              <Col className="col-sm-3 ">
                <Card className="catch-card m-auto text-center"
                      cover={
                        <Link to="/entity/transaction">
                          <img
                            alt="example"
                            src="content/images/icons/driver.png"
                            style={{ width: 150, height: 150, marginLeft: 70, marginTop: 10 }}
                          />
                        </Link>
                      }
                      actions={[
                        /* eslint react/jsx-key: 0 */
                        /* eslint no-constant-condition: "error" */
                        <Link to={{ pathname: `/entity/transaction/new`, state: { id: null ? null : null } }}>
                          <PlusCircleOutlined  type="plus" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/transaction">
                          <SearchOutlined  type="search" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Popover
                          placement="rightBottom"
                          title="Info"
                          content={translate('global.menu.drivers.main')}
                          trigger="click">
                          <InfoCircleOutlined  type="info-circle" />
                        </Popover>
                      ]}>
                  <Meta style={{ fontSize: 24 }} description={translate('global.menu.drivers.main')} />
                </Card>
              </Col>
              <Col className="col-sm-3">
                <Card className="catch-card m-auto text-center"
                      cover={
                        <Link to="/entity/vendor">
                          <img
                            alt="example"
                            src="content/images/icons/passengers.png"
                            style={{ width: 150, height: 150, marginLeft: 70, marginTop: 10 }}
                          />
                        </Link>
                      }
                  /* eslint react/jsx-key: 0 */
                      actions={[
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/vendor/new">
                          <PlusCircleOutlined  type="plus" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/vendor">
                          <SearchOutlined  type="search" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Popover
                          placement="rightBottom"
                          title="Info"
                          content={translate('global.menu.passengers.main')}
                          trigger="click"
                        >
                          <InfoCircleOutlined  type="info-circle" />
                        </Popover>
                      ]}
                >
                  <Meta style={{ fontSize: 24 }} description={translate('global.menu.passengers.main')} />
                </Card>
              </Col>
              <Col className="col-sm-3">
                <Card className="text-center  catch-card m-auto"
                      cover={
                        <Link to="/entity/system-events-history">
                          <img
                            alt="example"
                            src="content/images/icons/affiliate.png"
                            style={{ width: 150, height: 150, marginLeft: 70, marginTop: 10 }}
                          />
                        </Link>
                      }
                  /* eslint react/jsx-key: 0 */
                      actions={[
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/system-events-history/new">
                          <PlusCircleOutlined  type="plus" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/system-events-history">
                          <SearchOutlined  type="search" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Popover placement="rightBottom" title="Info" content={translate('global.menu.affiliates.main')} trigger="click">
                          <InfoCircleOutlined  type="info-circle" />
                        </Popover>
                      ]}
                >
                  <Meta style={{ fontSize: 24 }} description={translate('global.menu.affiliates.main')} />
                </Card>
              </Col>
            </Row>
            <Row className="col-sm-12">
              <Col className="col-sm-3">
                <Card  className="catch-card m-auto text-center"
                       hoverable

                       cover={
                         <Link to="/entity/product">
                           <img
                             alt="example"
                             src="content/images/icons/financial.png"
                             style={{ width: 150, height: 150, marginLeft: 70, marginTop: 10 }}
                           />
                         </Link>
                       }
                       actions={[
                         /* eslint react/jsx-key: 0 */
                         <Link to={{ pathname: `/entity/product/new`, state: { id: null } }}>
                           <PlusCircleOutlined  type="plus" />
                         </Link>,
                         /* eslint react/jsx-key: 0 */
                         <Link to="/entity/product">
                           <SearchOutlined  type="search" />
                         </Link>,
                         /* eslint react/jsx-key: 0 */
                         <Popover
                           placement="rightBottom"
                           title="Info"
                           content={translate('global.menu.accounting.main')}
                           trigger="click"
                         >
                           <InfoCircleOutlined  type="info-circle" />
                         </Popover>
                       ]}
                >
                  <Meta
                    style={{ fontSize: 24, color: 'white' }}
                    description={translate('global.menu.accounting.main')}
                  />
                </Card>
              </Col>
              <Col className="col-sm-3">
                <Card className="catch-card m-auto text-center"
                      cover={
                        <Link to="/entity/vendor-product">
                          <img
                            alt="example"
                            src="content/images/icons/map.png"
                            style={{ width: 150, height: 150, marginLeft: 70, marginTop: 10 }}
                          />
                        </Link>
                      }
                      actions={[
                        /* eslint react/jsx-key: 0 */
                        /* eslint no-constant-condition: "error" */
                        <Link to={{ pathname: `/entity/vendor-product/new`, state: { id: null ? null : null } }}>
                          <PlusCircleOutlined  type="plus" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/vendor-product">
                          <SearchOutlined  type="search" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Popover
                          placement="rightBottom"
                          title="Info"
                          content={translate('global.menu.area.main')}
                          trigger="click"
                        >
                          <InfoCircleOutlined  type="info-circle" />
                        </Popover>
                      ]}
                >
                  <Meta style={{ fontSize: 24 }} description={translate('global.menu.area.main')} />
                </Card>
              </Col>
              <Col className="col-sm-3">
                <Card  className="catch-card m-auto text-center"
                       cover={
                         <Link to="/entity/operator">
                           <img
                             alt="example"
                             src="content/images/icons/services.png"
                             style={{ width: 150, height: 150, marginLeft: 70, marginTop: 10 }}
                           />
                         </Link>
                       }
                  /* eslint react/jsx-key: 0 */
                       actions={[
                         /* eslint react/jsx-key: 0 */
                         <Link to="/entity/operator/new">
                           <PlusCircleOutlined  type="plus" />
                         </Link>,
                         /* eslint react/jsx-key: 0 */
                         <Link to="/entity/operator">
                           <SearchOutlined  type="search" />
                         </Link>,
                         /* eslint react/jsx-key: 0 */
                         <Popover
                           placement="rightBottom"
                           title="Info"
                           content={translate('global.menu.auxiliary.main')}
                           trigger="click"
                         >
                           <InfoCircleOutlined  type="info-circle" />
                         </Popover>
                       ]}
                >
                  <Meta style={{ fontSize: 24 }} description={translate('global.menu.auxiliary.main')} />
                </Card>
              </Col>
              <Col className="col-sm-3">
                <Card className="catch-card m-auto text-center"
                      cover={
                        <Link to="/entity/notification">
                          <img
                            alt="example"
                            src="content/images/icons/sms.png"
                            style={{ width: 150, height: 150, marginLeft: 70, marginTop: 10 }}
                          />
                        </Link>
                      }
                  /* eslint react/jsx-key: 0 */
                      actions={[
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/notification/new">
                          <PlusCircleOutlined  type="plus" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/notification">
                          <SearchOutlined  type="search" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Popover placement="rightBottom" title="Info" content={translate('global.menu.smsServices.main')} trigger="click">
                          <InfoCircleOutlined  type="info-circle" />
                        </Popover>
                      ]}
                >
                  <Meta style={{ fontSize: 24 }} description={translate('global.menu.smsServices.main')} />
                </Card>
              </Col>
            </Row>
            <Row className="col-sm-12">
              <Col className="col-sm-3">
                <Card className="catch-card m-auto text-center"
                      hoverable
                      cover={
                        <Link to="/entity/currency-xchange-rate">
                          <img
                            alt="example"
                            src="content/images/icons/antenna.png"
                            style={{ width: 150, height: 150, marginLeft: 70, marginTop: 10 }}
                          />
                        </Link>
                      }
                      actions={[
                        /* eslint react/jsx-key: 0 */
                        <Link to={{ pathname: `/entity/currency-xchange-rate/new`, state: { id: null } }}>
                          <PlusCircleOutlined  type="plus" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/currency-xchange-rate">
                          <SearchOutlined  type="search" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Popover
                          placement="rightBottom"
                          title="Info"
                          content={translate('global.menu.cabManagement.main')}
                          trigger="click"
                        >
                          <InfoCircleOutlined  type="info-circle" />
                        </Popover>
                      ]}
                >
                  <Meta
                    style={{ fontSize: 24, color: 'white' }}
                    description={translate('global.menu.cabManagement.main')}
                  />
                </Card>
              </Col>
              <Col className="col-sm-3">
                <Card className="catch-card m-auto text-center"
                      cover={
                        <Link to="/entity/vendor-api">
                          <img
                            alt="example"
                            src="content/images/icons/das-vendor-api.png"
                            style={{ width: 150, height: 150, marginLeft: 70, marginTop: 10 }}
                          />
                        </Link>
                      }
                      actions={[
                        /* eslint react/jsx-key: 0 */
                        /* eslint no-constant-condition: 0 */
                        <Link to={{ pathname: `/entity/vendor-api/new`, state: { id: null ? null : null } }}>
                          <PlusCircleOutlined  type="plus" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/vendor-api">
                          <SearchOutlined  type="search" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Popover
                          placement="rightBottom"
                          title="Info"
                          content={translate('global.menu.trips.main')}
                          trigger="click"
                        >
                          <InfoCircleOutlined  type="info-circle" />
                        </Popover>
                      ]}
                >
                  <Meta style={{ fontSize: 24 }} description={translate('global.menu.trips.main')} />
                </Card>
              </Col>
              <Col className="col-sm-3">
                <Card className="catch-card m-auto text-center"
                      cover={
                        <Link to="/entity/whitelisted-ip">
                          <img
                            alt="example"
                            src="content/images/icons/dashboard.png"
                            style={{ width: 150, height: 150, marginLeft: 70, marginTop: 10 }}
                          />
                        </Link>
                      }
                  /* eslint react/jsx-key: 0 */
                      actions={[
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/whitelisted-ip/new">
                          <PlusCircleOutlined  type="plus" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/whitelisted-ip">
                          <SearchOutlined  type="search" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Popover
                          placement="rightBottom"
                          title="Info"
                          content={translate('global.menu.entities.dashboard')}
                          trigger="click"
                        >
                          <InfoCircleOutlined  type="info-circle" />
                        </Popover>
                      ]}
                >
                  <Meta style={{ fontSize: 24 }} description={translate('global.menu.entities.dashboard')} />
                </Card>
              </Col>
              <Col className="col-sm-3">
                <Card className="catch-card m-auto text-center"
                      cover={
                        <Link to="/entity/whitelisted-ip">
                          <img
                            alt="example"
                            src="content/images/icons/support.png"
                            style={{ width: 150, height: 150, marginLeft: 70, marginTop: 10 }}
                          />
                        </Link>
                      }
                  /* eslint react/jsx-key: 0 */
                      actions={[
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/whitelisted-ip/new">
                          <PlusCircleOutlined  type="plus" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Link to="/entity/whitelisted-ip">
                          <SearchOutlined  type="search" />
                        </Link>,
                        /* eslint react/jsx-key: 0 */
                        <Popover
                          placement="rightBottom"
                          title="Info"
                          content={translate('global.menu.customerCare.main')}
                          trigger="click"
                        >
                          <InfoCircleOutlined  type="info-circle" />
                        </Popover>
                      ]}
                >
                  <Meta style={{ fontSize: 24 }} description={translate('global.menu.customerCare.main')} />
                </Card>
              </Col>
            </Row>
          </div>
      </div>
    );
  }
}
