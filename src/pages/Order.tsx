import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { order_mock } from "../data/order";

const MotoboyPageOrder: React.FC = () => {
    const order = order_mock[0];

    const handleAccept = () => {
        console.log("Corrida aceita!");
    };

    const handleDecline = () => {
        console.log("Corrida recusada!");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Detalhes da Corrida</h1>
            <p><strong>Produto:</strong> {order.nomeDoProduto}</p>
            <p><strong>Local de Coleta:</strong> {order.enderecoColeta.descricao}</p>
            <p><strong>Local de Entrega:</strong> {order.enderecoEntrega.descricao}</p>
            <p><strong>Valor:</strong> R$ {order.valor.toFixed(2)}</p>
            <p><strong>Peso:</strong> {order.peso} kg</p>
            <div style={{ height: "300px", margin: "20px 0" }}>
                <MapContainer
                    center={[
                        order.enderecoColeta.latitude,
                        order.enderecoColeta.longitude,
                    ]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                        position={[
                            order.enderecoColeta.latitude,
                            order.enderecoColeta.longitude,
                        ]}
                    >
                        <Popup>Local de Coleta</Popup>
                    </Marker>
                    <Marker
                        position={[
                            order.enderecoEntrega.latitude,
                            order.enderecoEntrega.longitude,
                        ]}
                    >
                        <Popup>Local de Entrega</Popup>
                    </Marker>
                </MapContainer>
            </div>
            <div>
                <button
                    onClick={handleAccept}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        marginRight: "10px",
                        cursor: "pointer",
                    }}
                >
                    Aceitar
                </button>
                <button
                    onClick={handleDecline}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Recusar
                </button>
            </div>
        </div>
    );
};

export default MotoboyPageOrder;
