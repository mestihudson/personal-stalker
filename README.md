# Personal Stalker

É um gerenciador de tarefas com crônometro criado para atender ao desafio/teste da Private Code

Ele foi desenvolvido usando ReactJS como framework de frontend e NodeJS (ExpressJS, como framework para controlador de api rest e KnexJS como facilitador de acesso da recursos de banco de dados).

É possivel acessar uma versão pública [em] (https://personal-stalker.herokuapp.com).

Mas se preferir pode baixar o código e executar localmente.

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
./init.sh

Aguarde até que a seguinte mensagem seja apresentada:

Abra o endereço http://localhost no seu navegador preferido (desde que ele seja chrome ou firefox, ;P).
