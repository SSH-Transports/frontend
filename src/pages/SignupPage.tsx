import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Container, Typography, Box, Paper, InputAdornment, IconButton, Fade } from '@mui/material';
import { styled } from '@mui/system';
import { Visibility, VisibilityOff, Email, Lock, Person, AccountBox } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const schema = z.object({
  username: z.string().min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.'),
  email: z.string().email('O email deve ser válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  confirmPassword: z.string().min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres.'),
  cpf: z.string().length(11, 'O CPF deve ter 11 dígitos.').regex(/^\d+$/, 'O CPF deve conter apenas números.'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem.',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

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
  maxWidth: '600px',
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

const SignupPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    console.log('Dados do formulário:', data);
    // Simula a criação de conta com sucesso
    alert('Cadastro realizado com sucesso!');
    navigate('/login');
  };

  return (
    <ContainerStyled>
      <PaperStyled elevation={3}>
        <TitleStyled variant="h4">Cadastro</TitleStyled>
        <Fade in>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <TextField
                label="Nome de Usuário"
                fullWidth
                {...register('username')}
                error={!!errors.username}
                helperText={errors.username?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
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
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Confirmar Senha"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
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
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="CPF"
                fullWidth
                {...register('cpf')}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBox />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <ButtonStyled type="submit" variant="contained" color="primary">
              Cadastrar
            </ButtonStyled>
            <LinkStyled to="/login">Já tem uma conta? Faça login</LinkStyled>
          </form>
        </Fade>
      </PaperStyled>
    </ContainerStyled>
  );
};

export default SignupPage;
