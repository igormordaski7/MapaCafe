import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Row, Col, message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import API_URL from '../services/api';
import '../assets/EditarCafeteria.css';

const { TextArea } = Input;
const { Option } = Select;

const EditarCafeteria = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCafeteria = async () => {
      try {
        const res = await fetch(`${API_URL}/api/Cadastro/${id}`);

        if (res.status !== 200) {
          throw new Error(`Erro ao buscar: ${res.statusText}`);
        }

        const data = await res.json();

        form.setFieldsValue({
          nome: data.nomeCafeteria,
          nota: data.avaliacaoCafeteria,
          rua: data.ruaCafeteria,
          bairro: data.bairroCafeteria,
          cep: data.cepEndereco || '',
          numero: data.numeroEndereco,
          cidade: data.cidade || '',
          estado: data.estado || '',
          comida: data.comidaFavorita || '',
          bebida: data.bebidaFavorita || '',
          observacoes: data.observacoesCafeteria || '',
        });
      } catch (err) {
        console.error(err);
        message.error('Não foi possível carregar os dados da cafeteria');
      } finally {
        setLoading(false);
      }
    };

    fetchCafeteria();
  }, [id, form]);

  const onFinish = async (values) => {
    setSaving(true);

    try {
      const payload = {
        id: Number(id),
        nomeCafeteria: values.nome,
        avaliacaoCafeteria: values.nota,
        ruaCafeteria: values.rua,
        bairroCafeteria: values.bairro,
        cepEndereco: values.cep || null,
        numeroEndereco: Number(values.numero),
        cidade: values.cidade || '',
        estado: values.estado || '',
        comidaFavorita: values.comida || '',
        bebidaFavorita: values.bebida || '',
        observacoesCafeteria: values.observacoes || '',
      };

      const res = await fetch(`${API_URL}/api/Cadastro/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.status === 204) {
        message.success('Cafeteria atualizada com sucesso');
        navigate('/MinhasCafeterias');
      } else {
        const text = await res.text();
        throw new Error(`Status ${res.status}: ${text}`);
      }
    } catch (err) {
      console.error(err);
      message.error('Erro ao atualizar a cafeteria');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="editar-loading">
        <Spin size="large" tip="Carregando dados..." />
      </div>
    );
  }

  return (
    <div className="editar-container">
      <div className="editar-card">
        <div className="editar-title">Editar Cafeteria</div>
        <Form
          form={form}
          layout="vertical"
          className="editar-form"
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="nome"
                label="Nome da Cafeteria"
                rules={[
                  { required: true, message: 'Por favor, informe o nome' },
                  { max: 100, message: 'No máximo 100 caracteres' }
                ]}
              >
                <Input placeholder="Ex: Café da Manhã" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="nota"
                label="Avaliação"
                rules={[{ required: true, message: 'Por favor, selecione a nota' }]}
              >
                <Select placeholder="Selecione">
                  {[1, 2, 3, 4, 5].map(n => (
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
              { required: true, message: 'Por favor, informe a rua' },
              { max: 200, message: 'No máximo 200 caracteres' }
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
                  { required: true, message: 'Por favor, informe o bairro' },
                  { max: 100, message: 'No máximo 100 caracteres' }
                ]}
              >
                <Input placeholder="Ex: Centro" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="numero"
                label="Número"
                rules={[
                  { required: true, message: 'Por favor, informe o número' },
                  { pattern: /^[0-9]+$/, message: 'Apenas números são permitidos' }
                ]}
              >
                <Input placeholder="Ex: 123" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="cep"
                label="CEP"
                rules={[
                  { pattern: /^[0-9]{8}$/, message: 'Formato de CEP inválido (8 dígitos)' }
                ]}
              >
                <Input placeholder="Ex: 00000000" maxLength={8} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="cidade"
                label="Cidade"
                rules={[
                  { required: true, message: 'Por favor, informe a cidade' },
                  { max: 100, message: 'No máximo 100 caracteres' }
                ]}
              >
                <Input placeholder="Ex: São Paulo" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="estado"
                label="Estado"
                rules={[
                  { required: true, message: 'Por favor, informe o estado' },
                  { len: 2, message: 'Use a sigla (2 caracteres)' }
                ]}
              >
                <Input placeholder="Ex: SP" maxLength={2} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="comida"
            label="Comida Favorita"
            rules={[{ max: 100, message: 'No máximo 100 caracteres' }]}
          >
            <Input placeholder="Ex: Croissant" />
          </Form.Item>

          <Form.Item
            name="bebida"
            label="Bebida Favorita"
            rules={[{ max: 100, message: 'No máximo 100 caracteres' }]}
          >
            <Input placeholder="Ex: Cappuccino" />
          </Form.Item>

          <Form.Item
            name="observacoes"
            label="Observações"
            rules={[{ max: 500, message: 'No máximo 500 caracteres' }]}
          >
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
              loading={saving}
              block
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditarCafeteria;
