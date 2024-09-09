import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Box, Stack } from '@mui/material'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  username: z
    .string()
    .min(3, 'Nome de Usuário deve ter pelo menos 3 caracteres'),
  cpf: z.string().length(14, 'CPF deve ter 14 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z
    .string()
    .min(6, 'Confirmação de Senha deve ter pelo menos 6 caracteres'),
})

type FormValues = z.infer<typeof schema>

const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormValues) => {
    console.log('Dados do formulário:', data)
    // Implementar lógica para enviar dados ao backend ou manipular os dados
  }

  return (
    <Box sx={{ padding: 4 }}>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome de Usuário"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />
          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="CPF"
                fullWidth
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                placeholder="123.456.789-00"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Senha"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                label="Confirmar Senha"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />
          <Button type="submit" variant="contained" color="primary">
            Cadastrar
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default Register
