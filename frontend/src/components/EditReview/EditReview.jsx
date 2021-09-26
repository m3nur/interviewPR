// import { Avatar } from 'antd';
// import { AntDesignOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';
import querystring from 'querystring';
import { useHistory, useParams } from 'react-router-dom';
import {
  Form,
  Select,
  Divider,
  Input,
  Radio,
  Slider,
  Button,
  Rate,
  Typography,
} from 'antd';
import { useSelector } from 'react-redux';
const { Title } = Typography;
//import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const normFile = (e) => {
  console.log('Upload event:', e.target.files[0]);
  if (Array.isArray(e.target.files)) {
    return e.target.files;
  }
  return e && e.target;
};
const EditReview = () => {
  const { id } = useParams();
  const reviews = useSelector((state) => state.reviews);
  const user = useSelector((state) => state.user);
  let history = useHistory();
  let formData = reviews.find((elem) => elem._id == id);
  console.log('formData ', formData);
  const onFinish = async (values) => {
    console.log('VVVVVAAAALLLLUUUEEE', values);
    //event.preventDefault();
    console.log(values);
    const formData = new FormData();
    formData.append('companyName', values.companyName);
    formData.append('direction', values.direction);
    formData.append('position', values.position);
    formData.append('salary', values.salary);
    formData.append('setteled', values.setteled);
    formData.append('rating', values.rating);
    formData.append('questions', values.questions);
    formData.append('codFile', values.codFile);
    formData.append('hrName', values.hrName);
    formData.append('impression', values.impression);
    console.log(values.image.files[0]);
    if (values.image) {
      formData.append('image', values.image.files[0]);
    }

    try {
      const response = await axios({
        method: 'PATCH',
        url: `/api/review/edit/${id}`,
        withCredentials: true,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      history.push(`/user/${user._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const { Option } = Select;
  const noLogo = '../../../public/imgLogo/1.jpg';
  let timeout;
  let currentValue;
  const [data, setData] = useState([]);
  const [value, setValue] = useState(undefined);
  function fetch(value) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;
    function fake() {
      const str = querystring.encode({
        code: 'utf-8',
        q: value,
      });
      console.log(str);
      axios
        .post('/word', { str })
        .then((response) => response.data)
        .then((d) => {
          console.log(d);
          if (currentValue === value) {
            const result = d;
            const data = [];
            result?.map((elem) => {
              let logoValid;
              if (elem.companyLogo) {
                let arrFromObjLogo = Object.values(elem.companyLogo);
                let logoValidArr = arrFromObjLogo.filter(
                  (elem) => elem !== 'null'
                );
                logoValid = logoValidArr[0];
              } else {
                logoValid = noLogo;
              }
              console.log(logoValid);
              data.push({
                value: elem.companyId,
                logo: logoValid,
                text: elem.companyName,
              });
            });
            setData(data);
          }
        });
    }
    timeout = setTimeout(fake, 300);
  }
  const handleSearch = (value) => {
    if (value) {
      fetch(value);
    } else {
      setData([]);
    }
  };
  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <>
      <Title level={2}>Создай новый отзыв!</Title>
      <Divider></Divider>
      <Form
        name="validate_other"
        {...formItemLayout}
        initialValues={formData}
        onFinish={(e) => onFinish(e)}
      >
        <Form.Item
          name="companyName"
          label="Название компании"
          rules={[
            {
              required: true,
              message: 'Please select your company!',
              type: 'string',
            },
          ]}
        >
          <Select
            showSearch
            value={value}
            placeholder="input search text"
            style={{ width: 200 }}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
          >
            {data.map((d) => (
              <Option key={d.value}>
                <div>
                  <img alt="No logo" src={d.logo} width="30px" height="30px" />
                  {d.text}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Направление"
          name="direction"
          rules={[
            {
              required: true,
              message: 'Please select your Direction!',
            },
          ]}
        >
          <Select placeholder="Выбери направление">
            <Option value="Frontend">Frontend</Option>
            <Option value="Backend">Backend</Option>
            <Option value="FullStack">FullStack</Option>
          </Select>
        </Form.Item>
        <Form.Item name="position" label="Должность">
          <Input placeholder="Писать сюда" />
        </Form.Item>
        <Form.Item name="salary" label="Зарплата (рублей)">
          <Slider
            min={50000}
            max={150000}
            step={10000}
            tooltipVisible={false}
            marks={{
              50000: 50000,
              60000: 60000,
              70000: 70000,
              80000: 80000,
              90000: 90000,
              100000: 100000,
              110000: 110000,
              120000: 120000,
              130000: 130000,
              140000: 140000,
              150000: 150000,
            }}
          />
        </Form.Item>
        <Form.Item name="hrName" label="Имя HR">
          {/* {getFieldDecorator('name', {
                        initialValue: formData.hrName || '',
                        Rules: [{required: true, message: 'name cannot be empty'}],
                    })(
                    )} */}
          <Input placeholder="Введи имя" />
        </Form.Item>
        <Form.Item name="questions" label="Вопросы с собеседования">
          <Input.TextArea placeholder="Писать сюда" />
        </Form.Item>
        <Form.Item name="codFile" label="Ссылка на код">
          <Input.TextArea placeholder="Write here" />
        </Form.Item>
        <Form.Item name="impression" label="Общее впечатление о собеседовании">
          <Input.TextArea placeholder="Писать сюда" />
        </Form.Item>
        <Form.Item name="setteled" label="Чекни">
          <Radio.Group>
            <Radio value="true">Устроился</Radio>
            <Radio value="false">Не устроился</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="rating" label="Общая оценка">
          <Rate
            defaultValue={3}
            character={({ index }) => customIcons[index + 1]}
          />
        </Form.Item>
        <Form.Item
          name="image"
          label="Загрузить файлы с собеседования"
          valuePropName="image"
          getValueFromEvent={normFile}
        >
          <input type="file" multiple />
          {/* <Upload listType="picture" multiple="true">
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload> */}
        </Form.Item>
        <Divider plain></Divider>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            change отзыв
          </Button>
        </Form.Item>
      </Form>
      <Divider></Divider>
    </>
  );
};
export default EditReview;
// history.push(`/company/${input}`);
