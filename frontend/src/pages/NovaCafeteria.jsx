import React from 'react';
import { Form, Input, Select, Button, Row, Col, message } from 'antd';
import '../assets/NovaCafeteria.css';
import API_URL from '../services/api';

const { TextArea } = Input;
const { Option } = Select;

const NovaCafeteria = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    const payload = {
      nomeCafeteria:        values.nome,
      ruaCafeteria:         values.rua,
      complementoEndereco:  values.complemento || null,
      bairroCafeteria:      values.bairro,
      numeroEndereco:       parseInt(values.numero, 10),
      cepEndereco:          values.cep || null,
      comidaFavorita:       values.comida || null,
      bebidaFavorita:       values.bebida || null,
      avaliacaoCafeteria:   values.nota,
      observacoesCafeteria: values.observacoes || null
    };

    try {
      const response = await fetch(`${API_URL}/api/Cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      console.log('POST /api/Cadastro →', response.status, text);

      if (response.status === 201) {
        message.success('Cafeteria cadastrada com sucesso!');
        form.resetFields();
      } else {
        message.error(`Erro ao cadastrar (status ${response.status}): ${text}`);
      }
    } catch (error) {
      console.error('Erro de fetch:', error);
      message.error('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nova-container">
      <div className="nova-card">
        <div className="nova-title">Cadastrar Nova Cafeteria</div>
        <Form
          form={form}
          layout="vertical"
          className="nova-form"
          onFinish={onFinish}
          initialValues={{ nota: 3 }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="nome"
                label="Nome da Cafeteria"
                rules={[
                  { required: true, message: 'Informe o nome da cafeteria' },
                  { max: 100, message: 'Máximo de 100 caracteres' }
                ]}
              >
                <Input placeholder="Ex: Café da Manhã" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="nota"
                label="Avaliação"
                rules={[{ required: true, message: 'Selecione a nota' }]}
              >
                <Select placeholder="Selecione">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Option key={n} value={n}>
                      {n} {n > 1 ? 'estrelas' : 'estrela'}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="rua"
            label="Rua"
            rules={[
              { required: true, message: 'Informe a rua' },
              { max: 200, message: 'Máximo de 200 caracteres' }
            ]}
          >
            <Input placeholder="Ex: Rua das Flores" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="bairro"
                label="Bairro"
                rules={[
                  { required: true, message: 'Informe o bairro' },
                  { max: 100, message: 'Máximo de 100 caracteres' }
                ]}
              >
                <Input placeholder="Ex: Centro" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="cep"
                label="CEP"
                rules={[
                  { pattern: /^[0-9]{8}$/, message: 'CEP deve ter 8 dígitos' }
                ]}
              >
                <Input placeholder="Ex: 00000000" maxLength={8} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="numero"
                label="Número"
                rules={[
                  { required: true, message: 'Informe o número' },
                  { pattern: /^[0-9]+$/, message: 'Apenas números são permitidos' }
                ]}
              >
                <Input placeholder="Ex: 123" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="cidade"
                label="Cidade"
                rules={[{ required: true, message: 'Informe a cidade' }]}
              >
                <Input placeholder="Ex: São Paulo" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="estado"
                label="Estado"
                rules={[{ required: true, message: 'Informe o estado' }]}
              >
                <Input placeholder="Ex: SP" maxLength={2} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="comida" label="Comida Favorita">
            <Input placeholder="Ex: Croissant" />
          </Form.Item>

          <Form.Item name="bebida" label="Bebida Favorita">
            <Input placeholder="Ex: Cappuccino" />
          </Form.Item>

          <Form.Item name="observacoes" label="Observações">
            <TextArea
              rows={4}
              placeholder="Ex: Ambiente aconchegante e atendimento excelente"
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              size="large"
              block
            >
              {loading ? 'Cadastrando...' : 'Cadastrar Cafeteria'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NovaCafeteria;
