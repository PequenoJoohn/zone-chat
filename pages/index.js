import { Box, Button, Text, TextField, Image, } from '@skynexui/components';
import { useEffect, useState } from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';

function Title(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`${Tag} {
                color: ${appConfig.theme.colors.neutrals["000"]};
                font-size: 24px;
                font-weight: 600;
            }`}</style>
    </>
  );
}

export default function PaginaInicial() {
  const status = ''

  const [inputValue, setInputValue] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const roteamento = useRouter();

  console.log(image === '')
  function handleJoin(event) {
    event.preventDefault();
    if (inputValue.length < 2) return;

    setUsername(inputValue);
  }

  function handleError(inputValue) {
    if (inputValue) {
      console.log()
    }
  }

  useEffect(() => {
    async function response() {
      if (username.length < 3) return;

      const src = `https://api.github.com/users/${username}`;

      setImage(`https://github.com/${username}.png`);

      await fetch(src)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          if (res.message) {
            setImage('https://w.wallhaven.cc/full/43/wallhaven-431wk6.jpg')
            return alert('Usuário não existe.');
          }
          setTimeout(() => {
            roteamento.push('/chat');
          }, 3000);
        })
        .catch((erro) => console.log(erro));
    }
    response();
  }, [username])

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[300],
          backgroundImage: 'url(https://w.wallhaven.cc/full/nk/wallhaven-nkpldd.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.black[800],
            border: '1px solid',
            borderColor: appConfig.theme.colors.green["200"]
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >

            <Title tag="h2">Boas vindas de volta!</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals["000"] }}>
              {appConfig.name} <Text styleSheet={{ color: appConfig.theme.colors.success["000"] }}>{appConfig.status}</Text>
            </Text>

            <TextField
              fullWidth
              isValid=""
              rounded="sm"
              placeholder='Digite seu nome'
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.primary["000"],
                  mainColor: appConfig.theme.colors.primary["000"],
                  mainColorHighlight: appConfig.theme.colors.green["000"],
                  backgroundColor: appConfig.theme.colors.black["800"],
                },
              }}
              value={inputValue}
              onChange={(value) => setInputValue(value.target.value)}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              onClick={handleJoin}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.green["000"],
                mainColorLight: appConfig.theme.colors.neutrals["000"],
                mainColorStrong: appConfig.theme.colors.neutrals["000"],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.black[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.green["000"],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
                height: '150px',
                objectFit: 'cover'
              }}
              src={image === '' ? 'https://w.wallhaven.cc/full/43/wallhaven-431wk6.jpg' : image}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username === '' ? 'Who is my?' : username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}