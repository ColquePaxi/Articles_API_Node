# Projeto: Backend Node com PostgreSQL 
---
O objetivo deste projeto é criar um backend e integrar o ciclo de desenvolvimento com o processo DevOps que, por sua vez, estará integrado ao Github.
Se você está procurando um projeto rápido para criar um backend Node com Postgres, está no lugar certo.
Aqui nós vamos criar uma API funcional, vamos aplicar alguns conceitos de segurança, vamos criar as features passo-a-passo e, ainda, vamos integrar essas fases do desenvolvimento no github (DevOps na veia!!!!!). Vamos simular roolback e situações reais a fim de tornar essa jornada algo muito próximo do dia-a-dia dos Devs e DevOps. Espero que se divirta.


## Tecnologias envolvidas
---
* Docker
* Strapi (framework NodeJS)
* PostgreSQL (banco de dados SQL)
* Git e Github


## Criando os containeres necessários
---
Vamos precisar de 3 containeres: 
- Strapi
- Postgres
- pgAdmin (interface gráfica para gestão do banco de dados de forma visual)
[Referência](https://strapi.io/documentation/3.0.0-beta.x/installation/docker.html)

Procedimento a ser realizado:
1) Crie uma pasta para o seu projeto (ex: docker-strapi)
2) Dentro da pasta docker-strapi, crie o arquivo docker-compose.yaml com o conteúdo igual ao do repositório
3) No Terminal e dentro da pasta docker-strapi, digite: docker-compose pull
4) No Terminal e dentro da pasta docker-strapi, digite: docker-compose up -d
   Se tudo deu certo, deverá mostrar isso no seu terminal:
   Starting pg-strapi-container ... done
   Recreating strapi-container  ... done
   Starting pgAdmin-container   ... done


## Acessando os containeres (testes de acesso)
---
1) Para abrir a interface gráfica do Strapi, abra o browser em uma Aba e digite:
   a) localhost:1337/admin
   b) Crie o seu usuário/senha/email de administração (e guarde-os)
2) Para abrir a interface gráfica do pgAdmin, abra o browser em outra Aba e digite:
   localhost:16543
   Use o usuário e senha que foi passado no docker file para entrar.
3) Para interagir com a console docker, no seu Terminal digite:
   - No Terminal, digite: docker container ps
   - Veja o nome do container ao qual desejas interagir 
   - Conecte-se no container digitando: docker exec -it strapi-container /bin/bash 
   - Para sair do container, digite: exit
Você pode se aprofundar mais dando uma olhada no nesse [link aqui](https://strapi.io/blog/how-to-run-a-strapi-dev-stack-with-docker-compose)


## Baixando os containers
---
No Terminal e dentro da pasta docker-strapi, digite: docker-compose stop


## Etapas para o desenvolvimento da API
---
Na [Issue 1](https://github.com/ColquePaxi/Articles_API_Node/issues/1) você encontra o roteiro completo.


## Geral 
---
Esse treinamento é bem básico e de forma alguma conclui que é a melhor metodologia e/ou o melhor framework para a construção de API com NodeJS. Use-o para tirar suas próprias conclusões. 