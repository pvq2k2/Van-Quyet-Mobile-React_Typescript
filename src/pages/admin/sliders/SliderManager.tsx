import React, { useState } from 'react'
import { Layout, Breadcrumb, Table, Button, Space, message, Popconfirm, notification } from 'antd';
import { Link } from 'react-router-dom';
import { SliderType } from '../../../types/slider';

type SliderManagerProps = {
  sliders: SliderType[];
  onRemove: (id: number | string) => void;
}
type ID = {
  _id: number | string;
}
const SliderManager = (props: SliderManagerProps) => {
  const [id, setId] = useState<ID>();
  function confirm() {
    const openNotification = () => {
      notification.success({
        message: `Xóa thành công !`,
      });
    };
    openNotification()
    props.onRemove(id);
  }
  
  function cancel(e: any) {
    console.log(e);
    message.error('Click on No');
  }
  const columns = [
    {
      key: 'key',
      title: 'STT',
      dataIndex: 'key',
    },
    {
      key: 'image',
      title: 'Image',
      dataIndex: 'img',
      render: (img: string) => (
        <img src={img} width={600} className="rounded-xl"/>
      )
    },
    {
      key: 'action',
      title: 'Action',
      dataIndex: '_id',
      render: (_id: ID) => (
        <Space size="middle">
        <Button type="primary" style={{ background: '#FFCC00', color: '#000000', border: 'none'}}><Link to={`/admin/slider/${_id}/edit`}>Edit</Link></Button>
        <Popconfirm
        title="Bạn có muốn xóa ảnh này không ?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Có"
        cancelText="Không"
        >
        <Button type="primary" danger onClick={() => setId(_id)}>Remove</Button>
        </Popconfirm>
        {/* <Button type="primary" danger onClick={() => props.onRemove(_id)}>Remove</Button> */}
        </Space>
      )
    },
  ]
  const dataSource = props.sliders.map((item, index) => {
    return {
      key: index + 1,
      img: item.img,
      _id: item._id
    }
  })

  return (
    <Layout style={{ background: '#fff' }}>
    <Breadcrumb style={{ margin: '16px' }}>
    <Breadcrumb.Item><Link to="/admin/dashboard">Pages</Link></Breadcrumb.Item>
    <Breadcrumb.Item>Sliders Manager</Breadcrumb.Item>
  </Breadcrumb>
<header className="bg-white shadow">
  <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
    <h1 className="text-3xl font-bold text-gray-900">
    Sliders Manager
    </h1>
    <Link to="/admin/slider/add" className="sm:ml-3">
      <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add Slider
      </button>
    </Link>
  </div>
</header>

    <div className="site-layout-background bg-white shadow" style={{ padding: 24, minHeight: 360 }}>
    <Table columns={columns} dataSource={dataSource} />
                      
    </div>
    </Layout>
  )
}

export default SliderManager