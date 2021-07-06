import React from 'react';
import { Table, Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import uniqid from 'uniqid';

const TableContent = (props) => {
  const { countriesData, continentsData } = props;
  // add unique key for each element, fix continent names
  const dataSource = countriesData.map((countryData) => {
    // hardcoding: fix Åland Islands name
    if (countryData.name === 'Åland') {
      return {
        ...countryData,
        name: 'Aland',
        key: uniqid(),
        continent: countryData.continent.name,
      };
    }
    return { ...countryData, key: uniqid(), continent: countryData.continent.name };
  });
  // convert continents names into simple array following antd's schema
  const continents = Object.values(continentsData).map((continent) => ({
    text: continent.name,
    value: continent.name,
  }));

  // input-based filter in "names" and "ISO" columns
  const getColumnSearchProps = (dataIndex) => ({
    // dropdown group
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className="search-dropdown">
        <Input
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
        />
        <Space>
          <Button onClick={() => confirm()} type="text" size="small">
            filter
          </Button>
          <Button onClick={() => clearFilters()} type="text" size="small">
            reset
          </Button>
        </Space>
      </div>
    ),
    // icon styling
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    // filtering logic
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
  });

  // table head
  const columns = [
    {
      title: 'ISO',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => {
        if (a.code > b.code) return 1;
        if (a.code < b.code) return -1;
        return 0;
      },
      align: 'center',
      width: '7%',
      ...getColumnSearchProps('code'),
    },
    {
      title: 'flag',
      dataIndex: 'emoji',
      key: 'emoji',
      className: 'emoji-flag',
      align: 'center',
      width: '5%',
      responsive: ['sm'],
      render: (text) => (
        <span role="img" aria-label="flag">
          {text}
        </span>
      ),
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      },
      ...getColumnSearchProps('name'),
    },
    {
      title: 'continent',
      dataIndex: 'continent',
      key: 'continent',
      sorter: (a, b) => {
        if (a.continent > b.continent) return 1;
        if (a.continent < b.continent) return -1;
        return 0;
      },
      width: '25%',
      filters: continents,
      onFilter: (value, record) => record.continent === value,
    },
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 50 }} bordered />
    </>
  );
};

export default TableContent;
