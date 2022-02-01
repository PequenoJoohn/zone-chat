import { Box, Button, Text, TextField, Image, } from '@skynexui/components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactLoading from 'react-loading';

import appConfig from '../config.json';

import logo from '../assets/user.jpg';

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

  useEffect(() => {
    async function response() {
      if (username.length < 3) return;

      const src = `https://api.github.com/users/${username}`;

      await fetch(src)
        .then((res) => res.json())
        .then((res) => {

          if (res.message) {
            setImage(logo.src)
            setUsername('');
            setInputValue('');
            return;
          }
          setImage(`https://github.com/${username}.png`);
          localStorage.setItem('@usergithub', JSON.stringify({ nome: username, avatar: res.avatar_url }))

          //  <ReactLoading type={'spin'} color={appConfig.theme.colors.black[800]} height={20} width={20} />
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
          backgroundImage: 'url(https://cdn.discordapp.com/attachments/899866343946457149/936426676076830790/9afe0493484903.5e66500f8dea4.gif)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
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
            borderColor: appConfig.theme.colors.purple["000"]
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: {
                xs: '100%',
                sm: '50%'
              },
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >

            <Title tag="h2">Boas vindas de volta!</Title>
            <Text variant="body3"
              styleSheet={{
                marginBottom: '32px',
                color: appConfig.theme.colors.neutrals["000"]
              }}>
              {appConfig.name} <Text styleSheet={{ color: appConfig.theme.colors.success["000"] }}>{appConfig.status}</Text>
            </Text>

            <TextField
              fullWidth
              isValid=""
              rounded="sm"
              placeholder='Digite seu github'
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary["000"],
                  mainColorHighlight: appConfig.theme.colors.purple["000"],
                  backgroundColor: appConfig.theme.colors.black["800"],
                },
              }}
              value={inputValue}
              onChange={(value) => setInputValue(value.target.value)}
            />
            {username !== '' ?
              <ReactLoading type={'spin'} color={appConfig.theme.colors.purple["000"]} height={20} width={20} />
              :
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                onClick={handleJoin}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.purple["000"],
                  mainColorLight: appConfig.theme.colors.neutrals["900"],
                  mainColorStrong: appConfig.theme.colors.purple["200"],
                }}
              />}

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
              borderColor: appConfig.theme.colors.purple["000"],
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
              src={image === '' ? logo.src : image}
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
              {username === '' ? 'Who is me?' : username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}