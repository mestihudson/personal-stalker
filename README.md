# Personal Stalker

É um gerenciador de tarefas com crônometro criado para atender ao desafio/teste da Private Code

Ele foi desenvolvido usando [VueJS](https://vuejs.org) como framework de frontend e NodeJS ([ExpressJS](https://expressjs.com/), como framework para controlador de api rest e [PG](https://node-postgres.com/api/client/) como facilitador de acesso de banco de dados e [PostreSQL](https://www.postgresql.org) como SGBD).

O ambiente de desenvolvimento desse projeto utiliza Docker Compose, logo, para levantá-lo, será necessário garantir alguns requisitos mínimos:
  * Linux ou MacOSX
  * Docker, versão 19.03.08
  * Docker compose, versão 1.25.4
  * Git, versão 2.23.0

Obs.: pode ser que ele funcione com versões anteriores mas só foi testado com os citados, logo, qualquer mudança você está por sua conta e risco.

É necessário baixar o projeto através do git:

git clone https://github.com/mestihudson/personal-stalker.git

Feito isso execute o script:

cd personal-stalker
docker-compose down -v && docker-compose up

Aguarde os serviços estarem prontos e abra o navegador na url:

http://localhost:3900

