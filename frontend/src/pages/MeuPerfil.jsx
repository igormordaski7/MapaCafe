import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import API_URL from '../services/api';
import '../assets/MeuPerfil.css';

const { TextArea } = Input;

const MeuPerfil = () => {
  const [form] = Form.useForm();
  const [perfilId, setPerfilId] = useState(null);

  const apiBaseUrl = `${API_URL}/api/Perfil`;

  useEffect(() => {
    fetch(apiBaseUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar perfil');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const perfil = data[0];

          form.setFieldsValue({
            nome: perfil.nomeUsuario,
            email: perfil.emailUsuario,
            biografia: perfil.biografia,
          });

          setPerfilId(perfil.id);
        }
      })
      .catch((err) => {
        console.log('Não há perfil salvo ou falha no GET', err);
      });
  }, [form]);

  const onFinish = (values) => {
    const telefonePadrao = 0;

    if (perfilId) {
      const payloadParaPut = {
        id: perfilId,
        nomeUsuario: values.nome,
        emailUsuario: values.email,
        biografia: values.biografia || '',
        telefoneUsuario: telefonePadrao
      };

      fetch(`${apiBaseUrl}/${perfilId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadParaPut),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Erro ao atualizar perfil');
          message.success('Perfil atualizado com sucesso.');
        })
        .catch((err) => {
          console.error(err);
          message.error('Falha ao atualizar perfil.');
        });

    } else {

      const payloadParaPost = {
        nomeUsuario: values.nome,
        emailUsuario: values.email,
        biografia: values.biografia || '',
        telefoneUsuario: telefonePadrao
      };

      fetch(apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadParaPost),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Erro ao criar perfil');
          return res.json();
        })
        .then((novoPerfil) => {
          setPerfilId(novoPerfil.id);
          message.success('Perfil criado com sucesso.');
        })
        .catch((err) => {
          console.error(err);
          message.error('Falha ao criar perfil.');
        });
    }
  };

  return (
    <div className="meuperfil-container">
      <div className="meuperfil-card">
        <h2>Meu Perfil</h2>
        <Form
          form={form}
          layout="vertical"
          className="meuperfil-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: 'Informe seu nome' }]}
          >
            <Input placeholder="Nome" />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { required: true, message: 'Informe seu e-mail' },
              { type: 'email', message: 'Formato de e-mail inválido' }
            ]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>

          <Form.Item
            name="biografia"
            label="Minha Biografia"
          >
            <TextArea placeholder="Minha Biografia" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default MeuPerfil;
