import { ReactNode, createContext, useState, useEffect, } from "react"

interface IHomelessProps {
  img: string
  name: string
  CPF: number
  age: number
  state: string
  lastLocation: string
  contact: number
}

interface IUserConstext {
  isLogin: boolean;
  setIsLogin: (prevState: boolean) => boolean | void;
  isModal: boolean;
  setIsModal: (prevState: boolean) => boolean | void;
  homeLess: IHomelessProps[]
  searchFor: string
  setSearchFor: React.Dispatch<React.SetStateAction<string>>
  setFiltro: React.Dispatch<React.SetStateAction<IHomelessProps[]>>
}

interface IChildrenProps {
  children: ReactNode
}

export const AuthContext = createContext<IUserConstext>({} as IUserConstext)


const teste = [
  {
    img: "../../img/people01.jpg",
    name: "Carlos",
    CPF: 123456789,
    age: 34,
    state: "Desabrigado",
    lastLocation: "Estado da contantina, 22",
    contact: 4845698745
  },
  {
    img: "../../img/people02.jpg",
    name: "Josefa",
    CPF: 123456789,
    age: 34,
    state: "Desabrigado",
    lastLocation: "Estado da contantina, 22",
    contact: 4845698745
  },
  {
    img: "../../img/people01.jpg",
    name: "Camila",
    CPF: 123456789,
    age: 34,
    state: "Desabrigado",
    lastLocation: "Estado da contantina, 22",
    contact: 4845698745
  },
  {
    img: "../../img/people02.jpg",
    name: "Pedro",
    CPF: 123456789,
    age: 34,
    state: "Desabrigado",
    lastLocation: "Estado da contantina, 22",
    contact: 4845698745
  }, {
    img: "../../img/people01.jpg",
    name: "Jose",
    CPF: 123456789,
    age: 34,
    state: "Desabrigado",
    lastLocation: "Estado da contantina, 22",
    contact: 4845698745
  },
  {
    img: "../../img/people02.jpg",
    name: "Paulo",
    CPF: 123456789,
    age: 34,
    state: "Desabrigado",
    lastLocation: "Estado da contantina, 22",
    contact: 4845698745
  },
  {
    img: "../../img/people01.jpg",
    name: "Guga",
    CPF: 123456789,
    age: 34,
    state: "Desabrigado",
    lastLocation: "Estado da contantina, 22",
    contact: 4845698745
  },
  {
    img: "../../img/people02.jpg",
    name: "Melina",
    CPF: 123456789,
    age: 34,
    state: "Desabrigado",
    lastLocation: "Estado da contantina, 22",
    contact: 4845698745
  }
]


export default function AuthProvider({ children }: IChildrenProps) {
  const [isLogin, setIsLogin] = useState(false)
  const [isModal, setIsModal] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [homeLess, setHomeLess] = useState<IHomelessProps[]>([])

  const [searchFor, setSearchFor] = useState('')

  const [filtro, setFiltro] = useState<IHomelessProps[]>([] as IHomelessProps[])

  function all() {
    setHomeLess(teste)
  }

  useEffect(() => {
    if (filtro.length === 0) {
      all()
    }
    else {
      setHomeLess(filtro)
    }
  }, [filtro])


  return (
    <AuthContext.Provider value={{
      isLogin,
      setIsLogin,
      isModal,
      setIsModal,
      homeLess,
      searchFor,
      setSearchFor,
      setFiltro
    }}>
      {children}
    </AuthContext.Provider>
  )
}
