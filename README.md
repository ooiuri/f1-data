
# 🏎️ Formula Ap1 

**Acesse o projeto:** [https://ooiuri.github.io/f1-data/](https://ooiuri.github.io/f1-data/)

<img width="1276" height="873" alt="image" src="https://github.com/user-attachments/assets/64b3437b-63be-4cd9-b3bb-de45667a21b5" />


A Aplicação permite visualizar dados históricos da formula 1, através da API Ergast, trazendo as temporadas e detalhes sobre corridas e pilotos em cada ano. Para complementar o projeto, também exibimos a imagem dos pilotos utilizando informações disponíveis na Wikipedia. 



## Tecnologias Utilizadas

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Material UI (MUI)](https://mui.com/)
- [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
-  [React Router v7](https://reactrouter.com/)
- [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/) e [Nock](https://github.com/nock/nock)
-  [Axios](https://axios-http.com/)

## Como rodar o projeto localmente

1. **Clone o repositório:**
```bash
   git clone https://github.com/ooiuri/f1-data.git
   cd f1-data
```

2. **Instale as dependências:**
```bash
    npm install
```
3. **Inicie o servidor de desenvolvimento:**
```bash
    npm run dev
```

4. Acesse no navegador:

    http://localhost:5173/f1-data/


##  Testes

```
# Rodar todos os testes
npm test

# Rodar testes em modo watch
npm test -- --watch
```

> Obs.: durante a instalação do nock, a fim de interceptar as requisições, foram necessárias algumas configurações de mock no jest.globals.ts e jest.setup.ts. Por esse motivo, ao fazer a redeclaração do MessageChannel para ser acessível dentro do contexto do jest, alguns testes não estão conseguindo comunicar o seu encerramento, no entanto, estão funcionando e testando as features corretamente.
 

## Autor

Desenvolvido por [**Iuri Reis**](https://github.com/ooiuri)
