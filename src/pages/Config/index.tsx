/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Card, Col, Input, notification, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { remote } from 'electron';
import path from 'path';
import Sidebar from '../../components/Sidebar';
import { ConfigService } from '../../services';

const Config = () => {
  const [ipServer, setIpServer] = useState<string | undefined>();

  async function handleSaveIP() {
    const save = await ConfigService.saveIpDominio({
      ipServer,
    });

    if (save === 'feito') {
      notification.success({
        message: 'Feito!',
        description: 'IP alterado com sucesso.',
      });
    } else {
      notification.error({
        message: 'Erro ao salvar',
        description: save.data,
      });
    }
  }

  async function getServerDominio() {
    try {
      const response = await ConfigService.getIpDominio();

      setIpServer(response.ipDominio);
    } catch (error) {
      notification.error({
        message: 'Erro ao Obter configurações',
        description: `erro: ${error}`,
      });
    }
  }

  useEffect(() => {
    getServerDominio();
  }, []);

  return (
    <Sidebar selected="9">
      <Content style={{ padding: '15px' }}>
        <Card type="inner" title="Conexão Dominio">
          <Row>
            <Col span={8}>
              <label>Informe o IP onde o servidor se encontra:</label>
              <Input
                placeholder="ex: 192.168.0.1"
                value={ipServer}
                onChange={(e) => setIpServer(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') handleSaveIP();
                }}
              />
            </Col>
          </Row>

          <Row>
            <Col
              span={8}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '10px',
              }}
            >
              <Button type="primary" onClick={handleSaveIP}>
                {' '}
                Salvar
              </Button>
            </Col>
          </Row>
        </Card>
      </Content>
    </Sidebar>
  );
};

export default Config;
