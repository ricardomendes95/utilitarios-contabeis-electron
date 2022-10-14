/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import {
  Card,
  Input,
  Button,
  Col,
  Row,
  Table,
  notification,
  Modal,
} from 'antd';
import Sidebar from '../../components/Sidebar';
import * as S from './style';
import ChooseDirectoryService from '../../services/chooseDirectory';
import ChooseFileService from '../../services/chooseFile';
import { XlsxToOfxService } from '../../services';
import { GetXlsxToOfxResponse } from '../../services/xlsxToOfx/types';

const XlsxToOfx = () => {
  const [saveLocation, setSaveLocation] = useState('');
  const [fileLocation, setFileLocation] = useState('');
  const [danger, setDanger] = useState(false);
  const [list, setList] = useState<GetXlsxToOfxResponse[]>();

  const { Search } = Input;

  async function handleDirectory() {
    try {
      const result = await ChooseDirectoryService.openChooseDirectory();

      setSaveLocation(result.length === 0 ? saveLocation : result[0]);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleFile() {
    try {
      const result = await ChooseFileService.openChooseFile();

      setFileLocation(result.length === 0 ? saveLocation : result[0]);
    } catch (error) {
      Modal.error({
        content: `Erro ao abrir o Arquivo: ${error}`,
      });
    }
  }
  async function handleConvert() {
    const data = {
      saveDirectory: saveLocation,
      fileDirectory: fileLocation,
    };

    const result = await XlsxToOfxService.convertOfx(data);

    if (result.Sucess) {
      Modal.success({
        content: `Arquivo ofx foi criado com sucesso no: ${saveLocation}`,
      });
    } else {
      Modal.error({
        content: `Erro ao criar o Arquivo: ${result}`,
      });
    }
  }

  const columns = [
    {
      title: 'Movimentação',
      dataIndex: 'Movimentacao',
    },
    {
      title: 'Tipo',
      dataIndex: 'Tipo',
    },
    {
      title: 'Valor',
      dataIndex: 'Valor',
    },
    {
      title: 'Data',
      dataIndex: 'Data',
    },
    {
      title: 'Origem',
      dataIndex: 'Origem',
    },
  ];

  function changeTable() {
    XlsxToOfxService.read(fileLocation)
      .then((result) => {
        return setList(result);
      })
      .catch((e) => {
        notification.error({
          message: 'Erro ao Enviar Arquivo',
          description: e,
        });
      });
  }

  useEffect(() => {
    if (fileLocation !== '') {
      changeTable();
    }
  }, [fileLocation]);

  return (
    <Sidebar selected="4">
      <S.Content>
        <Card type="inner" title="Converte XLSX em OFX">
          <Row>
            <Col>
              <S.InputField>
                <label>Selecione o Arquivo XLSX:</label>
                <Search
                  placeholder="ex: C:\Temp"
                  allowClear
                  enterButton="Procurar"
                  size="large"
                  onSearch={handleFile}
                  value={fileLocation}
                />
              </S.InputField>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <S.InputField>
                <label>
                  <span style={{ color: 'red' }}>*</span> Local onde deseja
                  salvar o Arquivo OFX
                </label>
                <Input value={saveLocation} disabled />
                {danger ? (
                  <span style={{ color: 'red' }}>Local obrigatório</span>
                ) : (
                  <span />
                )}
              </S.InputField>
            </Col>
            <S.ButtonDirectory>
              <button type="button" onClick={handleDirectory}>
                {' '}
                Escolher{' '}
              </button>
            </S.ButtonDirectory>
          </Row>
          <Row>
            <S.Submit span="24">
              <Button onClick={handleConvert} type="primary">
                Converter
              </Button>
            </S.Submit>
          </Row>

          <Row>
            <Col span="24">
              <Table columns={columns} dataSource={list} />
            </Col>
          </Row>
        </Card>
      </S.Content>
    </Sidebar>
  );
};

export default XlsxToOfx;
