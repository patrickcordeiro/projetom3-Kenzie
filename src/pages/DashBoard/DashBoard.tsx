import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Header from "../../components/Header/Header";
import { Container } from "./style";
import api from '../../server/api';
import { toast } from 'react-toastify';

interface IRegisterPerson {
  name: string;
  age: number;
  description: string;
  location: string;
  volunteer: string;
  image: string;
};

export default function DashBoard() {
  const schema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    age: yup.string().required('Campo obrigatório'),
    description: yup.string().required('Campo obrigatório').max(70),
    location: yup.string().required('Campo obrigatório'),
    volunteer: yup.string().required('Campo obrigatório'),
    image: yup.string()
  });

  const {register, handleSubmit, formState: { errors }} = useForm<IRegisterPerson>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: IRegisterPerson) => {
    api.post('/database', data)
      .then((res) => {
        console.log(res)
        // if (res.statusText === 'Created') {
        //   toast.success('Cadastro realizado com sucesso')
        // };
      })
      .catch((err) => {
        console.log(err);
        // toast.error()
      })
  };

  return (
    <>
    <Header/>
      <Container>
        <section className="text">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sit laudantium numquam corporis laborum culpa ducimus omnis deleniti provident cum assumenda veritatis nihil delectus maiores, facere minima aut dolor dolore.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem recusandae harum et quos veniam voluptatum odio at, fugit illum ipsa vitae nihil id minus consectetur voluptatem commodi similique quod maiores!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, sapiente quod. Consectetur, ab animi. Rem error, dicta ipsa iusto alias in soluta odio illum? Commodi porro doloribus aut sequi vel!</p>
        </section>
        <div className="form-container">
          <div className="form-header">
            <h1>Registre uma nova pessoa</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              <label htmlFor="">Nome</label>
              <input 
                type="text" 
                placeholder="Digite o nome"
                {...register('name')}  
              />
              <p className='error-message'>{errors.name?.message}</p>
            </div>
            <div className="input-container">
              <label htmlFor="">Idade</label>
              <input 
                type="text" 
                placeholder="Digite a idade"
                {...register('age')} 
              />
              <p className='error-message'>{errors.age?.message}</p>
            </div>
            <div className="input-container">
              <label htmlFor="">Descrição física</label>
              <input 
                type="text" 
                placeholder="Descreva a aparência"
                {...register('description')} 
              />
              <p className='error-message'>{errors.description?.message}</p>
            </div>
            <div className="input-container">
              <label htmlFor="">Instituição de registro</label>
              <input 
                type="text" 
                placeholder="Identifique o local de registro"
                {...register('location')} 
              />
              <p className='error-message'>{errors.location?.message}</p>
            </div>
            <div className="input-container">
              <label htmlFor="">Voluntário</label>
              <input 
                type="text" 
                placeholder="Nome do voluntário registrando"
                {...register('volunteer')} 
              />
              <p className='error-message'>{errors.volunteer?.message}</p>
            </div>
            <div className="input-container">
              <label htmlFor="">Imagem</label>
              <input 
                type="text"
                placeholder='Link para a imagem'
                {...register('image')} 
              />
              <p className='error-message'>{errors.image?.message}</p>
            </div>

            <button>Cadastrar</button>        
          </form>
        </div>
      </Container>
    </>
  )
};