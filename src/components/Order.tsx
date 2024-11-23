import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

declare global {
    interface OrderDetails {
        enderecoColeta: string;
        enderecoEntrega: string;
        data: string;
        id: number;
        valor: string;
        peso: string;
        nomeDoProduto: string;
    }
}

const Order: React.FC<OrderDetails> = ({ enderecoColeta, enderecoEntrega, data, id, valor, peso, nomeDoProduto }) => {
    return (
        <Card>
          <CardContent>
            <Typography><strong>Endereço de coleta:</strong> {enderecoColeta}</Typography>
            <Typography><strong>Endereço de entrega:</strong> {enderecoEntrega}</Typography>
            <Typography><strong>Data:</strong> {data}</Typography>
            <Typography><strong>Id:</strong> {id}</Typography>
            <Typography><strong>Valor:</strong> {valor}</Typography>
            <Typography><strong>Peso:</strong> {peso}</Typography>
            <Typography><strong>Nome do Produto:</strong> {nomeDoProduto}</Typography>
        </CardContent>
        </Card>
    );
}

export default Order;