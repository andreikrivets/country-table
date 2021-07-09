import React, { useState } from 'react';
import { Table, Input, Space, Button, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import uniqid from 'uniqid';

const TableContent = (props) => {
  const { countriesData, continentsData } = props;
  // filter options
  const [filtredInfo, setFiltredInfo] = useState({});
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

  // update filters
  const handleTableChange = (_, filters) => setFiltredInfo(filters);

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
      filteredValue: filtredInfo.code || null,
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
      filteredValue: filtredInfo.name || null,
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
      filteredValue: filtredInfo.continent || null,
      onFilter: (value, record) => record.continent === value,
    },
  ];

  const filterEntries = filtredInfo
    ? Object.entries(filtredInfo).filter((category) => category[1])
    : [];

  return (
    <>
      <div className="alert-wrapper">
        {filterEntries.length ? (
          <Alert
            type="info"
            message={`filtred by ${filterEntries.map((category) => ` ${category[0]}`)}`}
            action={
              <Button onClick={() => setFiltredInfo({})} type="ghost" size="small">
                clear
              </Button>
            }
          />
        ) : null}
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 50 }}
        onChange={handleTableChange}
        bordered
      />
    </>
  );
};

export default TableContent;
