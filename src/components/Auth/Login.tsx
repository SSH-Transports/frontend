import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Stack } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type FormValues = z.infer<typeof schema>;

const Login: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('Dados do formulário:', data);
    // Implementar lógica para enviar dados ao backend ou manipular os dados
  };

  return (
    <Box sx={{ padding: 4 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} type="email" label="Email" fullWidth error={!!errors.email} helperText={errors.email?.message} />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField {...field} type="password" label="Senha" fullWidth error={!!errors.password} helperText={errors.password?.message} />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
