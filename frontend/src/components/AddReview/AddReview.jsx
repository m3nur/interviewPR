import React, { useState } from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';
import querystring from 'querystring';
import { useHistory } from 'react-router-dom';
import './addReview.css';

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
import { useLoaderContext } from '../../context/LoaderContext';
import LoaderForSelect from '../LoaderForSelect/LoaderForSelect';

const { Title } = Typography;

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

const AddReview = () => {
  let history = useHistory();
  const user = useSelector((state) => state.user);
  const { loader, showLoader, hideLoader } = useLoaderContext();
  const onFinish = async (values) => {
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
    if (values.image) {
      formData.append('image', values.image.files[0]);
    }
    const response = await axios({
      method: 'POST',
      url: '/api/review',
      withCredentials: true,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    history.push(`/user/${user._id}`);
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
      showLoader();
      axios
        .post('/api/word', { str })
        .then((response) => response.data)
        .then((d) => {
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
              data.push({
                value: elem.companyId,
                logo: logoValid,
                text: elem.companyName,
              });
            });
            setData(data);
          }
        })
        .then(() => hideLoader());
    }
    timeout = setTimeout(fake, 100);
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
      <section className="addReviewsSection">
        <div className="container container-main">
          <Title level={2} className="addReviewTitle">
            Создай новый отзыв!
          </Title>
          <Divider></Divider>

          <Form
            name="validate_other"
            {...formItemLayout}
            initialValues={{ rating: 3 }}
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
                placeholder="Название компании"
                style={{ width: '100%' }}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
                optionLabelProp="label"
              >
                {data.map((d) => (
                  <Option key={d.value} label={d.text}>
                    <div>
                      <img
                        alt="No logo"
                        src={d.logo}
                        width="60px"
                        height="30px"
                        object-flit="cover"
                      />
                      {d.text}
                    </div>
                  </Option>
                ))}
                <span>{loader ? <LoaderForSelect /> : null}</span>
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
              <Select
                rules={[
                  {
                    required: true,
                  },
                ]}
                placeholder="Выбери направление"
              >
                <Option value="Frontend">Front End</Option>
                <Option value="Backend">Back End</Option>
                <Option value="FullStack">Full Stack</Option>
              </Select>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message:
                    'Пожалуйста введите вакансию, на которую претендовали',
                },
              ]}
              name="position"
              label="Должность"
            >
              <Input placeholder="Писать сюда" />
            </Form.Item>
            <Form.Item name="salary" label="Зарплата (рублей)">
              <Slider
                initialValues={50000}
                defaultlValues={50000}
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
              <Input placeholder="Введи имя" />
            </Form.Item>

            <Form.Item name="questions" label="Вопросы с собеседования">
              <Input.TextArea placeholder="Писать сюда" />
            </Form.Item>
            <Form.Item name="codFile" label="Ссылка на код">
              <Input.TextArea placeholder="Write here" />
            </Form.Item>
            <Form.Item
              name="impression"
              label="Общее впечатление о собеседовании"
            >
              <Input.TextArea placeholder="Писать сюда" />
            </Form.Item>

            <Form.Item name="setteled" label="Результат">
              <Radio.Group>
                <Radio value="true">Устроился</Radio>
                <Radio selected value="false">
                  Не устроился
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="rating" label="Общая оценка">
              <Rate
                initialValues={3}
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
            </Form.Item>

            <Divider plain></Divider>
            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <Button type="primary" htmlType="submit">
                Добавить отзыв
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};
export default AddReview;
