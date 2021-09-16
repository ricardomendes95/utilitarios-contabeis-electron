import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Card, Form, Input, Button, Col, Row, Table } from 'antd';
import * as S from './style';
import ChooseDirectoryService from '../../services/chooseDirectory';
import { XlsxToOfxService } from '../../services';
import { GetXlsxToOfxResponse } from '../../services/xlsxToOfx/types';

const XlsxToOfx = () => {
  const [saveLocation, setSaveLocation] = useState('');
  const [danger, setDanger] = useState(false);
  const [directory, setDirectory] = useState('');
  const [list, setList] = useState<GetXlsxToOfxResponse[]>();

  async function handleDirectory() {
    try {
      const result = await ChooseDirectoryService.openChooseDirectory();

      setSaveLocation(result.length === 0 ? saveLocation : result[0]);
    } catch (error) {
      console.log(error);
    }
  }
  function handleConvert() {}

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

  async function changeTable() {
    //resolva
    const result = await XlsxToOfxService.getXlsxToOfx('teste');
    const { data } = result;
    if (data) {
      setList(data);
    }
  }

  useEffect(() => {
    if (directory !== '') {
      console.log(directory);

      changeTable();
    }
  }, [directory]);

  return (
    <Sidebar selected="4">
      <S.Content>
        <Card type="inner" title="Converte XLSX em OFX">
          <Row>
            <Col>
              <S.InputField>
                <label>Selecione o Arquivo XLSX:</label>
                <Input
                  type="file"
                  value={directory}
                  onChange={(event) => setDirectory(event?.target.value)}
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
