import React from 'react';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CustomAlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  children: React.ReactNode;
  timeout?: number;
  position?: ToastOptions['position'];
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  type,
  children,
  timeout = 5000,
  position = 'top-center',
}) => {
  const showToast = () => {
    const options: ToastOptions = {
      position,
      autoClose: timeout,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    switch (type) {
      case 'success':
        toast.success(children, options);
        break;
      case 'error':
        toast.error(children, options);
        break;
      case 'info':
        toast.info(children, options);
        break;
      case 'warning':
        toast.warn(children, options);
        break;
      default:
        toast(children, options);
    }
  };

  return (
    <>
      <ToastContainer />
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
        onClick={showToast}
      >
        Exibir Alerta
      </button>
    </>
  );
};

export default CustomAlert;
