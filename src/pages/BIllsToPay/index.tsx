/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import locale from 'antd/es/date-picker/locale/pt_BR';
import {
  Card,
  Input,
  Button,
  Col,
  Row,
  Table,
  notification,
  DatePicker,
  Radio,
  RadioChangeEvent,
} from 'antd';
import DownloadOutlined from '@ant-design/icons/lib/icons/DownloadOutlined';
import FileSearchOutlined from '@ant-design/icons/lib/icons/FileSearchOutlined';
import Sidebar from '../../components/Sidebar';
import * as S from './style';
import ChooseDirectoryService from '../../services/chooseDirectory';
import {
  BillsToPayService,
  CartaResponsabilidadeService,
} from '../../services';
import { GetBillsToPayResponse } from '../../services/BillsToPay/types';
import Definitions from '../../core/types';

const BillsToPay = () => {
  const [company, setCompany] =
    useState<Definitions['CompanyResponsabilityLatter']>();
  const [idEmp, setIdEmp] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [typeDoc, setTypeDoc] = useState('Analítico');
  const [visible, setVisible] = useState(false);

  const [saveLocation, setSaveLocation] = useState('');
  const [danger, setDanger] = useState(false);
  const [list, setList] = useState<GetBillsToPayResponse[]>();
  const [spining, setSpining] = useState({ loading: false });

  const { Search } = Input;

  function handleType(e: RadioChangeEvent) {
    setTypeDoc(e.target.value);
  }

  async function handleDirectory() {
    try {
      const result = await ChooseDirectoryService.openChooseDirectory();

      setSaveLocation(result.length === 0 ? saveLocation : result[0]);
    } catch (error) {
      console.log(error);
    }
  }

  function formatList(listBillsToPays: GetBillsToPayResponse[]) {
    const idProviderList: number[] = [];
    listBillsToPays.forEach((pay: GetBillsToPayResponse) => {
      if (idProviderList.length > 0) {
        if (idProviderList.indexOf(pay?.codi_FOR) < 0) {
          return idProviderList.push(pay?.codi_FOR);
        }
      } else {
        idProviderList.push(pay?.codi_FOR);
      }
    });
    const listBillsToPaysClean: GetBillsToPayResponse[][] = [];
    idProviderList.forEach((n) => {
      listBillsToPaysClean.push(
        listBillsToPays.filter((b) => b.codi_FOR === n)
      );
    });
    console.log(listBillsToPaysClean);

    return listBillsToPaysClean;
  }

  // eslint-disable-next-line consistent-return
  async function loadCompany(value: string, event: any) {
    event.preventDefault();
    setSpining({ loading: true });
    try {
      console.log('vai chamasr');

      const data = await CartaResponsabilidadeService.getCompany(value);

      const result = data.data;
      if (!result) {
        return notification.info({
          message: 'Escritório não encontrado',
          description: 'verifique o código da empresa',
        });
      }
      setCompany(result);
      setIdEmp(value);

      notification.success({
        message: 'Feito!',
      });
    } catch (error) {
      setSpining({ loading: false });
      notification.error({
        message: 'Erro ao buscar',
        description: 'verifique o código da empresa',
      });
    } finally {
      setSpining({ loading: false });
    }
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'codi_FOR',
      key: list?.nume_ENT,
    },
    {
      title: 'Fornecedor',
      dataIndex: 'qry_forn',
      key: list?.nume_ENT,
    },
    {
      title: 'Emissão',
      dataIndex: 'qry_emissao',
      key: list?.nume_ENT,
    },
    {
      title: 'Entrada',
      dataIndex: 'qry_entrada',
      key: list?.nume_ENT,
    },
    {
      title: 'Vencimento',
      dataIndex: 'qry_vencmto',
      key: list?.nume_ENT,
    },
    {
      title: 'Valor Bruto',
      dataIndex: 'vbru',
      key: list?.nume_ENT,
      render: (text: any) =>
        text.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
    },
  ];

  async function handleFind() {
    try {
      const result = await BillsToPayService.getBillsToPays(
        idEmp,
        moment(date).format('DD/MM/YYYY')
      );

      if (result.length > 0) {
        setVisible(true);
        setList(result);
      } else {
        setVisible(false);
        setList([]);
        notification.error({
          message: 'Sem contas a pagar',
          description: 'Não foi encontrado nenhuma Conta em aberto.',
        });
      }
    } catch (error: any) {
      notification.error({
        message: 'Erro ao Procurar Empresa',
        description: error,
      });
    }
  }

  // eslint-disable-next-line consistent-return
  async function handleSubmit() {
    if (!saveLocation) {
      return setDanger(true);
    }
    setDanger(false);

    const data = {
      company: Object.assign(company, { idEmp }),
      date,
      billsToPays: formatList(list),
      typeDoc,
      saveLocation,
    };
    const result = await BillsToPayService.generate(data);
    if (typeof result !== 'string') {
      return notification.error({
        message: 'Erro!',
        description: 'Erro ao escrever arquivo',
      });
    }
    notification.success({
      message: 'Feito!',
      description: 'Documento salvo',
    });
  }

  return (
    <Sidebar selected="5" open="sub2">
      <S.Content>
        <Card type="inner" title="Contas a Pagar">
          <Row>
            <Col span={4}>
              <S.InputField>
                <label>Código</label>
                <Search placeholder="ex: 2" onSearch={loadCompany} />
              </S.InputField>
            </Col>
            <Col span={10}>
              <S.InputField>
                <label>Nome da Empresa</label>
                <Input
                  value={company?.razao}
                  onChange={(event) =>
                    setCompany(
                      Object.assign(company, { razao: event?.target.value })
                    )
                  }
                />
              </S.InputField>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <S.InputField>
                <label htmlFor="date">Posição Em: </label>
                <DatePicker
                  id="date"
                  defaultValue={moment(date)}
                  onChange={(e) => setDate(e?.toDate() || new Date())}
                  locale={locale}
                  format="DD/MM/YYYY"
                />
              </S.InputField>
            </Col>
            <Col style={{ margin: '30px 0px 0px 0px' }}>
              <Button
                type="primary"
                size="large"
                icon={<FileSearchOutlined style={{ fontSize: '20px' }} />}
                onClick={handleFind}
              >
                Buscar
              </Button>
            </Col>
          </Row>
        </Card>
        {visible ? (
          <Card type="inner" title="Resultado">
            <Row>
              <Col>
                <S.InputField>
                  <label>Selecione o tipo do Documento</label>
                  <Radio.Group onChange={handleType} value={typeDoc}>
                    <Radio value="Analítico">Analítico</Radio>
                    <Radio value="Sintético">Sintético</Radio>
                  </Radio.Group>
                </S.InputField>
              </Col>
              <Col span={10}>
                <S.InputField>
                  <label>
                    <span style={{ color: 'red' }}>*</span> Local onde deseja
                    salvar o PDF
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
              <Col style={{ margin: '27px 0px 30px 50px' }}>
                <Button
                  size="large"
                  shape="round"
                  icon={<DownloadOutlined style={{ fontSize: '20px' }} />}
                  type="primary"
                  onClick={handleSubmit}
                >
                  Salvar
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <Table columns={columns} dataSource={list} />
              </Col>
            </Row>
          </Card>
        ) : (
          <span />
        )}
      </S.Content>
    </Sidebar>
  );
};

export default BillsToPay;
