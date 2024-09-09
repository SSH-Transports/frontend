import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Container, Typography, Paper, Box, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ContainerStyled = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#ffffff',
});

const PaperStyled = styled(Paper)({
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: 'white',
  width: '100%',
  maxWidth: '400px',
});

const TitleStyled = styled(Typography)({
  marginBottom: '1rem',
  fontWeight: 'bold',
  textAlign: 'center',
});

const ButtonStyled = styled(Button)({
  marginTop: '1rem',
  width: '100%',
});

const LinkStyled = styled(Link)({
  textAlign: 'center',
  display: 'block',
  marginTop: '1rem',
});

const schema = z.object({
  email: z.string().email('O email deve ser válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

type FormData = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Inserir a lógica de login aqui
  };

  return (
    <ContainerStyled>
      <PaperStyled elevation={3}>
        <TitleStyled variant="h4">Login</TitleStyled>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>
          <ButtonStyled type="submit" variant="contained" color="primary">
            Entrar
          </ButtonStyled>
          <LinkStyled to="/signup">Não tem uma conta? Crie uma agora</LinkStyled>
        </form>
      </PaperStyled>
    </ContainerStyled>
  );
};

export default LoginPage;
